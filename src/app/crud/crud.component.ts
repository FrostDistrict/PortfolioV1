import { Component, OnInit } from '@angular/core';
import { IVehicule } from '../models/i-vehicule';
import { CrudService } from "./crud.service";

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  listVehicule : IVehicule[];
  affichage = "global";
  global = ['ID', 'Type', 'Fabricant', 'Model', 'Annee'];
  voiture = ['Couleur', 'Kilometrage', 'Transmission', 'Propulsion'];
  avion = ['Mode de Propulsion', 'Capacite', "Temps d'usage"]

  constructor(private service: CrudService) { }

  ngOnInit(): void {
    this.getAllVehicules();
  }

  getAllVehicules():void {
    this.service.getAll().subscribe(data => { this.listVehicule = data;
      console.log(this.listVehicule);
    });
  }

  public delete(id:number){
    this.service.deleteById(id).subscribe(resultat => {
      this.listVehicule = this.listVehicule.filter(element => element.id !== id);
    });
  }
}
