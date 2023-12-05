import { Image } from "./image.model";
import { Souche } from "./souche.model";

export class Chat {
    idChat? : number;
    nomChat? : string;
    prixAdoption? : number;
    datenaissance? : Date ;
    coulour? : string;
    souche? : Souche;
    image! : Image;
    imageStr!:string;
  images: any;
}