import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveService } from '../formulaire/reactive.service';
import { IVehicule } from '../models/i-vehicule';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  id: number;
  vehicule: any = {};
  vehiculeForm: FormGroup;
  validMessage = "";
  imageUrl: any = { voiture: "url(assets/img/voiture.jpg)", bateau: "url(assets/img/bateau.jpg)", avion: "url(assets/img/avion.jpg)" };

  constructor(private service : ReactiveService, private router: Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['itemId'];
    this.service.getById(this.id).subscribe(data => {
      this.vehicule = data;
    });

    this.vehiculeForm = new FormGroup({
      id: new FormControl({value: this.id, disabled: true}, [
        Validators.required, Validators.minLength(5), Validators.maxLength(7),  Validators.pattern('[A-Za-z0-9]*')
      ]),
      type: new FormControl('', Validators.required),
      fabricant: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      annee: new FormControl('', [Validators.required, Validators.min(1850), Validators.max(2022)]),
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
    })
  }

  get vehiculeControls(){
    return this.vehiculeForm.controls;
  }

  public changeBackground(): object {
    return { 'background-image': this.imageUrl[this.vehiculeForm.value.type] };
  }

  public updateUser(){
    this.service.update(this.id, this.vehiculeForm.value).subscribe(data => {
      this.router.navigateByUrl('crud');
    },(err) => {
      console.log(err);
    });
  }

}
