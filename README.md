# rd4-server

Software para gestión de redes Wifi.

---

### Agregar un campo en mongodb a todo los documentos.

```
db.collection.update( {}, {$set: {"is_active":true} }, {multi: true} )
```

## Configuración de Recursos Compartidos.

---

### Instalar CIFS-utils.

```
sudo apt install cifs-utils
```

Deberá crear un directorio de montaje antes de poder montar su carpeta compartida de Windows SMB en Linux. Aquí es donde
Linux reflejará el contenido de su carpeta compartida.

Para hacer eso, abra una ventana de terminal y escriba:

Una vez creado, escriba lo siguiente:

```
sudo mount.cifs //Windows/SharedFolder /mnt/share -o user=account
```

Reemplace “Windows” con la dirección IP o el nombre de host de su PC con Windows y “SharedFolder” con el nombre de su
carpeta compartida. Para el nombre de usuario, reemplace “cuenta” con su nombre de usuario de Windows o el correo
electrónico completo de la cuenta de Microsoft.

Se le pedirá que proporcione su contraseña de Windows antes de que se complete el proceso de montaje. Escriba esto y
luego haga clic en Enter. Si usó la información correcta, su carpeta de Windows ahora debería estar montada y accesible
en la carpeta que creó.

### Montar un sistema de ficheros por samba (CIFS) en Linux.

Para montar un sistema de ficheros CIFS de forma permanente deberemos añadir al **/etc/fstab** una línea similar a la
siguiente:

```
//<IpAddress>/smbfolder /media/smbfolder cifs user=<Win10>,password=<******>,noexec,user,rw,nounix,uid=1000,iocharset=utf8 0 0
```

Una vez modificado el **/etc/fstab** podemos habilitar los puntos de montaje con:

```
sudo mount -a
```

## Crear Servicio con SYSTEMD.

---

Para crear un servicio con **SYSTEMD**, Crearemos el siguiente archivo ```/lib/systemd/system/sample.service``` con el
contenido siguiente:

```
[Unit]
Description=<Sample>
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
Restart=always
RestartSec=1
User=<user>
ExecStart=/usr/bin/env python3 /home/<user>/sample/sample.py

[Install]
WantedBy=multi-user.target
```

### Objetivos o Targets.

Los objetivos existentes lo puedes ver con la siguiente orden:

```
systemctl list-units --type target
```

- **Poner en marcha el servicio.**

```
sudo systemctl start sample
```

- **Para detener el servicio.**

```
sudo systemctl stop sample
```

- **Para iniciar el servicio con el sistema.**

```
sudo systemctl enable sample
```
