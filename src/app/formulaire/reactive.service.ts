import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericCrudService } from '../service/generic-crud.service';
import { IVehicule } from '../models/i-vehicule';

@Injectable({
  providedIn: 'root'
})
export class ReactiveService extends GenericCrudService<IVehicule, number> {

  constructor(http: HttpClient) {
    super(http, "http://localhost:3000/api");
   }
}
