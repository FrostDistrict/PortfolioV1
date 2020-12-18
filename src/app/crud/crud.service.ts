import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IVehicule } from '../models/i-vehicule';
import { GenericCrudService } from '../service/generic-crud.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService extends GenericCrudService<IVehicule, number>{

  constructor(http: HttpClient) {
    super(http, "http://localhost:3000/api");
  }
}
