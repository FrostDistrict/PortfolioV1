import { IVehicule } from "./i-vehicule";
import { VehiculeType } from "./vehicule-type.enum";

export class Voiture implements IVehicule{
    id: number;
    type: VehiculeType;
    fabricant: String;
    model: String;
    annee: number;
    couleur: string;
    kilometrage: number;
    transmission: String;
    modePropulsion: String;
}
