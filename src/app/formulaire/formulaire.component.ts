import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    id: new FormControl('', Validators.required),
    type: new FormControl('voiture', Validators.required),
    fabricant: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    annee: new FormControl('', Validators.required),
    voitureForm: new FormGroup({
      couleur: new FormControl(''),
      kilometrage: new FormControl(''),
      transmission: new FormControl(''),
      modePropulsion: new FormControl('')
    }),
    avionForm: new FormGroup({
      modePropulsion: new FormControl(''),
      capacite: new FormControl(''),
      tempsUsage: new FormControl('')
    }),
    bateauForm: new FormGroup({
      couleur: new FormControl(''),
      tempsUsage: new FormControl('')
    })
  });

  vehicule: IVehicule;
  validMessage: String = "";
  imageUrl : any = {voiture: "url(assets/img/voiture.jpg)", bateau: "url(assets/img/bateau.jpg)", avion: "url(assets/img/avion.jpg)"};

  constructor(private service: ReactiveService, private router: Router) { }

  ngOnInit(): void {
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

  public changeBackground() : object {
    return { 'background-image': this.imageUrl[this.vehiculeForm.value.type] };
  }

  public onSubmit() {
    if (this.vehiculeForm.valid) {
      this.removeUnusedGroups();
      console.log(this.vehiculeForm.value);
      this.service.save(this.vehiculeForm.value).subscribe(data => {
        this.vehiculeForm.reset();
        this.router.navigateByUrl('/crud');
      });
    } else {
      this.validMessage = "Prease fill the form before submitting!";
    }
  }

}
