import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-dibujar',
  templateUrl: './dibujar.page.html',
  styleUrls: ['./dibujar.page.scss'],
  standalone: false,
})
export class DibujarPage implements OnInit {

  //selectedColor="#9e2956";
  //colors = ['#9e2956','#c2281d','#de722f','#edbf4c','#5db37e','#459cde','#4250ad','#802fa3'];
  constructor() { }


  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private drawing = false;
  selectedColor = '#000000';

  ngOnInit() {
    
    const canvas = this.canvasRef.nativeElement;
      // Ajustar tamaño interno al tamaño mostrado

    this.ctx = canvas.getContext('2d')!;
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = this.selectedColor;
  }

  changeColor() {
    this.ctx.strokeStyle = this.selectedColor;
  }

  startDrawing(event: MouseEvent | TouchEvent) {
    this.drawing = true;
    this.ctx.beginPath();
    const { x, y } = this.getCoords(event);
    this.ctx.moveTo(x, y);
  }

  draw(event: MouseEvent | TouchEvent) {
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
  }

  saveDrawing() {
    const dataURL = this.canvasRef.nativeElement.toDataURL('image/png');
    console.log('Imagen base64:', dataURL);
    // Aquí puedes enviar la imagen a tu backend o modelo
  }

  private getCoords(event: MouseEvent | TouchEvent) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    if (event instanceof MouseEvent) {
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    } else {
      const touch = event.touches[0];
      return { x: (touch.clientX - rect.left)-800, y: touch.clientY - rect.top };
    }
  }
}
