import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {
  BookI,
  EditI,
  EditionI,
  PartnerI,
  RentI,
  VolumeI,
} from 'src/modules/types';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.css']
})
export class SociosComponent implements OnInit {
  buttonSelect: boolean = false;
  _codigo_socio?: string;
  _dni!: string;
  _direccion!: string;
  _tlf!: string;
  _nombre!: string;
  _apellidos!: string;
  partners!: PartnerI[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllPartners();

  }
  getAllPartners() {
    this.http.get<PartnerI[]>('http://localhost:3000/socios').subscribe(
      (data) => (this.partners = data),
      (error) => console.error(error)
    );
  }

  putPartnerInForm(modifyPartner: PartnerI) {
    this._codigo_socio = modifyPartner.codigo_socio;
    this._nombre = modifyPartner.nombre;
    this._apellidos = modifyPartner.apellidos;
    this._direccion = modifyPartner.direccion;
    this._tlf = modifyPartner.tlf;
    this._dni = modifyPartner.dni;
    this.buttonSelect = true;
  }

  updatePartner(modifyPartner: PartnerI) {
    this.buttonSelect = false;
    this.http
      .put<PartnerI[]>(
        `http://localhost:3000/socios/${modifyPartner.codigo_socio}`,
        modifyPartner,
        httpOptions
      )
      .subscribe((response) => {
        this.partners = response;
        this.getAllPartners();
      });
  }

  deletePartner(idPartner: PartnerI) {
    this.http
      .delete<PartnerI[]>(
        `http://localhost:3000/socios/${idPartner.codigo_socio}`
      )
      .subscribe((response) => {
        this.partners = response;
        this.getAllPartners();
      });
  }

  addPartner(newPartner: PartnerI) {
    this.http
      .post<PartnerI[]>('http://localhost:3000/socios', newPartner, httpOptions)
      .subscribe((data) => (this.partners = data));
  }
}
