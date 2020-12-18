import { VehiculeType } from "./vehicule-type.enum";

export interface IVehicule {
    id: number;
    type: VehiculeType;
    fabricant: String;
    model: String;
    annee: number;
}
