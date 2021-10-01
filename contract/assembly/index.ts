import { PersistentMap, Context, logging} from "near-sdk-as";
//import {  connect, KeyPair, keyStores, utils  } from "near-api-js";
//require('dotenv').config();

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
    //transferir(vasseto.owner,id_new_owner,vasseto.deposito);
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


/*
const nearAPI  = require('near-api-js');
const { connect, KeyPair, keyStores, utils } = nearAPI;

//this is required if using a local .env file for private key
require('dotenv').config();

// configure accounts, network, and amount of NEAR to send
// converts NEAR amount into yoctoNEAR (10^-24) using a near-api-js utility
//const sender = 'sender.testnet';
//const receiver = 'receiver.testnet';
const networkId = 'testnet';

async function transferir(sender:string,receiver:string,amount:string):Promise {

  // sets up an empty keyStore object in memory using near-api-js
  const keyStore = new keyStores.InMemoryKeyStore();
  // creates a keyPair from the private key provided in your .env file
  const keyPair = KeyPair.fromString("3wb4fVQvafPebkcCmyQPgMa2VsnX3JAQXZ4gjpc3kSu9AbVtLpLZqEog4xTbJrJxG1Y88SkHpuJV58GmPRnPXMD");
  // adds the key you just created to your keyStore which can hold multiple keys
  await keyStore.setKey(networkId, sender, keyPair);

  // configuration used to connect to NEAR
  const config = {
    networkId,
    keyStore,
    nodeUrl: `https://rpc.${networkId}.near.org`,
    walletUrl: `https://wallet.${networkId}.near.org`,
    helperUrl: `https://helper.${networkId}.near.org`,
    explorerUrl: `https://explorer.${networkId}.near.org`
  };

  // connect to NEAR! :) 
  const near = await connect(config);
  // create a NEAR account object
  const senderAccount = await near.account(sender);

  try {
    // here we are using near-api-js utils to convert yoctoNEAR back into a floating point
    console.log(`Sending ${utils.format.formatNearAmount(amount)}Ⓝ from ${sender} to ${receiver}...`);
    // send those tokens! :)
    const result = await senderAccount.sendMoney(receiver, amount);
    // console results
    console.log('--------------------------------------------------------------------------------------------');
    console.log('OPEN LINK BELOW to see transaction in NEAR Explorer!');
    console.log(`${config.explorerUrl}/transactions/${result.transaction.hash}`);
    console.log('--------------------------------------------------------------------------------------------');
  } catch(error) {
    // return an error if unsuccessful
    console.log(error);
  }
}*/