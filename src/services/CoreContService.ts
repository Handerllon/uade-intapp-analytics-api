// services/DynamoDBService.ts
import { DynamoDB, config } from 'aws-sdk';
import { CORE_CONTABLE_TABLE } from '../Constants';
import { Repository, DataSource } from 'typeorm';
import { v4 } from 'uuid'
import { CoreContPurchase } from '../entity/Core Contable/CoreContPurchase.entity';
import { MariaDbDataSource } from '../DataSource';

export default class CoreContService {
    private repository_purchase: Repository<CoreContPurchase>


    constructor(){
        // Agregamos esto ya que se generan errores si no
        // Solo funciona asi, no se por que, cuando viene la region por
        // variable de entorno tira errores
        const ds: DataSource = MariaDbDataSource
        this.repository_purchase = ds.manager.getRepository(CoreContPurchase);
    }

    async createPurchaseEvent(data: {transactionId: string, paymentMethod: string, paymentAmount: number}): Promise<any>{
        
        const item = new CoreContPurchase
        item.eventId = v4()
        item.createdDate = new Date().getTime()
        item.eventName = "purchase"

        item.transactionId = data.transactionId
        item.paymentMethod = data.paymentMethod
        item.paymentAmount = data.paymentAmount

        const res = await this.repository_purchase.save(item)
        return res;
    }
}