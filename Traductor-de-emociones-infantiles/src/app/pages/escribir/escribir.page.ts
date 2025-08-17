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
  recomendacion: string = '';
  icono: string = '';

  constructor() { }

  ngOnInit() {}

  predecirEmocion() {
    const textoLimpio = this.texto.toLowerCase();

    // Listas de palabras asociadas a cada emoción
    const felicidad = ['feliz', 'alegre', 'divertid', 'jugué', 'corri', 'nos divertimos', 'content', 'reí'];
    const tristeza = ['triste', 'llorar', 'deprimid', 'solitario', 'mal', 'aburrid'];
    const enojo = ['enojo', 'molest', 'enfadad', 'pelea', 'rabia', 'fastidio', 'enoja'];
    const miedo = ['miedo', 'asustad', 'temor', 'nervios', 'susto'];

    // Función para verificar si la frase contiene alguna palabra de la lista
    const contiene = (palabras: string[]) => palabras.some(p => textoLimpio.includes(p));

    if (contiene(felicidad)) {
      this.emocion = 'Felicidad';
      this.color = '#FFD580';
      this.mensaje = '¡Qué alegría leer eso! 😊';
      this.recomendacion = 'Sigue disfrutando y comparte tu alegría con alguien cercano.';
      this.icono = '😊';
    } else if (contiene(tristeza)) {
      this.emocion = 'Tristeza';
      this.color = '#A0D2DB';
      this.mensaje = 'Lo siento mucho 😢. ¡Todo estará bien!';
      this.recomendacion = 'Habla con alguien de confianza y cuida tu corazón.';
      this.icono = '😢';
    } else if (contiene(enojo)) {
      this.emocion = 'Enojo';
      this.color = '#F6A5A5';
      this.mensaje = '¡Respiremos juntos y contemos hasta 10! 😠';
      this.recomendacion = 'Haz algo que te calme, como dibujar o respirar profundo.';
      this.icono = '😠';
    } else if (contiene(miedo)) {
      this.emocion = 'Miedo';
      this.color = '#F6D6C9';
      this.mensaje = 'Es normal tener miedo. ¡Aquí estás seguro! 😨';
      this.recomendacion = 'Habla con alguien de confianza y respira tranquilo.';
      this.icono = '😨';
    } else {
      this.emocion = 'Indefinida';
      this.color = '#E0E0E0';
      this.mensaje = 'No entendí la emoción 😕. ¿Puedes intentarlo de nuevo?';
      this.recomendacion = 'Intenta escribir lo que sientes usando palabras claras.';
      this.icono = '❓';
    }
  }

  limpiar() {
    this.texto = '';
    this.emocion = '';
    this.color = '';
    this.mensaje = '';
    this.recomendacion = '';
    this.icono = '';
  }
}
