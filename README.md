# rd4-server

Software para gestión de redes Wifi.

---

### Agregar un campo en mongodb a todo los documentos.

```
db.collection.update( {}, {$set: {"is_active":true} }, {multi: true} )
```
