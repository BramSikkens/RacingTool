import { Type } from "class-transformer";
import { Deelnemer } from "./Deelnemer";
import Race from "./Race";
import { Reeks } from "./Reeks";

export default class Organisatie {
  naam: string;
  start: Date;
  einde: Date;
  plaats: string;

  @Type(() => Race)
  inschrijvingen: Map<string, Race> = new Map<string, Race>();

  constructor(naam: string, plaats: string, start: Date, einde: Date) {
    this.naam = naam;
    this.plaats = plaats;
    this.start = start;
    this.einde = einde;
  }

  private _id: string = "";
  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  addWedstrijd(wedstrijd: Race, wedstrijdTitle: string) {
    this.inschrijvingen.set(wedstrijdTitle, wedstrijd);
  }

  verkrijgDeelnemers(): Array<Deelnemer> {
    let deelnemersLijst: Array<Deelnemer> = new Array();
    for (let key of this.inschrijvingen.keys()) {
      let deelnemerVanSpecifiekNr = this.inschrijvingen
        .get(key)!
        .verkrijgDeelnemers();

      deelnemersLijst.push(...deelnemerVanSpecifiekNr);
    }

    deelnemersLijst = deelnemersLijst.filter((item, pos) => {
      return deelnemersLijst.indexOf(item) == pos;
    });

    return deelnemersLijst;
  }

  verkrijgAlleReeksen(): Array<Reeks> {
    let reeksLijst: Array<Reeks> = new Array();
    for (let key of this.inschrijvingen.keys()) {
      let reeksenVanSpecifiekNr = this.inschrijvingen
        .get(key)!
        .verkrijgReeksen(
          Array.from((this.inschrijvingen.get(key)! as Race)._reeksen.keys())
        );

      reeksLijst.push(...reeksenVanSpecifiekNr);
    }

    return reeksLijst;
  }

  verkrijgWedstrijdKeys(): any {
    let races: { [k: string]: any } = {};
    for (let key of this.inschrijvingen.keys()) {
      races[key] = {};
      for (let ronde of this.inschrijvingen!.get(key)!._reeksen.keys()) {
        races[key][ronde] = {};
      }
    }
    return races;
  }
}
