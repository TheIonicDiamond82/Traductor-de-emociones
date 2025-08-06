import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-escribir',
  templateUrl: './escribir.page.html',
  styleUrls: ['./escribir.page.scss'],
  standalone: false,
})
export class EscribirPage implements OnInit {

  texto: string = '';
  emocion: string = '';
  color: string = '';
  mensaje: string = '';

  constructor() { }

  ngOnInit() {
  }

    predecirEmocion() {
    const textoLimpio = this.texto.toLowerCase();

    // Simulación de predicción basada en palabras clave
    if (textoLimpio.includes('feliz') || textoLimpio.includes('alegre')) {
      this.emocion = 'Felicidad';
      this.color = '#FFD580'; // pastel amarillo
      this.mensaje = '¡Qué alegría leer eso! 😊';
    } else if (textoLimpio.includes('triste') || textoLimpio.includes('llorar')) {
      this.emocion = 'Tristeza';
      this.color = '#A0D2DB'; // pastel azul
      this.mensaje = 'Lo siento mucho 😢. ¡Todo estará bien!';
    } else if (textoLimpio.includes('enojo') || textoLimpio.includes('molesto')) {
      this.emocion = 'Enojo';
      this.color = '#F6A5A5'; // pastel rojo
      this.mensaje = '¡Respiremos juntos y contemos hasta 10! 😠';
    } else if (textoLimpio.includes('miedo') || textoLimpio.includes('asustado')) {
      this.emocion = 'Miedo';
      this.color = '#F6D6C9'; // pastel naranja
      this.mensaje = 'Es normal tener miedo. ¡Aquí estás seguro! 😨';
    } else {
      this.emocion = 'Indefinida';
      this.color = '#E0E0E0'; // gris claro
      this.mensaje = 'No entendí la emoción 😕. ¿Puedes intentarlo de nuevo?';
    }
  }

  limpiar() {
    this.texto = '';
    this.emocion = '';
    this.color = '';
    this.mensaje = '';
  }
}
