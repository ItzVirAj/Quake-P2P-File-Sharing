document.addEventListener("DOMContentLoaded", () => {
    const dropZone = document.getElementById("dropZone");
    const fileInput = document.getElementById("fileInput");
    const browseBtn = document.getElementById("browseBtn");
    const uploadBtn = document.getElementById("uploadBtn");
    const uploadStatus = document.getElementById("uploadStatus");

    // Show Upload button when a file is selected manually
    fileInput.addEventListener("change", () => {
        if (fileInput.files.length > 0) {
            uploadBtn.classList.remove("hidden");
        }
    });

    // Trigger file input when "Browse File" is clicked
    browseBtn.addEventListener("click", (e) => {
        e.preventDefault();
        fileInput.click();
    });

    // Handle drag-over style
    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("border-blue-400", "bg-gray-800");
    });

    dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove("border-blue-400", "bg-gray-800");
    });

    // Handle file drop
    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("border-blue-400", "bg-gray-800");
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
            fileInput.files = droppedFiles;
            uploadBtn.classList.remove("hidden");
        }
    });

    // Upload & Generate Link
    uploadBtn.addEventListener("click", () => {
        shareFile();
    });

    // Main file sharing function
    window.shareFile = function () {
        const file = fileInput.files[0];
        if (!file) return alert("Please select or drop a file first.");

        client.seed(file, (torrent) => {
            const magnetURI = torrent.magnetURI;

            // Show upload status
            document.getElementById("uploadProgress").classList.remove("hidden");

            function updateStatus() {
                const peers = torrent.numPeers;
                const status = peers > 0
                    ? `Seeding to ${peers} peer(s)...`
                    : `Waiting for peers...`;
                uploadStatus.textContent = `Uploading: ${status}`;
            }

            torrent.on("wire", updateStatus);
            setInterval(updateStatus, 2000);

            socket.send(JSON.stringify({
                type: "share",
                magnet: magnetURI
            }));

            document.getElementById("fileInfo").innerText = `File: ${file.name}`;
            document.getElementById("status").innerText = "Share this link to download!";

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === "shortURL") {
                    const safeUrl = new URL(data.url);
                    document.getElementById("shareLink").innerHTML =
                        `<a href="${safeUrl.href}" target="_blank" class="text-blue-400 hover:underline">${safeUrl.href}</a>`;
                    generateQRCode(safeUrl.href);
                }
            };
        });
    };

    // Auto-download handler if magnet is in URL
    const urlParams = new URLSearchParams(window.location.search);
    const magnet = urlParams.get("magnet");

    if (magnet) {
        client.add(magnet, (torrent) => {
            const file = torrent.files[0];
            document.getElementById("fileInfo").innerText = `File: ${file.name}`;
            document.getElementById("downloadBtn").classList.remove("hidden");

            document.getElementById("downloadBtn").addEventListener("click", () => {
                file.getBlob((err, blob) => {
                    if (err) return console.error(err);
                    const a = document.createElement("a");
                    a.href = URL.createObjectURL(blob);
                    a.download = file.name;
                    a.click();
                });
            });
        });
    }
});
