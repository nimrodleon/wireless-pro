# rd4-server

Software para gestión de redes Wifi.

---

### Agregar un campo en mongodb a todo los documentos.

```
db.collection.update( {}, {$set: {"is_active":true} }, {multi: true} )
```

### Migración de documentos v1 MongoDB.

```
db.users.update( {}, {$set: {"isDeleted":false} }, {multi: true} )
db.averias.update( {}, {$set: {"isDeleted":false} }, {multi: true} )
db.clients.update( {}, {$set: {"isDeleted":false} }, {multi: true} )
db.coverages.update( {}, {$set: {"isDeleted":false} }, {multi: true} )
db.devices.update( {}, {$set: {"isDeleted":false} }, {multi: true} )
db.materials.update( {}, {$set: {"isDeleted":false} }, {multi: true} )
db.outages.update( {}, {$set: {"isDeleted":false} }, {multi: true} )
db.payments.update( {}, {$set: {"isDeleted":false} }, {multi: true} )
db.services.update( {}, {$set: {"isDeleted":false} }, {multi: true} )
db.serviceplans.update( {}, {$set: {"isDeleted":false} }, {multi: true} )
db.tasks.update( {}, {$set: {"isDeleted":false} }, {multi: true} )
db.taskmaterials.update( {}, {$set: {"isDeleted":false} }, {multi: true} )
db.towers.update( {}, {$set: {"isDeleted":false} }, {multi: true} )
db.tramos.update( {}, {$set: {"isDeleted":false} }, {multi: true} )
```
