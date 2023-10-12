# uade-intapp-analytics-api

# Esquema de datos propuesto

DynamoDB funciona a partir de la creación de tablas individuales por lo que tendremos
tablas para, por lo menos, cada uno de los servicios que tiene el sistema

**Para todos**
- partition_key: eventid

## Robots

### Delivery
- eventId
- eventName
- robotName
- neighbourhoodLot
- itemName