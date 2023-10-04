export interface PartnerI {
  codigo_socio?: string;
  dni: string;
  nombre: string;
  apellidos: string;
  direccion: string;
  tlf: string;
}

export interface RentI {
  codigo_socio: string;
  id_volumen: string;
  f_prestamo: string;
  f_devolucion: string;
  f_limite: string;
}

export interface VolumeI {
  id?: string;
  estado: string;
  id_libro:string;
}

export interface BookI {
  id?: string;
  titulo: string;
  editorial: string;
  autor: string;
  ano_escrito: string;
}

export interface EditI {
  id_libro: string;
  ISBN: string;
  ano_editado: string;
}

export interface EditionI {
  id?: string;
  ISBN?: string;
  editorial: string;
}
