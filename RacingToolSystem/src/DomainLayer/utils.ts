import RaceEntry from "./Abstracts/RaceEntry";
import { Deelnemer } from "./Entities/Deelnemer";
import { Reeks } from "./Entities/Reeks";
import { BootType } from "./Enums/BootType";
import { Categorie } from "./Enums/Categorie";

export function verdeelInschrijvingenPerCategorie(
  deelnemers: Array<RaceEntry>
): Map<Categorie, Array<RaceEntry>> {
  let map: Map<Categorie, Array<RaceEntry>> = new Map();
  deelnemers.forEach((deelnemer: RaceEntry) => {
    if (!map.get(deelnemer.categorie)) {
      map.set(deelnemer.categorie, new Array<RaceEntry>());
    }
    map.get(deelnemer.categorie)?.push(deelnemer);
  });
  return map;
}

export function verdeelReeksenPerCategorie(
  reeksen: Array<Reeks>
): Map<Categorie, Array<Reeks>> {
  let map: Map<Categorie, Array<Reeks>> = new Map();
  reeksen.forEach((reeks: Reeks) => {
    if (!map.get(reeks.categorie)) {
      map.set(reeks.categorie, new Array<Reeks>());
    }
    map.get(reeks.categorie)?.push(reeks);
  });

  return map;
}

export function CreerReeksenUitDeelnemerslijst(
  deelnemerLijst: Array<RaceEntry>,
  aantalBanen: number
) {
  let ronde = new Array<Reeks>();

  deelnemerLijst = shuffleDeelnemersLijst(deelnemerLijst);

  let deelnemersPerCat: Map<
    Categorie,
    Array<RaceEntry>
  > = verdeelInschrijvingenPerCategorie(deelnemerLijst);

  for (let key of deelnemersPerCat.keys()) {
    let newReeks = new Reeks(key, aantalBanen);
    deelnemersPerCat.get(key)?.forEach((deelnemer: RaceEntry, index) => {
      let DeelnemerIsLast = index + 1 == deelnemersPerCat.get(key)?.length;
      let ReeksIsFull = newReeks.baanVerdeling.size == aantalBanen - 1;
      newReeks.addDeelnemer(deelnemer);
      //Reeks is full
      if (DeelnemerIsLast || newReeks._isFull) {
        ronde.push(newReeks);
        newReeks = new Reeks(key, aantalBanen);
      }
    });
  }
  return ronde;
}

export function shuffleDeelnemersLijst(array: Array<RaceEntry>) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function VoegInschrijvingenToe(
  inschrijvingsArray: Array<RaceEntry>,
  existingInschrijvingsLijst?: Map<Categorie, Array<Reeks>>,
  maxAantalBanen?: number
): Map<Categorie, Array<Reeks>> {
  let inschrijvingsLijst: Map<Categorie, Array<Reeks>>;

  if (existingInschrijvingsLijst) {
    inschrijvingsLijst = existingInschrijvingsLijst;
  } else {
    inschrijvingsLijst = new Map<Categorie, Array<Reeks>>();
  }

  let inteschrijvenDeelnemersPerCategorie =
    verdeelInschrijvingenPerCategorie(inschrijvingsArray);

  //loop over elke categorie
  for (let categorie in Categorie) {
    //ga alleen verder met categorien waarvan moet worden ingeschreven
    if (inteschrijvenDeelnemersPerCategorie.has(categorie as Categorie)) {
      //Als Categorie nog niet bestaan in inschrijvingslijst
      if (!inschrijvingsLijst.has(categorie as Categorie)) {
        //voeg categorie toe aan inschrijvingslijst
        inschrijvingsLijst.set(
          categorie as Categorie,
          new Array<Reeks>(new Reeks(categorie as Categorie, maxAantalBanen))
        );
      }

      //sorteer deelnemers per Categorie
      inteschrijvenDeelnemersPerCategorie
        .get(categorie as Categorie)!
        //Voor elke deelnemer in huidige categorie
        .forEach((deelnemer: RaceEntry) => {
          let inschrijvingsLijstVanCategorie: Array<Reeks> =
            inschrijvingsLijst.get(categorie as Categorie)!;

          //filter
          let OpenRaces = inschrijvingsLijstVanCategorie.filter(
            (reeks: Reeks) => !reeks._isFull
          );

          if (OpenRaces.length > 0) {
            OpenRaces[0].addDeelnemer(deelnemer);
          } else {
            let newReeks: Reeks = new Reeks(
              categorie as Categorie,
              maxAantalBanen
            );
            newReeks.addDeelnemer(deelnemer);
            inschrijvingsLijst.get(categorie as Categorie)!.push(newReeks);
          }
        });
    }
  }

  return inschrijvingsLijst;
}

export function replacer(key: any, value: any) {
  if (value instanceof Map) {
    return {
      dataType: "Map",
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}

export function reviver(key: any, value: any) {
  if (typeof value === "object" && value !== null) {
    if (value.dataType === "Map") {
      return new Map(value.value);
    }
  }
  return value;
}

export function howManyTeamMembers(boattype: BootType) {
  switch (boattype) {
    case BootType.K1:
      return 1;
      break;
    case BootType.K2:
      return 2;
      break;
    case BootType.K4:
      return 4;
      break;
    case BootType.WW_TEAM:
      return 3;
      break;
    default:
      return 1;
      break;
  }
}
