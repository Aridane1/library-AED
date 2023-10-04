import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EditionI } from 'src/modules/types';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Component({
  selector: 'app-ediciones',
  templateUrl: './ediciones.component.html',
  styleUrls: ['./ediciones.component.css'],
})
export class EdicionesComponent implements OnInit {
  _id?: string;
  _ISBN?: string;
  _editorial!: string;
  editions!: EditionI[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllEditions();
  }

  getAllEditions() {
    this.http.get<EditionI[]>('http://localhost:3000/ediciones').subscribe(
      (data) => (this.editions = data),
      (error) => console.error(error)
    );
  }

  putEditionInForm(modifyEdition: EditionI) {
    this._ISBN = modifyEdition.ISBN;
    this._editorial = modifyEdition.editorial;
  }

  updateEdition(modifyEdition: EditionI) {
    this.http
      .put<EditionI[]>(
        `http://localhost:3000/ediciones/${modifyEdition.ISBN}`,
        modifyEdition,
        httpOptions
      )
      .subscribe((response) => {
        this.editions = response;
        this.getAllEditions();
      });
  }

  deleteEdition(idEdition: EditionI) {
    this.http
      .delete<EditionI[]>(`http://localhost:3000/ediciones/${idEdition.ISBN}`)
      .subscribe((response) => {
        this.editions = response;
        this.getAllEditions();
      });
  }

  addEdition(newEdition: EditionI) {
    this.http
      .post<EditionI[]>(
        'http://localhost:3000/ediciones',
        newEdition,
        httpOptions
      )
      .subscribe((data) => (this.editions = data));
  }
}
