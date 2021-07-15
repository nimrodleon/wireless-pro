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

// actualización de servicios.
db.services.update({"client": {$exists: true}}, {$rename: {"client":"clientId"}}, false, true);
db.services.update({"servicePlan": {$exists: true}}, {$rename: {"servicePlan":"servicePlanId"}}, false, true);
db.services.update({"dateFrom": {$exists: true}}, {$rename: {"dateFrom":"initialDate"}}, false, true);
db.services.update({"note": {$exists: true}}, {$rename: {"note":"basicNote"}}, false, true);
db.services.update({"payment": {$exists: true}}, {$rename: {"payment":"lastPayment"}}, false, true);

// actualización de pagos.
db.payments.update({"client": {$exists: true}}, {$rename: {"client":"clientId"}}, false, true);
db.payments.update({"service": {$exists: true}}, {$rename: {"service":"serviceId"}}, false, true);
db.payments.update({"payment_method": {$exists: true}}, {$rename: {"payment_method":"paymentMethod"}}, false, true);
db.payments.update({"created_date": {$exists: true}}, {$rename: {"created_date":"createdAt"}}, false, true);
```
