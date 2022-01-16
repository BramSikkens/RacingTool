import { plainToClass } from "class-transformer";
import fs from "fs";
import { replacer, reviver } from "../DomainLayer/utils";
import Organisatie from "../DomainLayer/Entities/Organisatie";
import IPersistable from "../ApplicationLayer/IPersistable";
import { saveAs } from "file-saver";

export default class FileReaderWeb implements IPersistable {
  save(organisatie: Organisatie): boolean {
    if (!organisatie) {
      throw new Error("No organisation");
    }
    const organisatieJson = JSON.stringify(organisatie, replacer);
    var file = new File(["Hello, world!"], "hello world.txt", {
      type: "text/plain;charset=utf-8",
    });
    saveAs(file);

    return true;
  }
  load(path?: string, filecontent?: string): Organisatie {
    if (!filecontent) {
      throw new Error("There is no content");
    }
    const organisatieJSON: Object = JSON.parse(filecontent, reviver);
    const organisatie: Organisatie = plainToClass(Organisatie, organisatieJSON);

    return organisatie;
  }
}
