# uade-intapp-analytics-api

# Esquema de datos propuesto

DynamoDB funciona a partir de la creación de tablas individuales por lo que tendremos
tablas para, por lo menos, cada uno de los servicios que tiene el sistema

## Robots

### Delivery
- eventId (PartitionKey)
- createdDate (SortKey)
- eventName (default: "delivery")
- robotName
- neighbourhoodLot
- itemName

### Satus
- eventId (PartitionKey)
- createdDate (SortKey)
- eventName (default: "status")
- robotName
- robotStatus
- batteryLeft