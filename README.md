# wireless-pro

Software para gestión de redes Wifi.

### Repositorios relacionados con este proyecto.

- [https://github.com/nimrodleon/wireless-pro](https://github.com/nimrodleon/wireless-pro)
- [https://github.com/nimrodleon/MikroTik](https://github.com/nimrodleon/MikroTik)
- [https://github.com/nimrodleon/cortes](https://github.com/nimrodleon/cortes)

### Compilación del Backend.

Para compilar este proyecto, asegúrate de tener el paquete pkg instalado en tu sistema. Puedes instalarlo ejecutando el siguiente comando:

```shell
npm install -g pkg
```

Una vez que el paquete pkg esté instalado, puedes construir el ejecutable utilizando el siguiente comando:

```shell
npm run build
```

Este comando se encargará de compilar el proyecto y generar el ejecutable correspondiente. Asegúrate de que todas las dependencias estén instaladas correctamente antes de ejecutar el proceso de compilación.

### Crear Servicio con SYSTEMD.

Para implementar un servicio utilizando **SYSTEMD**, sigue estos pasos:

1. **Crea un archivo llamado `/lib/systemd/system/wireless-pro.service` y copia el contenido del archivo `scripts/wireless-pro` en él.**

    ```bash
    sudo nano /lib/systemd/system/wireless-pro.service
    ```

2. **Poner en marcha el servicio:**

    ```bash
    sudo systemctl start wireless-pro.service
    ```

3. **Detener el servicio:**

    ```bash
    sudo systemctl stop wireless-pro.service
    ```

4. **Iniciar el servicio con el sistema:**

    ```bash
    sudo systemctl enable wireless-pro.service
    ```

Estos comandos te permitirán gestionar el servicio de manera sencilla. Asegúrate de ajustar las rutas y nombres de archivos según tu estructura de directorios y necesidades específicas.
