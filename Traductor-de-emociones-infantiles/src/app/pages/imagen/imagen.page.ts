import { Component, OnInit } from '@angular/core';
declare var tmImage: any; // para usar la librería global

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.page.html',
  styleUrls: ['./imagen.page.scss'],
  standalone: false,
})
export class ImagenPage implements OnInit {

  constructor() { }

  model: any;
  maxPredictions: any;
  imageSrc: string | ArrayBuffer | null = null;
  emocionPredicha: string = '';

  async ngOnInit() {
    await this.cargarModelo();
  }

  async cargarModelo() {
    const URL = 'https://teachablemachine.withgoogle.com/models/-4jlw7GA6/';
    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';

    this.model = await tmImage.load(modelURL, metadataURL);
    this.maxPredictions = this.model.getTotalClasses();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = e.target?.result || null;
      };
      reader.readAsDataURL(file);
    }
  }

  async predecirEmocion() {
    if (!this.imageSrc || !this.model) return;

    const imgElement: HTMLImageElement | null = document.getElementById('imagen-prediccion') as HTMLImageElement;
    if (!imgElement) return;

    const prediction = await this.model.predict(imgElement);
    let mejorPrediccion = prediction[0];

    // encontrar la clase con mayor probabilidad
    for (let i = 1; i < prediction.length; i++) {
      if (prediction[i].probability > mejorPrediccion.probability) {
        mejorPrediccion = prediction[i];
      }
    }

    this.emocionPredicha = `${mejorPrediccion.className} (${(mejorPrediccion.probability * 100).toFixed(1)}%)`;
  }

}
