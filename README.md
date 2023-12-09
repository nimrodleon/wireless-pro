# wireless-pro

Software para gestión de redes Wifi.

### Repositorios relacionados con este proyecto.

- [https://github.com/nimrodleon/wireless-pro](https://github.com/nimrodleon/wireless-pro)
- [https://github.com/nimrodleon/MikroTik](https://github.com/nimrodleon/MikroTik)
- [https://github.com/nimrodleon/cortes](https://github.com/nimrodleon/cortes)

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

### Configuración de Recursos Compartidos en Linux

### Paso 1: Instalación de CIFS-utils

Antes de comenzar, asegúrate de tener instalado el paquete `cifs-utils`. Si no lo tienes, ejecuta este comando:

```bash
sudo apt install cifs-utils
```

### Paso 2: Montaje Permanente del Recurso Compartido

1. Abre el archivo `/etc/fstab` con tu editor de texto favorito:

```bash
sudo nano /etc/fstab
```

2. Agrega la siguiente línea al final del archivo, reemplazando `<IpAddress>`, `<smbfolder>`, `<Win10>`, y `<password>` con tus propias configuraciones:

```bash
//<IpAddress>/<smbfolder> /media/<smbfolder> cifs user=<Win10>,password=<password>,noexec,user,rw,nounix,uid=1000,iocharset=utf8 0 0
```

3. Guarda los cambios y cierra el editor.

### Paso 3: Habilitar los Puntos de Montaje

Para aplicar los cambios y montar el recurso compartido, ejecuta:

```bash
sudo mount -a
```

¡Listo! Ahora el recurso compartido estará disponible en el directorio local `/media/<smbfolder>`. Asegúrate de reemplazar los valores `<IpAddress>`, `<smbfolder>`, `<Win10>`, y `<password>` con tus propias configuraciones.
