### Para ejecutar la aplicación en local sigue los siguientes pasos:

> Ejecutar los comandos dentro de la carpeta `c17-126-n-typescript`

#### 1 - crear o actualizar el archivo .env siguiendo el archivo .env.example

#### 2 - Instalar las dependencias

```bash
npm install
```

#### 3 - Ejecutar localmente solo para el `front`

```bash
npm run start-dev
```

> Este comando compila el backend en una carpeta llamada distBE y ejecuta el front como el back compilado.

#### 3 - Ejecutar localmente solo para el `back`

```bash
npm run build-backend
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
