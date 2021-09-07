# Changelog

Todos los cambios notables de este proyecto se documentarán en este archivo.

## [2.0.0] - 2021-09-07

- Migración de documentos v1 MongoDB.

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

// actualización de usuarios.
db.users.updateMany({"name": {$exists: true}}, {$rename: {"name":"fullName"}})
db.users.update({}, {$set: {roles:"ROLE_USER"} }, {multi: true})
db.users.updateOne({userName:"admin"},{$set:{"roles": "ROLE_ADMIN"}})

// actualización de servicios.
db.services.updateMany({"client": {$exists: true}}, {$rename: {"client":"clientId"}})
db.services.updateMany({"servicePlan": {$exists: true}}, {$rename: {"servicePlan":"servicePlanId"}})
db.services.updateMany({"dateFrom": {$exists: true}}, {$rename: {"dateFrom":"initialDate"}})
db.services.updateMany({"note": {$exists: true}}, {$rename: {"note":"basicNote"}})
db.services.updateMany({"payment": {$exists: true}}, {$rename: {"payment":"lastPayment"}})

// actualización de pagos.
db.payments.updateMany({"client": {$exists: true}}, {$rename: {"client":"clientId"}})
db.payments.updateMany({"service": {$exists: true}}, {$rename: {"service":"serviceId"}})
db.payments.updateMany({"payment_method": {$exists: true}}, {$rename: {"payment_method":"paymentMethod"}})
db.payments.updateMany({"created_date": {$exists: true}}, {$rename: {"created_date":"createdAt"}})
```

- Los scripts de migración se cargan desde el
  repositorio [https://gitlab.com/nleonc14/rd4-migration](https://gitlab.com/nleonc14/rd4-migration).
- Migración de pagos para el reporte de caja diaria.

```
db.payments.updateMany({paymentMethod: {$eq: "C"}}, {$set: {paymentMethod: "CAJA"}})
db.payments.updateMany({paymentMethod: {$ne: "CAJA"}}, {$set: {paymentMethod: "BANCO"}})
```
