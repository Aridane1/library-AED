import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VolumeI } from 'src/modules/types';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Component({
  selector: 'app-volumenes',
  templateUrl: './volumenes.component.html',
  styleUrls: ['./volumenes.component.css'],
})
export class VolumenesComponent implements OnInit {
  buttonSelect: boolean = false;
  _id?: string;
  _estado!: string;
  _id_libro!: string;
  volumes!: VolumeI[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllVolumes();
  }

  getAllVolumes() {
    this.http.get<VolumeI[]>('http://localhost:3000/volumenes').subscribe(
      (data) => (this.volumes = data),
      (error) => console.error(error)
    );
  }

  putVolumeInForm(modifyVolume: VolumeI) {
    this._id = modifyVolume.id;
    this._estado = modifyVolume.estado;
    this._id_libro = modifyVolume.id_libro;
    this.buttonSelect = true;
  }

  updateVolume(modifyVolume: VolumeI) {
    this.buttonSelect = false;
    this.http
      .put<VolumeI[]>(
        `http://localhost:3000/volumenes/${modifyVolume.id}`,
        modifyVolume,
        httpOptions
      )
      .subscribe((response) => {
        this.volumes = response;
        this.getAllVolumes();
      });
  }

  deleteVolume(idVolume: VolumeI) {
    this.http
      .delete<VolumeI[]>(
        `http://localhost:3000/volumenes/${idVolume.id}`
      )
      .subscribe((response) => {
        this.volumes = response;
        this.getAllVolumes();
      });
  }

  addVolume(newVolume: VolumeI) {
    this.http
      .post<VolumeI[]>('http://localhost:3000/volumenes', newVolume, httpOptions)
      .subscribe((data) => (this.volumes = data));
  }
}
