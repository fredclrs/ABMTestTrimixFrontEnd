import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
import { Person } from '../components/model/person';

const httpOption ={
  headers: new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization':'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class Service {

  public url: string;

  constructor(
   private _http : HttpClient
  ) {
    this.url = global.url
  }

  getPersons():Observable<Person[]>{
    return this._http.get<Person[]>(this.url + "list");
  }

  addPerson(person:Person):Observable<Person>{
    return this._http.post<Person>(this.url, person, httpOption);
  }

  editPerson(person:Person):Observable<Person>{
    return this._http.put<Person>(this.url, person, httpOption);
  }

  deletePerson(personId: number):Observable<Person>{
    return this._http.delete<Person>('http://localhost:9999/api/secured/person?personId='+personId);
  }

  getPersonsByName(nombre:string):Observable<Person[]>{
    return this._http.get<Person[]>(this.url + 'like?nombre=' + nombre);
  }

  getPersonsByDocument(tipoDocumento:string):Observable<Person[]>{
    return this._http.get<Person[]>(this.url + 'by-tipoDocumento?tipoDocumento=' + tipoDocumento);
  }

  getPersonsByNameAndDocument(nombre:string,tipoDocumento:string):Observable<Person[]>{
    return this._http.get<Person[]>(this.url + 'nombre-and-tipoDocumento?nombre=' + nombre + '&' + 'tipoDocumento=' + tipoDocumento);
  }

}
