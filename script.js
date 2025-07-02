
const API_URL = "https://easy2pdf.onrender.com";

async function convert(tool) {
    const fileInput = document.getElementById("fileInput");
    if (!fileInput.files.length) {
        alert("Please upload a file.");
        return;
    }
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

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
        a.download = "converted.docx";
        a.click();
    } catch (error) {
        alert("Error: " + error.message);
    }
}
