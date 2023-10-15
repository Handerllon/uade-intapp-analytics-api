# uade-intapp-analytics-api

# Instalación

Realizar una copia del archivo `.env_example`, llamarla `.env` y configurar las variables presentadas.  

Parados sobre la ruta base, `npm install`. Luego `npm start`. Corre en localhost por ahora. 

# Esquema de datos propuesto

DynamoDB funciona a partir de la creación de tablas individuales por lo que tendremos
tablas para, por lo menos, cada uno de los servicios que tiene el sistema

Todos tendran las siguientes columnas
- eventId (PartitionKey)
- createdDate (SortKey)

## Robots
### Delivery
- eventName (default: "delivery")
- robotName
- neighbourhoodLot
- itemName

### Satus
- eventName (default: "status")
- robotName
- robotStatus
- batteryLeft

## Core Contable
### Purchase
- eventName (default: "purchase")
- transactionId
- paymentMethod
- paymentAmount

## Marketplace
### Product Purchase
- eventName (default: "purchase")
- transactionId
- marketplaceName
- productName

### Marketplace Creation
- eventName (default: "marketplaceCreate)
- marketplaceName

### Product Creation
- eventName (default: "productCreate")
- marketplaceName
- productName
- productCategory

## Admin. de Personal
### User Creation
- eventName ("userCreation")
- username
- organization

### User Authentication
- eventName ("userAuthentication")
- username
- moduleName