import React, { useRef, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const sendToBackend = async () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');

    const res = await axios.post('http://localhost:5000/analizar', {
      dibujo: image,
      texto: text
    });

    setResponse(res.data.respuesta);
  };

  return (
    <div className="app">
      <h1>¿Cómo te sientes hoy?</h1>

      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        style={{ border: '1px solid #000', background: '#fff' }}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
      />

      <div>
        <button onClick={clearCanvas}>Limpiar dibujo</button>
      </div>

      <textarea
        placeholder="Escribe cómo te sientes..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={sendToBackend}>Enviar</button>

      <div className="respuesta">{response && <p>{response}</p>}</div>
    </div>
  );
}

let isDrawing = false;
let x = 0;
let y = 0;

function startDrawing(e) {
  isDrawing = true;
  [x, y] = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];
}

function stopDrawing() {
  isDrawing = false;
}

function draw(e) {
  if (!isDrawing) return;
  const ctx = e.target.getContext('2d');
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  ctx.stroke();
  [x, y] = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];
}

export default App;
