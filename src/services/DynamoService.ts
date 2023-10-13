// services/DynamoDBService.ts
import { DynamoDB, config } from 'aws-sdk';
import { RobotDelivery } from '../entity/Robots/RobotDelivery.entity';
import { ROBOT_TABLE } from '../Constants';
import { v4 } from 'uuid'
import { RobotStatus } from '../entity/Robots/RobotStatus.entity';

export default class DynamoDBService {
    private client: DynamoDB.DocumentClient

    constructor(){
        // Agregamos esto ya que se generan errores si no
        // Solo funciona asi, no se por que, cuando viene la region por
        // variable de entorno tira errores
        config.update({region: "us-east-1"})
        this.client = new DynamoDB.DocumentClient();
    }

    async createRobotDeliveryEvent(data: {robotName: string, neighbourhoodLot: number, itemName: string}): Promise<any>{
        
        const item = new RobotDelivery
        item.eventId = v4()
        item.createdDate = new Date().getTime()
        item.eventName = "delivery"

        item.robotName = data.robotName
        item.neighbourhoodLot = data.neighbourhoodLot
        item.itemName = data.itemName

        const params = {
            TableName: ROBOT_TABLE,
            Item: item,
        };

        const res = await this.client.put(params).promise()
        return res;
    }

    async createRobotStatusEvent(data: {robotName: string, robotStatus: string, batteryLeft: number}): Promise<any>{
        
        const item = new RobotStatus
        item.eventId = v4()
        item.createdDate = new Date().getTime()
        item.eventName = "status"

        item.robotName = data.robotName
        item.robotStatus = data.robotStatus
        item.batteryLeft = data.batteryLeft

        const params = {
            TableName: ROBOT_TABLE,
            Item: item,
        };

        const res = await this.client.put(params).promise()
        return res;
    }

    async getRobotEventByEventId(id: number) {
        const params = {
        TableName: ROBOT_TABLE,
        Key: { id },
        };

        const result = await this.client.get(params).promise();
        return result.Item;
    }
}