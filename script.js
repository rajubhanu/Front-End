const API_URL = "https://easy2pdf.onrender.com";
async function convert(tool) {
    const fileInput = document.getElementById("fileInput");
    const resultEl = document.getElementById("result");
    if (!fileInput.files.length) {
        alert("Please upload a file.");
        return;
    }
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    resultEl.textContent = "Processing...";
    try {
        const response = await fetch(`${API_URL}/${tool}`, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) throw new Error("Conversion failed");
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        // Determine download filename from response headers if available
        const disposition = response.headers.get('content-disposition');
        let filename = "output";
        if (disposition && disposition.includes('filename=')) {
            filename = disposition.split('filename=')[1].replace(/"/g, '');
        }
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        resultEl.textContent = "Download started";
    } catch (err) {
        resultEl.textContent = "";
        alert("Error: " + err.message);
    }
}
