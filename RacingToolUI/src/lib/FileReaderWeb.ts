import IPersistable from "PropagandaSysteem/src/ApplicationLayer/IPersistable";
import Organisatie from "PropagandaSysteem/src/DomainLayer/Entities/Organisatie";
import { reviver } from "PropagandaSysteem/src/DomainLayer/utils";
import { plainToClass } from "class-transformer";

export default class FileReaderWeb implements IPersistable {
  save(organisatie: Organisatie): boolean {
    throw new Error("Method not implemented.");
  }
  load(path?: string, filecontent?: string): Organisatie {
    if (!filecontent) {
      throw new Error("There is no content");
    }
    const organisatieJSON: Record<string, any> = JSON.parse(
      filecontent,
      reviver
    );
    const organisatie: Organisatie = plainToClass(Organisatie, organisatieJSON);


    return organisatie;
  }
}
