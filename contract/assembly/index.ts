import { PersistentUnorderedMap,PersistentMap,PersistentVector, Context, logging  } from "near-sdk-as";

//
class VirtualAsset{
  id:string;
  owner:string;
  title: string;
  description: string;
  media: string;
  media_hash: string;
  copies: string;
  deposito: string;
  constructor (id:string,owner:string,title: string,description: string,media: string,media_hash: string,copies: string, deposito:string){
    this.id=id;
    this.owner=owner;
    this.title=title;
    this.description=description;
    this.media=media;
    this.media_hash=media_hash;
    this.copies=copies;
    this.deposito=deposito;
    logging.log("Atributos: " + this.id.toString() + "," + this.owner + "," + this.title + "," + this.description + "," + this.copies.toString() + ","+this.deposito);
  }
  getOwner():string {
    return this.owner;
  }
  changeOwner(id_new_owner:string):void{
    this.owner=id_new_owner;
  }
  toString():string{
    return this.id+"|"+this.owner+"|"+this.title+"|"+this.description+"|"+this.media+"|"+this.media_hash+"|"+this.copies+"|"+this.deposito;
  }
  print():string{
    return this.toString();
  }
}


type AccountId = string
let map = new PersistentMap<AccountId,string>('Vassetos')


export function transferir_vasseto(id_new_owner: string, id_vasseto: string):string {
  var solicita:string =Context.sender;
  var vasseto = toVasseto(map.getSome(id_vasseto));
  
  if(vasseto.getOwner()==solicita){
    vasseto.changeOwner(id_new_owner);
    map.set(id_vasseto,vasseto.toString());
    return "Propiedad transferidad a " + vasseto.owner;

  }else{
    return "El vasseto no es tuyo";
  }
}

export function crear_vasseto(vasset:string):string{
  var vasseto = toVasseto(vasset);
  map.set(vasseto.id.toString(),vasset);
  logging.log("Vasseto " + vasseto.title + " creado.");
  return "Vasseto " + vasseto.title + " creado.";
}

function toVasseto(vasset:string):VirtualAsset{
  var datos = vasset.split("|");
  var vasseto = new VirtualAsset(datos[0],datos[1],datos[2],datos[3],datos[4],datos[5],datos[6],datos[7]);
  return vasseto;
}


export function obtener_vasseto(id_vasseto:string):string{
  var vasseto = map.getSome(id_vasseto);
  logging.log("El token pertenece a: "+vasseto.split("|")[1]);
  return "El token pertenece a: "+vasseto.split("|")[1] + " con un valor de " + vasseto.split("|")[7] + " nears.";
}



//near call dev-1633055505836-37283222094676 crear_vasseto '{"id_cuenta":"alanf.testnet","vasset":"0|alanf.testnet|Amogus|You look kinda sus|https://images-ext-2.discordapp.net/external/1RFbk1NvoGfftwzZ2gQVhTTWQgKLSkd_dmiD_a0MNaE/https/i.pinimg.com/originals/2d/b7/f7/2db7f72926a43467c1f685765cbb3181.png?width=505&height=660%22,%22media_hash%22:%22asdfg%22,%22copies%22:1%7D%7D|000|1"}' --account_id alanf.testnet