// Esperamos a que la ventana cargue completamente
window.addEventListener('load', () => {
    // Inicializamos SignaturePad en el canvas
    const canvas = document.getElementById('signatureCanvas');
    const signaturePad = new SignaturePad(canvas, {
        backgroundColor: 'rgb(255, 255, 255)', // Fondo blanco
        penColor: 'rgb(0, 0, 0)' // Color del lápiz negro
    });

    // Botón para limpiar la firma
    const clearButton = document.getElementById('clearButton');
    clearButton.addEventListener('click', () => signaturePad.clear());

    // Botón para generar el PDF
    const generatePDFButton = document.getElementById('generatePDFButton');
    generatePDFButton.addEventListener('click', () => generatePDF(signaturePad));
});

// Función para generar el PDF con la firma capturada
function generatePDF(signaturePad) {
    // Creamos un nuevo documento PDF
    const pdf = new jsPDF();

    // Convertimos la firma en formato base64
    const signatureImage = signaturePad.toDataURL();

    // Agregamos la imagen de la firma al PDF
    pdf.addImage(signatureImage, 'PNG', 10, 10, 180, 60); // Ajusta la posición y tamaño según necesidad

    // Guardamos el PDF con un nombre específico
    pdf.save('documento_con_firma.pdf');
}

