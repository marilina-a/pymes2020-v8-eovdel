import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { of } from "rxjs";
import { Auto } from "../models/auto";

@Injectable({
  providedIn: 'root'
})
export class AutosService {
  resourceUrl: string;
  constructor(private httpCliente: HttpClient) {
    this.resourceUrl = "https://pavii.ddns.net/api/Autos"
   }

 get(){
     return this.httpCliente.get(this.resourceUrl)
   }

  post(obj:Auto) {
    return this.httpCliente.post(this.resourceUrl, obj);
  }
delete(Id){
    return this.httpCliente.delete(this.resourceUrl +'/' + Id);
  }
}