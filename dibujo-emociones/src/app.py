from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
from io import BytesIO
from PIL import Image

app = Flask(__name__)
CORS(app)

@app.route('/analizar', methods=['POST'])
def analizar():
    data = request.json
    dibujo = data.get('dibujo')
    texto = data.get('texto')

    # Procesar imagen (simulado)
    imagen = Image.open(BytesIO(base64.b64decode(dibujo.split(',')[1])))
    # Aquí puedes integrar tu modelo de clasificación
    emocion_dibujo = "feliz"  # Simulación

    # Procesar texto (simulado)
    if "triste" in texto.lower():
        emocion_texto = "triste"
    elif "enojado" in texto.lower():
        emocion_texto = "enojado"
    else:
        emocion_texto = "feliz"

    # Respuesta emocional (puede personalizarse más)
    respuesta = f"¡Gracias por compartir! Pareces sentirte {emocion_texto} y tu dibujo transmite {emocion_dibujo}."

    return jsonify({"respuesta": respuesta})

if __name__ == '__main__':
    app.run(debug=True)
