# Wireless-Pro

![License](https://img.shields.io/badge/license-GPLv3-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D%2010.0.0-green)
![Express.js](https://img.shields.io/badge/express-%5E4.17.1-yellow)
![MongoDB](https://img.shields.io/badge/mongodb-%5E3.6.0-blue)
![Angular](https://img.shields.io/badge/angular-%5E10.0.0-red)

Wireless-Pro es un proyecto de código abierto bajo la Licencia GPL-3.0. Es un software desarrollado con Node.js y Express.js para el backend, MongoDB para la base de datos y Angular para el frontend. Su propósito es asistir a las empresas ISP de redes inalámbricas en la gestión de clientes y pagos, el manejo de averías, la coordinación de órdenes de trabajo y la administración de dispositivos de la empresa. Además, Wireless-Pro implementa cortes automáticos para los clientes que no han realizado sus pagos, garantizando así un control eficiente y automatizado de las conexiones.

## Características

- Gestión de clientes y pagos para ISPs
- Gestión de averías y órdenes de trabajo
- Registro de dispositivos
- Cortes automáticos para clientes morosos
- Control de pagos

## Tecnologías

- **Backend**: Node.js con Express.js
- **Base de datos**: MongoDB
- **Frontend**: Angular

## Instalación

1. Clona el repositorio:
    ```bash
    git clone git@github.com:nimrodleon/wireless-pro.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd wireless-pro
    ```
3. Instala las dependencias del backend:
    ```bash
    cd api
    npm install
    ```
4. Instala las dependencias del frontend:
    ```bash
    cd ..
    npm install
    ```
5. Configura MongoDB:
    - Asegúrate de que MongoDB esté instalado y en funcionamiento.
    - Crea una base de datos llamada `wireless-pro`.

## Configuración

1. Backend:
    - Crea un archivo `.env` en el directorio `api` con el siguiente contenido:
    ```plaintext
    MONGODB_URI=mongodb://localhost:27017/wireless-pro
    PORT=3000
    ```
2. Frontend:
    - Actualiza el endpoint de la API en `src/environments/environment.ts`:
    ```typescript
    export const environment = {
      production: false,
      apiUrl: 'http://localhost:3000/api'
    };
    ```

## Uso

1. Inicia el servidor del backend:
    ```bash
    cd api
    npm start
    ```
2. Inicia el servidor de desarrollo del frontend:
    ```bash
    cd ..
    npm start 
    ```
3. Abre tu navegador y navega a `http://localhost:4200`.

## Contribuciones

¡Las contribuciones son bienvenidas! Por favor, lee nuestro [CONTRIBUTING.md](CONTRIBUTING.md) para obtener pautas sobre cómo contribuir a este proyecto.

## Licencia

Este proyecto está licenciado bajo la Licencia Pública General de GNU Versión 3 - consulta el archivo [LICENSE](LICENSE) para más detalles.
