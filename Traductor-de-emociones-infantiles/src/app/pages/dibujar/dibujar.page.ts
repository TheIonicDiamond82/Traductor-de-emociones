import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-dibujar',
  templateUrl: './dibujar.page.html',
  styleUrls: ['./dibujar.page.scss'],
  standalone: false,
})
export class DibujarPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private drawing = false;
  selectedColor = '#000000';

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.ctx.lineWidth = 4;
    this.ctx.lineCap = 'round';
  }

  getCanvasPosition(event: any) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }

  startDrawing(event: any) {
    this.drawing = true;
    const pos = this.getCanvasPosition(event);
    this.ctx.beginPath();
    this.ctx.moveTo(pos.x, pos.y);
    this.ctx.strokeStyle = this.selectedColor;
  }

  draw(event: any) {
    if (!this.drawing) return;
    const pos = this.getCanvasPosition(event);
    this.ctx.lineTo(pos.x, pos.y);
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
    const canvas = this.canvasRef.nativeElement;
    const imageData = canvas.toDataURL();
    console.log('Imagen base64 lista para enviar o procesar:', imageData);
    // Simular resultado
    alert('Emoción predecida: ¡Feliz!');
  }

}
