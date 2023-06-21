export class Person{

  id: number;
  nombre: string;
  apellido: string;
  numeroDocumento: number;
  tipoDocumento: string;
  fechaNacimiento: string;

  constructor(){
    this.id = 0;
    this.nombre = '';
    this.apellido = '';
    this.numeroDocumento = 0;
    this.tipoDocumento = ''
    this.fechaNacimiento = "";
  }
}
