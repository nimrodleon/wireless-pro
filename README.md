# rd4-server

Software para gestión de redes Wifi.

---

### Agregar un campo en mongodb a todo los documentos.

```
db.collection.update( {}, {$set: {"is_active":true} }, {multi: true} )
```

### Instalar CIFS-utils.
```
sudo apt install cifs-utils
```
Deberá crear un directorio de montaje antes de poder montar su carpeta compartida de Windows SMB en Linux. Aquí es donde Linux reflejará el contenido de su carpeta compartida.

Para hacer eso, abra una ventana de terminal y escriba:

Una vez creado, escriba lo siguiente:
```
sudo mount.cifs //Windows/SharedFolder /mnt/share -o user=account
```
Reemplace “Windows” con la dirección IP o el nombre de host de su PC con Windows y “SharedFolder” con el nombre de su carpeta compartida. Para el nombre de usuario, reemplace “cuenta” con su nombre de usuario de Windows o el correo electrónico completo de la cuenta de Microsoft.

Se le pedirá que proporcione su contraseña de Windows antes de que se complete el proceso de montaje. Escriba esto y luego haga clic en Enter. Si usó la información correcta, su carpeta de Windows ahora debería estar montada y accesible en la carpeta que creó.
