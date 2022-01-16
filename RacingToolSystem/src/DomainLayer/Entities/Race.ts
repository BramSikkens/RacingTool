import { Type } from "class-transformer";
import RaceEntry from "../Abstracts/RaceEntry";
import { BootType } from "../Enums/BootType";
import { Categorie } from "../Enums/Categorie";
import { shuffleDeelnemersLijst, VoegInschrijvingenToe } from "../utils";
import { Deelnemer } from "./Deelnemer";
import { Reeks } from "./Reeks";
import Team from "./Team";
import util from "util";

export default class Race {
  @Type(() => Reeks)
  _reeksen: Map<string, Map<Categorie, Array<Reeks>>> = new Map();
  _afstand: string;
  _bootType: BootType;
  _maxAantalBanen: number;

  constructor(afstand: string, bootType: BootType, maxAantalBanen?: number) {
    this._afstand = afstand;
    this._bootType = bootType;

    if (maxAantalBanen) {
      this._maxAantalBanen = maxAantalBanen;
    }
  }

  verkrijgDeelnemers(): Array<Deelnemer> {
    let deelnemerArray: Array<Deelnemer> = [];
    let alleReeksen: Array<Reeks> = this.verkrijgReeksen([
      ...this._reeksen.keys(),
    ]);

    alleReeksen.forEach((reeks: Reeks) => {
      reeks.baanVerdeling.forEach((value: RaceEntry, key: number) => {
        if (!("team" in value)) {
          deelnemerArray.push(value as Deelnemer);
        } else if ("team" in value) {
          (value as Team)._team.forEach((deelnemer: Deelnemer) => {
            deelnemerArray.push(deelnemer as Deelnemer);
          });
        }
      });
    });

    //filter
    deelnemerArray = deelnemerArray.filter((item, pos) => {
      return deelnemerArray.indexOf(item) == pos;
    });

    return deelnemerArray;
  }

  verkrijgReeksen(rondes: Array<string>): Array<Reeks> {
    let reeksenArray: Array<Reeks> = new Array<Reeks>();
    rondes.forEach((ronde: string) => {
      if (this._reeksen.has(ronde)) {
        let reeksenInRonde: Map<Categorie, Array<Reeks>> = this._reeksen.get(
          ronde
        )!;

        for (let key of reeksenInRonde.keys()) {
          let reeksen: Array<Reeks> = reeksenInRonde.get(key as Categorie)!;
          reeksenArray.push(...reeksen);
        }
      }
    });
    return reeksenArray;
  }

  verkrijgRondes(): Array<string> {
    return Array.from(this._reeksen.keys());
  }

  creerRonde(
    title: string,
    deelnemers?: Array<RaceEntry>,
    maxAantalBanen?: number
  ) {
    this._reeksen.set(title, new Map<Categorie, Array<Reeks>>());
    // if (deelnemers) {
    //   this.schrijfIn(deelnemers, [title], maxAantalBanen);
    // }
  }

  schrijfIn(
    deelnemers: Array<RaceEntry>,
    rondes: Array<string>,
    maxAantalBanen?: number
  ) {
    rondes.forEach((ronde: string) => {
      if (!this._reeksen.has(ronde)) {
        throw Error("Ronde bestaat niet");
      } else {
        let existingInschrijvingen = this._reeksen.get(ronde);

        this._reeksen.set(
          ronde,
          VoegInschrijvingenToe(
            shuffleDeelnemersLijst(deelnemers),
            existingInschrijvingen,
            maxAantalBanen
          )
        );
      }
    });
  }

  schrijfUit(id: string, rondes: Array<string>) {
    rondes.forEach((ronde: string) => {
      if (!this._reeksen.has(ronde)) {
        throw Error("Ronde bestaat niet");
      } else {
        for (let key in Categorie) {
          this._reeksen
            .get(ronde)
            ?.get(key as Categorie)
            ?.forEach((reeks: Reeks, index) => {
              reeks.removeDeelnemer(id);
            });
        }
      }
    });
  }
}
