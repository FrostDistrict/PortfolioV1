import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IVehicule } from "../models/i-vehicule";
import { ReactiveService } from "./reactive.service";

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {

  vehiculeForm = new FormGroup({
    id: new FormControl('', [
      Validators.required, Validators.minLength(5), Validators.maxLength(7), this.uniqueIdValidator(), Validators.pattern('[A-Za-z0-9]*')
    ]),
    type: new FormControl('voiture', Validators.required),
    fabricant: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    annee: new FormControl('', [Validators.required, Validators.min(1850), Validators.max(2021)]),
    voitureForm: new FormGroup({
      couleur: new FormControl(''),
      kilometrage: new FormControl('', [Validators.min(0)]),
      transmission: new FormControl(''),
      modePropulsion: new FormControl('')
    }),
    avionForm: new FormGroup({
      modePropulsion: new FormControl(''),
      capacite: new FormControl('', [Validators.min(0)]),
      tempsUsage: new FormControl('', [Validators.min(0)])
    }),
    bateauForm: new FormGroup({
      couleur: new FormControl(''),
      tempsUsage: new FormControl('', [Validators.min(0)])
    })
  });

  listVehicules: any[];
  validMessage: string = "";
  validId: string = "";
  imageUrl: any = { voiture: "url(assets/img/voiture.jpg)", bateau: "url(assets/img/bateau.jpg)", avion: "url(assets/img/avion.jpg)" };

  constructor(private service: ReactiveService, private router: Router) { }

  ngOnInit(): void {
    this.getAllVehicules();
  }

  uniqueIdValidator(): ValidatorFn {
    return (control: AbstractControl): any => {
      let valid = true;
      if (this.listVehicules == null) {
        return;
      }
      this.listVehicules.forEach(vehicule => {
        if (vehicule.id == control.value) {
          valid = false;
        }
      });
      if(valid){
        this.validId = "";
        return null;
      }else{
        this.validId = "Un vehicule existe deja avec cette immatriculation"
        return {uniqueIdValidator : {valid:false}};
      }
    }
  }

  removeUnusedGroups() {
    if (this.vehiculeForm.value.type == 'voiture') {
      this.vehiculeForm.removeControl('avionForm');
      this.vehiculeForm.removeControl('bateauForm');
    }
    if (this.vehiculeForm.value.type == 'avion') {
      this.vehiculeForm.removeControl('voitureForm');
      this.vehiculeForm.removeControl('bateauForm');
    }
    if (this.vehiculeForm.value.type == 'bateau') {
      this.vehiculeForm.removeControl('voitureForm');
      this.vehiculeForm.removeControl('avionForm');
    }
  }

  getAllVehicules(): void {
    this.service.getAll().subscribe(data => {
      this.listVehicules = data;
    }, (err) => {
      console.log(err);
    });
  }

  public changeBackground(): object {
    return { 'background-image': this.imageUrl[this.vehiculeForm.value.type] };
  }

  public onSubmit() {
    if (this.vehiculeForm.valid) {
      this.removeUnusedGroups();
      console.log(this.vehiculeForm.value);
      this.service.save(this.vehiculeForm.value).subscribe(data => {
        this.vehiculeForm.reset();
        this.router.navigateByUrl('/crud');
      }, (err) => {
        console.log(err);
      });
    } else {
      this.validMessage = "S.V.P remplir les champs requis";
    }
  }

}
