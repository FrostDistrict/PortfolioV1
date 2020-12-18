import { IVehicule } from "./i-vehicule";
import { VehiculeType } from "./vehicule-type.enum";

export class Bateau implements IVehicule{
    id: number;
    type: VehiculeType;
    fabricant: String;
    model: String;
    annee: number;
    couleur: String;
    tempsUsage: number;
}
