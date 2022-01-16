import { Type } from "class-transformer";
import RaceEntry from "../Abstracts/RaceEntry";
import { Categorie } from "../Enums/Categorie";

export class Reeks {
  private _categorie: Categorie;
  @Type(() => RaceEntry)
  _baanVerdeling: Map<number, RaceEntry>;
  _startTijd: Date;
  _maxAantalBanen: number | undefined;
  _isFull: boolean;

  constructor(categorie: Categorie, maxAantalBanen?: number) {
    this._categorie = categorie;
    this._maxAantalBanen = maxAantalBanen;
    this._baanVerdeling = new Map();
    this._isFull = false;
  }

  get categorie(): Categorie {
    return this._categorie;
  }

  get baanVerdeling(): Map<number, RaceEntry> {
    return this._baanVerdeling;
  }

  set startTijd(tijd: Date) {
    this._startTijd = tijd;
  }

  get startTijd(): Date {
    return this._startTijd;
  }

  addDeelnemer(deelnemer: RaceEntry, baanNr?: number): Map<number, RaceEntry> {
    if (this._isFull) {
      throw Error("Reeks is Vol");
    }
    if (deelnemer.categorie !== this._categorie) {
      throw Error("Deze deelnemer heeft niet de juiste categorie");
    }

    if (baanNr) {
      if (this._baanVerdeling.get(baanNr) == undefined) {
        this._baanVerdeling.set(baanNr, deelnemer);
      } else {
        throw Error("Baan is niet vrij");
      }
    } else {
      if (this._maxAantalBanen != undefined) {
        for (let baan = 1; baan <= this._maxAantalBanen; baan++) {
          if (!this._baanVerdeling.has(baan)) {
            this._baanVerdeling.set(baan, deelnemer);
            break;
          }
        }
        this._isFull = this._baanVerdeling.size == this._maxAantalBanen;
      } else {
        this.baanVerdeling.set(this._baanVerdeling.size + 1, deelnemer);
      }
    }
    return this._baanVerdeling;
  }

  removeDeelnemer(id: string): any {
    console.log("user to remove: ", id);
    let deelnemerToRemove: RaceEntry;
    this.baanVerdeling.forEach((deelnemer: RaceEntry, key: number) => {
      if (deelnemer._id == id) {
        deelnemerToRemove = deelnemer;
        this.baanVerdeling.delete(key);
        return deelnemerToRemove;
      }
    });
  }
}
