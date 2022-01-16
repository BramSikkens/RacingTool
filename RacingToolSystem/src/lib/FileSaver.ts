import { plainToClass } from "class-transformer";
import fs from "fs";
import { replacer, reviver } from "../DomainLayer/utils";
import Organisatie from "../DomainLayer/Entities/Organisatie";
import IPersistable from "../ApplicationLayer/IPersistable";

class FileSaver implements IPersistable {
  private static instance: FileSaver;
  private constructor() {}

  public static getInstance(): FileSaver {
    if (!FileSaver.instance) {
      FileSaver.instance = new FileSaver();
    }
    return FileSaver.instance;
  }

  save(organisatie: Organisatie): boolean {
    let stringifiedOrganisatie = JSON.stringify(organisatie, replacer);
    fs.writeFileSync("../Savefiles/saved.txt", stringifiedOrganisatie);
    return true;
  }
  load(path: string): Organisatie {
    let stringifiedOrganisatie = fs.readFileSync(path, "utf-8");
    let organisatieJSON: Object = JSON.parse(stringifiedOrganisatie, reviver);
    let organisatie: Organisatie = plainToClass(Organisatie, organisatieJSON);

    return organisatie;
  }
}

export default FileSaver;
