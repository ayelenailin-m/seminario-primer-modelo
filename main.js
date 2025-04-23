let model;
const threshold = 0.9; // Nivel de confianza para considerar que es tóxico


toxicity.load(threshold).then(m => { // Carga el modelo preentrenado
    model = m; // Se guarda el modelo en la variable global model
    console.log("Modelo cargado");
});

function analyzeText() {
    const text = document.getElementById("inputText").value;
    const resultBox = document.getElementById("resultBox");

    if (!text || !model) {
        resultBox.innerHTML = "El modelo está cargando o la ntrada está vacía...";
        return;
    }
    
    // Usa el modelo para clasificar el texto. 
    model.classify([text]).then(predictions => {
        let output = `<strong>Resultado para:</strong> "${text}"<br><br>`;

        // predictions es array con los resultados para varias categorias
        predictions.forEach(pred => {
        const match = pred.results[0].match; // Lo consideró tóxico?
        const probability = pred.results[0].probabilities[1]; // Probabilidad de que sea tóxico, en porcentaje
        
        //mostrar una línea por categoría diciendo si fue o no tóxica y con qué porcentaje
        output += `
            <div>
            <strong>${pred.label}</strong>: ${match ? "Tóxico" : " No tóxico"} 
            (${(probability * 100).toFixed(2)}%)
            </div>
        `;
        });

        resultBox.innerHTML = output;
    });
}