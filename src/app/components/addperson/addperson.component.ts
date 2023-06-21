import { Component, Inject, Input, OnInit } from '@angular/core';
import { Person } from '../model/person';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Service } from 'src/app/service/service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-addperson',
  templateUrl: './addperson.component.html',
  styleUrls: ['./addperson.component.css']
})
export class AddpersonComponent implements OnInit {

  person:Person;

  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddpersonComponent>,
    public service: Service,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Person, private formBuilder: FormBuilder) {

    this.formGroup = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      numeroDocumento: [0, [Validators.required]],
      tipoDocumento: ['', [Validators.required]],
      fechaNacimiento: [new Date(), [Validators.required]],
    })
    this.person = new Person();
  }
  ngOnInit(): void {
    this.person.id = this.data.id;
    this.person.nombre = this.data.nombre;
    this.person.apellido = this.data.apellido;
    this.person.numeroDocumento = this.data.numeroDocumento;
    this.person.tipoDocumento = this.data.tipoDocumento;
    this.person.fechaNacimiento = this.data.fechaNacimiento;
  }

  close(){
    this.dialogRef.close();
  }
  save(){
    this.service.addPerson(this.person).subscribe(respons =>{
      if(JSON.stringify(respons) != '{}'){
        this.close(),
        this.snackBar.open('Persona se guardo correctamente','',{
          duration: 2000
        })
      }
    })
  }

  edit(){
    this.service.editPerson(this.person).subscribe(respons =>{
      if(JSON.stringify(respons) != '{}'){
        this.close(),
        this.snackBar.open('Persona se actualizo correctamente','',{
          duration: 2000
        })
      }
    })
  }

}
