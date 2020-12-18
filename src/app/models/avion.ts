import { IVehicule } from "./i-vehicule";
import { VehiculeType } from "./vehicule-type.enum";

export class Avion implements IVehicule {
    id: number;
    type: VehiculeType;
    fabricant: String;
    model: String;
    annee: number;
    modePropulsion: String;
    capacite: number;
    tempsUsage: number;
}
