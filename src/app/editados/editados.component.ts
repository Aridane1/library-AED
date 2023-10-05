import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EditI, EditionI } from 'src/modules/types';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Component({
  selector: 'app-editados',
  templateUrl: './editados.component.html',
  styleUrls: ['./editados.component.css'],
})
export class EditadosComponent implements OnInit {
  _id_libro?: string;
  _ISBN?: string;
  _ano_editado!: string;
  editions!: EditI[];
  buttonSelect: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllEditions();
  }

  getAllEditions() {
    this.http.get<EditI[]>('http://localhost:3000/editados').subscribe(
      (data) => (this.editions = data),
      (error) => console.error(error)
    );
  }

  putEditionInForm(modifyEdition: EditI) {
    this._ISBN = modifyEdition.ISBN;
    this._id_libro = modifyEdition.id_libro;
    this._ano_editado = modifyEdition.ano_editado;
    this.buttonSelect = true;
  }

  updateEdition(modifyEdition: EditI) {
    console.log(modifyEdition);
    this.http
      .put<EditI[]>(
        `http://localhost:3000/editados/${modifyEdition.ISBN}/${modifyEdition.id_libro}`,
        modifyEdition,
        httpOptions
      )
      .subscribe((response) => {
        this.editions = response;
        this.getAllEditions();
      });
    this.buttonSelect = false;
  }

  deleteEdition(idEdition: EditI) {
    this.http
      .delete<EditI[]>(
        `http://localhost:3000/editados/${idEdition.ISBN}/${idEdition.id_libro}`
      )
      .subscribe((response) => {
        this.editions = response;
        this.getAllEditions();
      });
  }

  addEdition(newEdition: EditI) {
    this.http
      .post<EditI[]>('http://localhost:3000/editados', newEdition, httpOptions)
      .subscribe((data) => (this.editions = data));
  }
}
