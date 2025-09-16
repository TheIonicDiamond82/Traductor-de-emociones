import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-dibujar',
  templateUrl: './dibujar.page.html',
  styleUrls: ['./dibujar.page.scss'],
  standalone: false,
})

export class DibujarPage implements OnInit {

  constructor() { }
  
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private drawing = false;
  selectedColor = '#000000';
  emocion: string = '';
  mensaje: string = '';
  color: string = '';
  recomendacion: string = '';

  ngOnInit() {
    const canvas = this.canvasRef.nativeElement;

    // Ajustar tamaño interno del canvas
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    // Tamaño fijo del canvas
    canvas.width = 500;
    canvas.height = 350;

    // Establecer estilo CSS para que coincida con el tamaño interno
    canvas.style.width = `${canvas.width}px`;
    canvas.style.height = `${canvas.height}px`;

    // Inicializar contexto
    this.ctx = canvas.getContext('2d')!;
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = this.selectedColor;
  }

  changeColor() {
    this.ctx.strokeStyle = this.selectedColor;
  }

  startDrawing(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    this.drawing = true;
    this.ctx.beginPath();
    const { x, y } = this.getCoords(event);
    this.ctx.moveTo(x, y);
  }

  draw(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    if (!this.drawing) return;
    const { x, y } = this.getCoords(event);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }

  stopDrawing() {
    this.drawing = false;
    this.ctx.closePath();
  }

  clearCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.emocion = '';	
    this.mensaje = '';	
    this.color = '';
    this.recomendacion = '';
  }

  saveDrawing() {
    const canvas = this.canvasRef.nativeElement;
    const dataURL = canvas.toDataURL('image/png');
    console.log('Imagen base64:', dataURL);

    const emociones = ['Felicidad', 'Tristeza', 'Depresión', 'Enojo', 'Alegría'];
    const idx = Math.floor(Math.random() * emociones.length);
    this.emocion = emociones[idx];

    const recomendaciones: { [key: string]: string[] } = {
      'Felicidad': ['Puedes leer un cuento divertido.', 'Comparte tu dibujo con tu familia.', 'Haz una actividad que disfrutes mucho.'],
      'Alegría': ['Juega un rato con tus amigos.', 'Escribe lo que te hace feliz.', 'Escucha tu canción favorita.'],
      'Tristeza': ['Habla con alguien de confianza.', 'Escucha música relajante.', 'Sal a caminar un poco al aire libre.'],
      'Depresión': ['Habla con un adulto de confianza.', 'Haz una actividad tranquila como dibujar o leer.', 'Busca ayuda profesional, ¡no estás solo!'],
      'Enojo': ['Respira profundo y cuenta hasta 10.', 'Dibuja lo que sientes.', 'Haz ejercicio o juega para liberar energía.']
    };

    const mensajesColores: { [key: string]: { mensaje: string; color: string } } = {
      'Felicidad': { mensaje: '¡Qué alegría ver tu dibujo! 😊 Sigue así.', color: '#FFD580' },
      'Alegría': { mensaje: '¡Qué alegría ver tu dibujo! 😊 Sigue así.', color: '#FFD580' },
      'Tristeza': { mensaje: 'Veo que estás un poco triste. Puedes hablar con alguien de confianza.', color: '#A0D2DB' },
      'Depresión': { mensaje: 'Es importante buscar ayuda profesional. ¡No estás solo!', color: '#7B8DAB' },
      'Enojo': { mensaje: 'Respira profundo y toma un momento para calmarte.', color: '#F6A5A5' }
    };

    if (mensajesColores[this.emocion]) {
      this.mensaje = mensajesColores[this.emocion].mensaje;
      this.color = mensajesColores[this.emocion].color;
      const opciones = recomendaciones[this.emocion];
      this.recomendacion = opciones[Math.floor(Math.random() * opciones.length)];
    } else {
      this.mensaje = 'No pude identificar la emoción, inténtalo de nuevo.';
      this.color = '#E0E0E0';
      this.recomendacion = 'Intenta dibujar de nuevo para obtener una recomendación.';
    }
  }

private getCoords(event: MouseEvent | TouchEvent) {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();

    let clientX: number;
    let clientY: number;

    if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    }

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  }
}
