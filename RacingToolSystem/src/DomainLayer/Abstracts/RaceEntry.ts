import { Categorie } from "../Enums/Categorie";

export default abstract class RaceEntry {
  _id: string;
  club: string;
  categorie: Categorie;
}
