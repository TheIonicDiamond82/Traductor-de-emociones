import { Component, OnInit } from '@angular/core';

declare var tmImage: any; // Declaramos para usar la librería global

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
  standalone: false,
})
export class CamaraPage implements OnInit {

  model: any;
  webcam: any;
  labelContainer: any;
  maxPredictions: any;
  constructor() { }

  async ngOnInit() {
    await this.init();
  }

  async init() {
    const URL = 'https://teachablemachine.withgoogle.com/models/BCGLK1PjX/';

    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';

    // Cargar el modelo y metadatos
    this.model = await tmImage.load(modelURL, metadataURL);
    this.maxPredictions = this.model.getTotalClasses();

    // Configuración de la webcam
    this.webcam = new tmImage.Webcam(200, 200, true); // ancho, alto, flip
    await this.webcam.setup();
    await this.webcam.play();
    window.requestAnimationFrame(() => this.loop());

    document.getElementById('webcam-container')?.appendChild(this.webcam.canvas);
    this.labelContainer = document.getElementById('label-container');

    for (let i = 0; i < this.maxPredictions; i++) {
      const div = document.createElement('div');
      this.labelContainer?.appendChild(div);
    }
  }

  async loop() {
    this.webcam.update();
    await this.predict();
    window.requestAnimationFrame(() => this.loop());
  }

  async predict() {
    const prediction = await this.model.predict(this.webcam.canvas);
    for (let i = 0; i < this.maxPredictions; i++) {
      const classPrediction =
        prediction[i].className + ': ' + (prediction[i].probability.toFixed(2)*100)+'%';
      if (this.labelContainer?.childNodes[i]) {
        (this.labelContainer.childNodes[i] as HTMLElement).innerText = classPrediction;
      }
    }
  }

}
