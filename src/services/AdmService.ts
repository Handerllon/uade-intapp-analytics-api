// services/DynamoDBService.ts
import { DynamoDB, config } from 'aws-sdk';
import { USER_ADM_TABLE } from '../Constants';
import { v4 } from 'uuid'
import { AdmUserAuth } from '../entity/Admin. Personal/AdmUserAuth.entity';
import { AdmUserCreate } from '../entity/Admin. Personal/AdmUserCreate.entity';

export default class AdmService {
    private client: DynamoDB.DocumentClient

    constructor(){
        // Agregamos esto ya que se generan errores si no
        // Solo funciona asi, no se por que, cuando viene la region por
        // variable de entorno tira errores
        config.update({region: "us-east-1"})
        this.client = new DynamoDB.DocumentClient();
    }

    async createUserAuthEvent(data: {username: string, organization: string}): Promise<any>{
        
        const item = new AdmUserAuth
        item.eventId = v4()
        item.createdDate = new Date().getTime()
        item.eventName = "userAuthentication"

        item.username = data.username
        item.organization = data.organization

        const params = {
            TableName: USER_ADM_TABLE,
            Item: item,
        };

        const res = await this.client.put(params).promise()
        return res;
    }

    async createUserCreationEvent(data: {username: string, organization: string}): Promise<any>{
        
        const item = new AdmUserCreate
        item.eventId = v4()
        item.createdDate = new Date().getTime()
        item.eventName = "userCreation"

        item.username = data.username
        item.organization = data.organization

        const params = {
            TableName: USER_ADM_TABLE,
            Item: item,
        };

        const res = await this.client.put(params).promise()
        return res;
    }
}