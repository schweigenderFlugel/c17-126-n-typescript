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
