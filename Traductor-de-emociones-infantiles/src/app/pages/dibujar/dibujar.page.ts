import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-dibujar',
  templateUrl: './dibujar.page.html',
  styleUrls: ['./dibujar.page.scss'],
  standalone: false,
})
export class DibujarPage implements OnInit {

  //selectedColor="#9e2956";
  //colors = ['#9e2956','#c2281d','#de722f','#edbf4c','#5db37e','#459cde','#4250ad','#802fa3'];
  constructor() { }


  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private drawing = false;
  selectedColor = '#000000';

ngOnInit() {
  const canvas = this.canvasRef.nativeElement;

  // Ajustar el tamaño interno del canvas al tamaño mostrado
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  canvas.width = 300;
  canvas.height = 150;

  // Inicializar el contexto
  this.ctx = canvas.getContext('2d')!;
  this.ctx.lineWidth = 2; //linea del mouse delgada
  this.ctx.lineCap = 'round';   // Para que los bordes de la línea sean redondeados
  this.ctx.strokeStyle = this.selectedColor;
}


  changeColor() {
    this.ctx.strokeStyle = this.selectedColor;
  }

  startDrawing(event: MouseEvent | TouchEvent) {
    this.drawing = true;
    this.ctx.beginPath();
    const { x, y } = this.getCoords(event);
    this.ctx.moveTo(x, y);
  }

  draw(event: MouseEvent | TouchEvent) {
    if (!this.drawing) return;
    const { x, y } = this.getCoords(event);
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
  }

  saveDrawing() {
    const dataURL = this.canvasRef.nativeElement.toDataURL('image/png');
    console.log('Imagen base64:', dataURL);
    // Aquí puedes enviar la imagen a tu backend o modelo
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

  // Escalar para convertir posición en pantalla a posición en el canvas
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY
  };
}
}
