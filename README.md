# AssetStore
Introducción a AssetStore
AssetStore es un smartcontract escrito en assembly bajo el protocolo near
que permite:

- Crear un mapa de hashes para un objeto y otorgarle un dueño
- Transferir el dueño del objeto
- Realizar transacciones con el objeto

## Paso 1: Pre-requisitos
- Asegúrese de haber instalado Node.js ≥ 12 ((recomendamos usar nvm)
- Asegúrese de haber instalado yarn:     ``` npm install -g yarn  ```

## Instalar dependencias: 
- Instalar Yarn:
    ``` yarn install ```



- Crear un test near account NEAR test account

- Instalar el NEAR CLI globally: near-cli es una interfaz de linea de comando (CLI) para interacturar con NEAR blockchain:
      ``` yarn install --global near-cli```

## Paso 2: Configura tu NEAR CLI
Configura tu near-cli para autorizar su cuenta de prueba creada recientemente:
near login (Se abrira una pestaña en tu navegador, tendras que darle autorizacion a tu cuenta de testnet)

## Paso 3: Deberas clonar el repositorio de github
Puedes hacerle fork

![image](https://user-images.githubusercontent.com/61811113/135677950-ef73017e-e657-40c4-ade9-84fc43a6aea5.png)

y luego clonarlo con:
    ``` git clone https://github.com/AlanFletes/AssetStore.git ```


Una vez que hayas descargado el repositorio, asegurate de ejecutar los comandos dentro del repositorio descargado.
utilizando: 
    ``` cd AssetStore ```


## Paso 4: Realice la instalación del gestor de dependencia de Node.js dentro del repositorio: 
     npm install

ejecute el contrato con:
     ``` npm start  ```
    
Ahora se debera abrir una pagina en tu navegador, ¡muy bien! ya tienes un entorno de desarrollo local ejecutandose sobre near testnet

## <Consejos basicos>
Para realizar pruebas directas se recomienda abrir una segunda terminal con el mismo directorio

Si necesita cambiar algo o cambio algo no olvide utilizar el conjunto de teclas ctl + c en la terminal donde esta corriendo el contrato
asi cerrara el proceso para que se guarden los cambios y pueda ejecutar:
     ``` npm start ```

Comandos para ejecutar comandos directos:
Crear objeto:

     ``` near call cuentadev crear_vasset '{"id_cuenta":"Nombre.testnet","vasset":"numeroIdentificador|NombreDelVasseto|DescripciónDelVasseto|' --account_id Nombre.testnet ```
 
Verificar propiedad:
      ``` near call cuentadev obtener_vasseto '{"id_vasseto":0}' --accountid nombre.testnet ```

Transferir:
      ``` near call cuenta transferir_vasseto '{"id_new_owner":"new owner","id_vasseto": id):}'--acountid nombre.testnet ```

 
      ``` 
This is a explanation of the smart contract file system

├── README.md                                       # this file
├── as-pect.config.js                               # configuración de as-pect (AssemblyScript pruebas unicas)
├── asconfig.json                                   # archivo de configuracion para el compilado de Assemblyscript
├── assembly
│   ├── _tests_
│   │   ├── as-pect.d.ts                            # as-pect unit testing headers for type hints
│   │   └── main.spec.ts                            # Prueba unica del contrato
│   ├── as_types.d.ts                               # AssemblyScript headers for type hint
│   ├── index.ts                                    # contiene el codigo del contrato inteligente
│   ├
│   └── tsconfig.json                               # archivo de configuracion de typescript
├── neardev
│   ├── dev-account                                 #in this file the provisional deploy smart contract account is saved
│   └── dev-account.env                             #in this file the provisional deploy smart contract account is saved like a environment variable                             
├── out
│   └── main.wasm                                   # compiled smart contract code using to deploy
       ``` 
