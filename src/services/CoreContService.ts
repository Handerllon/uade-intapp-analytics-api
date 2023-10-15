// services/DynamoDBService.ts
import { DynamoDB, config } from 'aws-sdk';
import { CORE_CONTABLE_TABLE } from '../Constants';
import { v4 } from 'uuid'
import { CoreContPurchase } from '../entity/Core Contable/CoreContPurchase.entity';

export default class CoreContService {
    private client: DynamoDB.DocumentClient

    constructor(){
        // Agregamos esto ya que se generan errores si no
        // Solo funciona asi, no se por que, cuando viene la region por
        // variable de entorno tira errores
        config.update({region: "us-east-1"})
        this.client = new DynamoDB.DocumentClient();
    }

    async createPurchaseEvent(data: {transactionId: string, paymentMethod: string, paymentAmount: number}): Promise<any>{
        
        const item = new CoreContPurchase
        item.eventId = v4()
        item.createdDate = new Date().getTime()
        item.eventName = "purchase"

        item.transactionId = data.transactionId
        item.paymentMethod = data.paymentMethod
        item.paymentAmount = data.paymentAmount

        const params = {
            TableName: CORE_CONTABLE_TABLE,
            Item: item,
        };

        const res = await this.client.put(params).promise()
        return res;
    }
}