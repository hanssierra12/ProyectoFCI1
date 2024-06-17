function loadImage(url) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = "blob";
        xhr.onload = function (e) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const res = event.target.result;
                resolve(res);
            }
            const file = this.response;
            reader.readAsDataURL(file);
        }
        xhr.send();
    });
}

let signaturePad = null;

window.addEventListener('load', async () => {
    const canvas = document.querySelector("canvas");
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;

    signaturePad = new SignaturePad(canvas, {});

    const otrosContainer = document.getElementById('otros-container');
    const numeroHijosSelect = document.getElementById('numeroHijos');
    numeroHijosSelect.addEventListener('change', () => {
        if (numeroHijosSelect.value === '7') {
            otrosContainer.style.display = 'block';
        } else {
            otrosContainer.style.display = 'none';
        }
    });

    const form = document.querySelector('#form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        let curso = document.getElementById('curso').value;
        let nombre = document.getElementById('nombree').value;
        let codigo = document.getElementById('codigoe').value;
        let cursoc = document.getElementById('cursoc').value;
        let numeroHijos = document.getElementById('numeroHijos').value;
        let otrosText = document.getElementById('otrosText').value;

        // Validar que todos los campos requeridos estén completos
        if (!curso || !nombre || !codigo || !cursoc || !numeroHijos || (numeroHijos === '7' && !otrosText)) {
            alert("Por favor, completa todos los campos requeridos.");
            return;
        }

        await generatePDF(curso, nombre, codigo, cursoc, numeroHijos, otrosText);
    });
});

async function generatePDF(curso, nombre, codigo, cursoc, numeroHijos, otrosText) {
    const pdf = new jsPDF();

    // Agregar imagen de fondo
    const backgroundImage = await loadImage("REPORTE DE CORRECION DE CALIFICACION.jpg");
    pdf.addImage(backgroundImage, 'JPEG', 0, 0, 565, 792);

    // Agregar firma
    const signatureImage = signaturePad.toDataURL();
    pdf.addImage(signatureImage, 'PNG', 200, 370, 300, 60);

    // Agregar texto y datos del formulario
    pdf.setFontSize(12);
    pdf.text(nombre, 250, 105);
    pdf.text(codigo, 250, 90);
    pdf.text(curso, 250, 75);
    pdf.text(cursoc, 250, 135);

    // Ejemplo de agregar más contenido del formulario
    // Asegúrate de ajustar las posiciones y tamaños según sea necesario

    // Guardar el PDF con un nombre específico
    pdf.save("Solicitud_de_retiro_de_curso.pdf");
}

