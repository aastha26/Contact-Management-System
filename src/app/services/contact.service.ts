import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyContact } from '../models/myContact';
import { Observable, pipe, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MyGroup } from '../models/myGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl:string = 'http://localhost:4000';

  constructor(private http:HttpClient) { }


  //Get All Contacts Data
  public getAllContacts() :Observable<MyContact[]>{
    // let dataUrl:string = '$http://localhost:4000/contacts'
    let dataUrl:string = `${this.baseUrl}/contacts`;
    return this.http.get<MyContact[]>(dataUrl).pipe(catchError(this.handleError))

  }

  //get Single Contacts
  public getContacts(contactId:string) :Observable<MyContact>{
    // let dataUrl:string = '$http://localhost:4000/contacts'
    let dataUrl:string = `${this.baseUrl}/contacts/${contactId}`;
    return this.http.get<MyContact>(dataUrl).pipe(catchError(this.handleError))

  }

  //create contacts

  public CreateContacts(contact:MyContact):Observable<MyContact>{
    let dataUrl:string = `${this.baseUrl}/contacts`;
    return this.http.post<MyContact>(dataUrl,contact).pipe(catchError(this.handleError))
  }

  //update contacts
  
  public UpdateContacts(contact:MyContact, contactId:string):Observable<MyContact[]>{
    let dataUrl:string = `${this.baseUrl}/contacts/${contactId}`;
    return this.http.put<MyContact[]>(dataUrl,contact).pipe(catchError(this.handleError))
  }

  //Delete contacts
  public deleteContacts(contactId:string):Observable<MyContact>{
    let dataUrl:string = `${this.baseUrl}/contacts/${contactId}`;
    return this.http.delete<MyContact>(dataUrl).pipe(catchError(this.handleError))
  }

  //get All Groups
  public getAllGroups() :Observable<MyGroup[]>{
    let dataUrl:string = `${this.baseUrl}/groups`;
    return this.http.get<MyGroup[]>(dataUrl).pipe(catchError(this.handleError))

  }

  //get single group
  public getGroup(contact:MyContact) :Observable<MyGroup>{
    let dataUrl:string = `${this.baseUrl}/groups/${contact.groupId}`;
    return this.http.get<MyGroup>(dataUrl).pipe(catchError(this.handleError))

  }


  //Error solve
  public handleError(error:HttpErrorResponse){
    // let errorMessage = `Error :${error.error.message}`
    let errorMessage:string= ''
    if(error.error instanceof ErrorEvent){
      // client error
      errorMessage = `Error :${error.error.message}`

  } else{
    // server side error
    errorMessage = `Status: ${error.status} \n Message: ${error.message}` ;


  }
  return throwError(errorMessage)
  }
}
