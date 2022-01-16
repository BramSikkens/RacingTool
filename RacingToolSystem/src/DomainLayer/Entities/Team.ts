import RaceEntry from "../Abstracts/RaceEntry";
import { Categorie } from "../Enums/Categorie";
import { Deelnemer } from "./Deelnemer";

export default class Team extends RaceEntry {
  _team: Array<Deelnemer>;
  constructor(
    categorie: Categorie,
    id: string,
    club: string,
    team: Array<Deelnemer>
  ) {
    super();
    this.categorie = categorie;
    this._id = id;
    this.club = club;
    this._team = team;
  }
}
