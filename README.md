# Cohorte 17 - Equipo 126 - TypeScript


Realizamos un diseño de una fintech enfocada en una billetera virtual, basado en los principios de simplificación de “The laws of simplicity” de John Maeda, simplificada al máxomo para incentivar a todas las personas a invertir en la app

---


## <img width="30" height="30" src="https://img.icons8.com/doodle/30/crowd.png" alt="crowd"/> INTEGRANTES


| <img width="30" height="30" src="https://img.icons8.com/dusk/30/web.png" alt="web"/> FrontEnd |
| -------------- |
| [<img width="20" height="20" src="https://img.icons8.com/ios-filled/20/github.png" alt="github"/> Alexis Checura](https://github.com/alexischecura) |
| [<img width="20" height="20" src="https://img.icons8.com/ios-filled/20/github.png" alt="github"/> Facundo Castro](https://github.com/schweigenderFlugel) |


| <img width="30" height="30" src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/30/external-server-miscellaneous-kiranshastry-lineal-color-kiranshastry.png" alt="external-server-miscellaneous-kiranshastry-lineal-color-kiranshastry"/> BackEnd |
| ----------|
| [<img width="20" height="20" src="https://img.icons8.com/ios-filled/20/github.png" alt="github"/>  Saúl Belbey](https://github.com/sbelbey) |


| PM |
| -- |
| [<img width="20" height="20" src="https://img.icons8.com/ios-filled/20/github.png" alt="github"/> Miguel Miche](https://github.com/migmm) |

---

## <img width="40" height="40" src="https://img.icons8.com/ios-filled/40/rdp-connection.png" alt="rdp-connection"/>  TECNOLOGÍAS UTILIZADAS

### FRONT END

| FrontEnd |
| ------- |
| <img width="20" height="20" src="https://img.icons8.com/color/20/html-5--v1.png" alt="html-5"/> HTML5 |
| <img width="20" height="20" src="https://img.icons8.com/color/20/css3.png" alt="css3"/> CSS3 |
| <img width="20" height="20" src="https://img.icons8.com/office/20/react.png" alt="react"/> [React](https://react.dev/) |
|  <img width="20" height="20" src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/nextjs/nextjs-original.svg" alt="nextjs"/> [Next](https://react.dev/) |
| <img width="20" height="20" src="https://img.icons8.com/fluency/20/typescript--v1.png" alt="typescript--v1"/> [Typescript](https://www.typescriptlang.org/) |


### BACK END

| BackEnd |
| -------- |
| [<img width="20" height="20" src="https://img.icons8.com/color/20/nodejs.png" alt="nodejs"/> NodeJS](https://nodejs.org/en) |
| [ <img width="20" height="20" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express"/> Express](https://expressjs.com/) |
| [<img width="20" height="20" src="https://img.icons8.com/color/20/postgreesql.png" alt="postgreesql"/> Postgresql](https://www.postgresql.org/) |


### UX/UI

| UX / UI |
| -------- |
| <img width="20" height="20" src="https://img.icons8.com/color/20/figma--v1.png" alt="figma--v1"/> Figma |


---

## <img width="40" height="40" src="https://img.icons8.com/color/48/dynamic-links.png" alt="dynamic-links"/> LINKS

- <img width="20" height="20" src="https://img.icons8.com/external-flaticons-flat-flat-icons/20/external-kanban-agile-flaticons-flat-flat-icons.png" alt="external-kanban-agile-flaticons-flat-flat-icons"/> [Trello](https://trello.com/b/gpLcQ0Tu/c17-126-n-typescript)

- <img width="20" height="20" src="https://img.icons8.com/color/20/figma--v1.png" alt="figma--v1"/>[Figma](https://www.figma.com/file/HOyFQvD8d68nAtCb49ehPr/c17-126-n-typescript---Banca-Digital?type=design&node-id=227-6845&mode=design)

---


### Para ejecutar la aplicación en local sigue los siguientes pasos:

> Ejecutar los comandos dentro de la carpeta `c17-126-n-typescript`

#### 1 - crear o actualizar el archivo .env siguiendo el archivo .env.example en cada proyecto

#### 2 - Instalar las dependencias a nivel global

```bash
npm run back:init
npm run front:init
```

#### 3 - Ejecutar localmente solo para el `front`

```bash
npm run front:dev
```

> Este comando compila el backend en una carpeta llamada distBE y ejecuta el front como el back compilado.

#### 3 - Ejecutar localmente solo para el `back`

```bash
npm run back:dev
```

> Este comando ejecuta nodemon para mantener el servidor activo a medida que se hagan cambios en el back, no levanta el front.

### Para ejecutar los test puedes utilizar los siguientes comandos:

```bash
npm run test
```

o alternativamente para el front

```bash
npm run test:ui
```

### Deploy

> Para deployar el proyecto se trabajara con Docker Compose `npm run deploy`

```bash
docker compose up
```

### Documentación

La aplicación incluye tests unitarios y documentación en Swagger accediendo a http://localhost:8080/apidocs/


### Deploy

https://bankme-nc.netlify.app/
