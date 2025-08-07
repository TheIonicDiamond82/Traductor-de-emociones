import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.page.html',
  styleUrls: ['./imagen.page.scss'],
  standalone: false,
})
export class ImagenPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  
  imageSrc: string | ArrayBuffer | null = null;
  emocionPredicha: string | null = null;

  // Cuando se selecciona una imagen
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Aquí es donde llamarías tu modelo IA
  predecirEmocion() {
    // Simulación de predicción, reemplazar con modelo real
    this.emocionPredicha = 'Feliz'; // Aquí deberías integrar tu modelo IA (Teachable Machine o similar)
  }

}
