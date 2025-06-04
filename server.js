const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const LINK_EXPIRY_TIME = 60 * 60 * 1000; // 1 hour
const fileLinks = new Map(); // shortID => { magnet, expiresAt }

function generateShortID() {
  return Math.random().toString(36).substring(2, 8);
}

function isValidMagnet(uri) {
  return typeof uri === "string" && uri.startsWith("magnet:");
}

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "public")));

// Redirect shortened URL to magnet download
app.get("/share/:id", (req, res) => {
  const shortID = req.params.id;
  const linkData = fileLinks.get(shortID);

  if (linkData && Date.now() < linkData.expiresAt) {
    const redirectUrl = `/?magnet=${encodeURIComponent(linkData.magnet)}`;
    res.redirect(redirectUrl);
  } else {
    res.status(404).send("❌ File not found or expired.");
  }
});

// Handle WebSocket connections
wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);

      // Handle file sharing request
      if (data.type === "share") {
        if (!isValidMagnet(data.magnet)) {
          ws.send(
            JSON.stringify({ type: "error", message: "Invalid magnet link" })
          );
          return;
        }

        // Generate short ID and store the magnet link with expiry
        const shortID = generateShortID();
        fileLinks.set(shortID, {
          magnet: data.magnet,
          expiresAt: Date.now() + LINK_EXPIRY_TIME,
        });

        // Send the short URL back to the client
        ws.send(
          JSON.stringify({
            type: "shortURL",
            url: `http://localhost:3000/share/${shortID}`, // Change this to your production URL if deployed
          })
        );

        // Set timeout to delete the link after expiry
        setTimeout(() => {
          fileLinks.delete(shortID);
          console.log(`Deleted expired link: ${shortID}`);
        }, LINK_EXPIRY_TIME);
      }
    } catch (err) {
      console.error("❌ WebSocket error:", err);
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
