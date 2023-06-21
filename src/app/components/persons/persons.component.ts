import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Router} from '@angular/router'
import { AddpersonComponent } from '../addperson/addperson.component';
import { Person } from '../model/person';
import { Service } from 'src/app/service/service';
import { DialogDeleteComponent } from '../dialogDeleteComponent/dialogDelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit{

  public nombre: string;
  public tipoDocumento: string;
  public person: Person;
  public list: any[] = new  Array;

  constructor(
    private router:Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private service:Service
  ){
    this.person = new Person();
    this.nombre = "";
    this.tipoDocumento = "";
  }
  ngOnInit(): void {
    this.getPersons();
  }

  openAdd(){
    const dialogRef = this.dialog.open(AddpersonComponent,{
      height: '80%',
      width: '80%'
    }
    );
    dialogRef.afterClosed().subscribe(result => {
      this.getPersons();
    });
  }

  openEdit(person:Person){
    const dialogRef = this.dialog.open(AddpersonComponent,{
      height: '70%',
      width: '80%',
      data: person
    }
    );
    dialogRef.afterClosed().subscribe(result => {
      this.getPersons();
    });
  }

  getPersons(){
    var listPerson : any[] = new Array();
    var fechag: String
    this.service.getPersons().subscribe(respons =>{
      for (const person of respons) {
        fechag = new Date(person.fechaNacimiento).toString();
        console.log(fechag);
      }
      this.list = respons;
    })
  }

  openDelete(person:Person){
    const dialogRef = this.dialog.open(DialogDeleteComponent,{
      width: '2000'
    }
    );
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.service.deletePerson(person.id).subscribe(respons => {
          if(respons){
            this.snackBar.open('Persona eliminada correctamente','',{
              duration: 2000
            })
            this.getPersons();
          }
        })
      }
    });
  }

  getPersonsByFilter(){
    if(this.nombre != "" && this.tipoDocumento == ""){
      this.service.getPersonsByName(this.nombre).subscribe(respons => {
        this.list = respons;
      });
    }else{
      if(this.nombre =="" && this.tipoDocumento !=""){
        this.service.getPersonsByDocument(this.tipoDocumento).subscribe(respons => {
          this.list = respons;
        })
      }else{
        if(this.nombre != "" && this.tipoDocumento != ""){
          this.service.getPersonsByNameAndDocument(this.nombre,this.tipoDocumento).subscribe(respons => {
            this.list = respons
          })
        }
      }
    }
  }

}
