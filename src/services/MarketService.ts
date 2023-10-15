// services/DynamoDBService.ts
import { DynamoDB, config } from 'aws-sdk';
import { MARKETPLACE_TABLE } from '../Constants';
import { v4 } from 'uuid'
import { MarketProductPurchase } from '../entity/Marketplace/MarketProductPurchase.entity';
import { MarketProductCreate } from '../entity/Marketplace/MarketProductCreation.entity';
import { MarketCreation } from '../entity/Marketplace/MarketCreation.entity';

export default class MarketService {
    private client: DynamoDB.DocumentClient

    constructor(){
        // Agregamos esto ya que se generan errores si no
        // Solo funciona asi, no se por que, cuando viene la region por
        // variable de entorno tira errores
        config.update({region: "us-east-1"})
        this.client = new DynamoDB.DocumentClient();
    }

    async createProductPurchaseEvent(data: {transactionId: string, marketplaceName: string, productName: string}): Promise<any>{
        
        const item = new MarketProductPurchase
        item.eventId = v4()
        item.createdDate = new Date().getTime()
        item.eventName = "purchase"

        item.transactionId = data.transactionId
        item.marketplaceName = data.marketplaceName
        item.productName = data.productName

        const params = {
            TableName: MARKETPLACE_TABLE,
            Item: item,
        };

        const res = await this.client.put(params).promise()
        return res;
    }

    async createProductCreationEvent(data: {productCategory: string, marketplaceName: string, productName: string}): Promise<any>{
        
        const item = new MarketProductCreate
        item.eventId = v4()
        item.createdDate = new Date().getTime()
        item.eventName = "productCreate"

        item.productCategory = data.productCategory
        item.marketplaceName = data.marketplaceName
        item.productName = data.productName

        const params = {
            TableName: MARKETPLACE_TABLE,
            Item: item,
        };

        const res = await this.client.put(params).promise()
        return res;
    }

    async createMarketCreationEvent(data: {marketplaceName: string}): Promise<any>{
        
        const item = new MarketCreation
        item.eventId = v4()
        item.createdDate = new Date().getTime()
        item.eventName = "marketplaceCreate"

        item.marketplaceName = data.marketplaceName

        const params = {
            TableName: MARKETPLACE_TABLE,
            Item: item,
        };

        const res = await this.client.put(params).promise()
        return res;
    }
}