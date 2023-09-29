import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PartnerI } from 'src/modules/types';

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
  id!: string;
  dni!: string;
  direccion!: string;
  tlf!: string;
  nombre!: string;
  apellidos!: string;

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

  putPartnerInForm(
    codigo_socio: string,
    dni: string,
    nombre: string,
    apellidos: string,
    direcion: string,
    tlf: string
  ) {
    this.id = codigo_socio;
    this.dni = dni;
  }

  updatePartner(modifyPartner: PartnerI) {
    this.http
      .put<any[]>(
        `http://localhost:3000/socios/${modifyPartner.codigo_socio}`,
        modifyPartner,
        httpOptions
      )
      .subscribe((data) => (this.partners = data));
  }

  deletePartner(id: string) {
    this.http
      .delete<any[]>(`http://localhost:3000/socios/${id}`)
      .subscribe((data) => (this.partners = data));
    location.reload();
  }

  addPartner(newPartner: PartnerI) {
    this.http
      .post<PartnerI[]>('http://localhost:3000/socios', newPartner, httpOptions)
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
