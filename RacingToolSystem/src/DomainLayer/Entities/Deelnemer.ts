import crypto from "crypto";
import RaceEntry from "../Abstracts/RaceEntry";
import { Categorie } from "../Enums/Categorie";

export class Deelnemer extends RaceEntry {
  _naam: string;

  constructor(naam: string, club: string, categorie: Categorie) {
    super();
    this._naam = naam.toUpperCase().replace(" ", "_");
    this.categorie = categorie;
    this.club = club;
    this._id = crypto
      .createHash("md5")
      .update(this._naam)
      .digest("hex")
      .substring(0, 24);
  }

  /**
   * Getter naam
   * @return {string}
   */
  public get naam(): string {
    return this._naam;
  }

  /**
   * Setter naam
   * @param {string} value
   */
  public set naam(value: string) {
    this._naam = value.toUpperCase().replace(" ", "_");
    this._id = crypto
      .createHash("md5")
      .update(this._naam)
      .digest("hex")
      .substring(0, 24);
  }
}
