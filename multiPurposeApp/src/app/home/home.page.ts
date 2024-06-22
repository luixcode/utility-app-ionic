import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nombre: string = '';
  genero: string = '';
  nombreEdad: string = '';
  edad: number = 0;
  categoriaEdad: string = '';
  imagenCategoria: string = '';
  pais: string = '';
  universidades: any[] = [];
  clima: any;
  noticias: any[] = [];

  constructor(private http: HttpClient) {}

  predecirGenero() {
    this.http.get(`https://api.genderize.io/?name=${this.nombre}`)
      .subscribe((data: any) => this.genero = data.gender);
  }

  predecirEdad() {
    this.http.get(`https://api.agify.io/?name=${this.nombreEdad}`)
      .subscribe((data: any) => {
        this.edad = data.age;
        if (this.edad < 18) {
          this.categoriaEdad = 'Joven';
          this.imagenCategoria = 'assets/young.png';
        } else if (this.edad < 60) {
          this.categoriaEdad = 'Adulto';
          this.imagenCategoria = 'assets/adult.png';
        } else {
          this.categoriaEdad = 'Anciano';
          this.imagenCategoria = 'assets/elderly.png';
        }
      });
  }

  buscarUniversidades() {
    this.http.get(`http://universities.hipolabs.com/search?country=${this.pais}`)
      .subscribe((data: any) => this.universidades = data);
  }

  obtenerClima() {
    // API Key omitida!
    this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=Santo%20Domingo&appid=API_KEY_OMITTED&units=metric`)
      .subscribe((data: any) => this.clima = data);
  }

  obtenerNoticias() {
    this.http.get('http://localhost:3000/noticias')
      .subscribe((data: any) => this.noticias = data);
  }
}
