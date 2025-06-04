<div align="center">
  <img src="https://res.cloudinary.com/daijhwmiz/image/upload/v1749044017/QuakeLogo_d9flim.png" alt="Quake Logo" width="250" height="250" />
</div>

Quake – Secure Peer-to-Peer File Sharing


![Powered by Render](https://img.shields.io/badge/Powered%20by-Render-blue?style=for-the-badge)![WebTorrent](https://img.shields.io/badge/WebTorrent-P2P-red?style=for-the-badge) ![WebRTC](https://img.shields.io/badge/WebRTC-RealTime-blue?style=for-the-badge) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge) ![Node.js](https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge)


Quake is a lightweight, secure, and real-time file-sharing application that leverages WebTorrent and WebRTC to enable direct peer-to-peer (P2P) transfers—no server storage, no waiting. Files are streamed instantly from sender to recipient, without ever being uploaded to a central server.
# 🚀 Key Features

  Zero Server Storage – Files are never uploaded to a cloud or intermediary server.

  Real-Time P2P Streaming – Utilizes WebTorrent and WebRTC for direct data transfer.

  Instant Sharing – Begin sharing files immediately; no lengthy uploads.

  No Sign-Up Required – Share files anonymously with no user registration.

  Auto Expiry – Files vanish once the sender closes their browser session.

# ⚙️ How It Works

  # Sender selects a file via the browser.

  A magnet link is generated and shared with the recipient.

  Recipient opens the link and begins downloading the file directly.

  File transfer occurs in real-time using secure WebRTC connections.

  Once the sender leaves, the file is no longer accessible.

# ❓ Frequently Asked Questions
 ** Does Quake use the traditional torrent network?**
  
  Quake uses WebTorrent, which behaves like torrenting but runs in the browser with no public trackers or indexing.
  
 ** Who can access my file?**
  
  Only individuals with the magnet link can access the file. The link is private—do not share it publicly.
  
 ** How is the file transferred?**
  
  The file is chunked and streamed directly between peers using WebRTC, ensuring fast and efficient transmission.
  
 ** Is my file secure?**
  
  Files are not searchable or stored anywhere publicly. However, anyone with the link can access it—consider sharing links privately or with added protection.
  
  **What happens if I close my browser?**
  
  If you’re the only seeder, the file becomes immediately unavailable. If others are downloading, they may continue to seed temporarily.

## 🔍 Comparison with Similar Services

| Feature               | **Quake**              | FilePizza | Wormhole    | Send Anywhere   |
|-----------------------|------------------------|-----------|-------------|-----------------|
| WebTorrent Support    | ✅ Yes                 | ✅ Yes    | ❌ No       | ❌ No           |
| P2P Transfers         | ✅ Yes                 | ✅ Yes    | ✅ Yes      | ✅ Yes          |
| End-to-End Encryption | 🔒 Planned             | ❌ No     | ✅ Yes      | ✅ Yes          |
| File Expiry           | ⏳ After sender leaves | ❌ No     | ✅ 24 hours | ✅ Temporary    |

🛠️ Future Enhancements

    ✅ End-to-End Encryption for maximum data security

    ✅ Password-Protected Links for controlled sharing

    ✅ Multi-Peer Support to improve availability and speed
