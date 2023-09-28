import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  partners: any[] = [];
  rents: any[] = [];
  volumes: any[] = [];
  books: any[] = [];
  edits: any[] = [];
  editions: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllPartners();
    this.getAllRent();
    this.getAllVolumes();
    this.getAllBooks();
    this.getAllEdits();
    this.getAllEditions();
  }

  addPartner(
    dni: string,
    direccion: string,
    tlf: string,
    nombre: string,
    apellidos: string
  ) {
    this.http
      .post<any[]>(
        'http://localhost:3000/socios',
        {
          dni,
          direccion,
          tlf,
          nombre,
          apellidos,
        },
        httpOptions
      )
      .subscribe((data) => (this.partners = data));
  }

  getAllPartners() {
    this.http.get<any[]>('http://localhost:3000/socios').subscribe(
      (data) => (this.partners = data),
      (error) => console.error(error)
    );
  }
  getAllRent() {
    this.http.get<any[]>('http://localhost:3000/alquilan').subscribe(
      (data) => (this.rents = data),
      (error) => console.error(error)
    );
  }
  getAllVolumes() {
    this.http.get<any[]>('http://localhost:3000/volumenes').subscribe(
      (data) => (this.volumes = data),
      (error) => console.error(error)
    );
  }
  getAllBooks() {
    this.http.get<any[]>('http://localhost:3000/libros').subscribe(
      (data) => (this.books = data),
      (error) => console.error(error)
    );
  }
  getAllEdits() {
    this.http.get<any[]>('http://localhost:3000/editados').subscribe(
      (data) => (this.edits = data),
      (error) => console.error(error)
    );
  }
  getAllEditions() {
    this.http.get<any[]>('http://localhost:3000/ediciones').subscribe(
      (data) => (this.editions = data),
      (error) => console.error(error)
    );
  }
}
