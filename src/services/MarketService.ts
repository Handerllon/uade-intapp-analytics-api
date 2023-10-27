// services/DynamoDBService.ts
import { DynamoDB, config } from 'aws-sdk';
import { MARKETPLACE_TABLE } from '../Constants';
import { Repository, DataSource } from "typeorm"
import { v4 } from 'uuid'
import { MarketProductPurchase } from '../entity/Marketplace/MarketProductPurchase.entity';
import { MarketProductCreate } from '../entity/Marketplace/MarketProductCreation.entity';
import { MarketCreation } from '../entity/Marketplace/MarketCreation.entity';
import { MariaDbDataSource } from '../DataSource';

export default class MarketService {
    private repository_product_purchase: Repository<MarketProductPurchase>
    private repository_product_create: Repository<MarketProductCreate>
    private repository_market_create: Repository<MarketCreation>

    constructor(){
        // Agregamos esto ya que se generan errores si no
        // Solo funciona asi, no se por que, cuando viene la region por
        // variable de entorno tira errores
        const ds: DataSource = MariaDbDataSource
        this.repository_product_purchase = ds.manager.getRepository(MarketProductPurchase);
        this.repository_product_create = ds.manager.getRepository(MarketProductCreate);
        this.repository_market_create = ds.manager.getRepository(MarketCreation);
    }

    async createProductPurchaseEvent(data: {transactionId: string, marketplaceName: string, productName: string}): Promise<any>{
        
        const item = new MarketProductPurchase
        item.createdDate = new Date()
        item.eventName = "purchase"

        item.transactionId = data.transactionId
        item.marketplaceName = data.marketplaceName
        item.productName = data.productName

        const res = await this.repository_product_purchase.save(item)
        return res;
    }

    async createProductCreationEvent(data: {productCategory: string, marketplaceName: string, productName: string}): Promise<any>{
        
        const item = new MarketProductCreate
        item.createdDate = new Date()
        item.eventName = "productCreate"

        item.productCategory = data.productCategory
        item.marketplaceName = data.marketplaceName
        item.productName = data.productName

        const res = await this.repository_product_create.save(item)
        return res;
    }

    async createMarketCreationEvent(data: {marketplaceName: string}): Promise<any>{
        
        const item = new MarketCreation
        item.createdDate = new Date()
        item.eventName = "marketplaceCreate"

        item.marketplaceName = data.marketplaceName

        const params = {
            TableName: MARKETPLACE_TABLE,
            Item: item,
        };

        const res = await this.repository_market_create.save(item)
        return res;
    }
}