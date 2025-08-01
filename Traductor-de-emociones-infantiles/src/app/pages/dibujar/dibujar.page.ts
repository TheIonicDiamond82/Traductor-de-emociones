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

  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private drawing = false;
  selectedColor = 'black';
  predictedEmotion = '';

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    canvas.addEventListener('mousedown', this.startDrawing.bind(this));
    canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
    canvas.addEventListener('mousemove', this.draw.bind(this));
  }

  startDrawing(event: MouseEvent) {
    this.drawing = true;
    this.draw(event);
  }

  stopDrawing() {
    this.drawing = false;
    this.ctx.beginPath();
  }

  draw(event: MouseEvent) {
    if (!this.drawing) return;
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.ctx.lineWidth = 4;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = this.selectedColor;

    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }

  clearCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.predictedEmotion = '';
  }

  predictEmotion() {
    // Simulación de predicción
    const emotions = ['Feliz', 'Triste', 'Enojado', 'Sorprendido', 'Relajado'];
    const random = Math.floor(Math.random() * emotions.length);
    this.predictedEmotion = emotions[random];
    }
  

}
