import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BookI } from 'src/modules/types';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {
  _id?: string;
  _titulo!: string;
  _editorial!: string;
  _autor!: string;
  _ano_escrito!: string;
  books!: BookI[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.http.get<BookI[]>('http://localhost:3000/libros').subscribe(
      (data) => (this.books = data),
      (error) => console.error(error)
    );
  }

  putBookInForm(modifyBook: BookI) {
    this._id = modifyBook.id;
    this._titulo = modifyBook.titulo;
    this._editorial = modifyBook.editorial;
    this._autor = modifyBook.autor;
    this._ano_escrito = modifyBook.ano_escrito;
  }

  updateBook(modifyBook: BookI) {
    this.http
      .put<BookI[]>(
        `http://localhost:3000/libros/${modifyBook.id}`,
        modifyBook,
        httpOptions
      )
      .subscribe((response) => {
        this.books = response;
        this.getAllBooks();
      });
  }

  deleteBook(idBook: BookI) {
    this.http
      .delete<BookI[]>(
        `http://localhost:3000/libros/${idBook.id}`
      )
      .subscribe((response) => {
        this.books = response;
        this.getAllBooks();
      });
  }

  addBook(newBook: BookI) {
    this.http
      .post<BookI[]>('http://localhost:3000/libros', newBook, httpOptions)
      .subscribe((data) => (this.books = data));
  }
}
