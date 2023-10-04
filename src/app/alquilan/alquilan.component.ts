import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RentI } from 'src/modules/types';  


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Component({
  selector: 'app-alquilan',
  templateUrl: './alquilan.component.html',
  styleUrls: ['./alquilan.component.css']
})
export class AlquilanComponent implements OnInit {
  _codigo_socio!: string;
  _id_volumen!: string;
  _f_prestamo!: string;
  _f_devolucion!: string;
  _f_limite!: string;
  rents!: RentI[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllRents();
  }

  getAllRents() {
    this.http.get<RentI[]>('http://localhost:3000/alquilan').subscribe(
      (data) => (this.rents = data),
      (error) => console.error(error)
    );
  }

  putRentInForm(modifyRent: RentI) {
    this._codigo_socio = modifyRent.codigo_socio;
    this._id_volumen = modifyRent.id_volumen;
    this._f_prestamo = modifyRent.f_prestamo;
    this._f_devolucion = modifyRent.f_devolucion;
    this._f_limite = modifyRent.f_limite;
  }

  updateRent(modifyRent: RentI) {
    const updateUrl = `http://localhost:3000/alquilan/${modifyRent.codigo_socio}/${modifyRent.id_volumen}`;
    this.http
      .put<RentI[]>(updateUrl, modifyRent, httpOptions)
      .subscribe((response) => {
        this.rents = response;
        this.getAllRents();
      });
  }

  deleteRent(rent: RentI) {
    const deleteUrl = `http://localhost:3000/alquilan/${rent.codigo_socio}/${rent.id_volumen}`;
    this.http
      .delete<RentI[]>(deleteUrl)
      .subscribe((response) => {
        this.rents = response;
        this.getAllRents();
      });
  }

  addRent(newRent: RentI) {
    this.http
      .post<RentI[]>('http://localhost:3000/alquilan', newRent, httpOptions)
      .subscribe((data) => (this.rents = data));
  }
}
