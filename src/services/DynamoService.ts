// services/DynamoDBService.ts
import { DynamoDB, config } from 'aws-sdk';
import { RobotDelivery } from '../entity/Robots/RobotDelivery.entity';
import { ROBOT_TABLE } from '../constants';
import { v4 } from 'uuid'

export default class DynamoDBService {
  private client: DynamoDB.DocumentClient

  constructor(){
    // Agregamos esto ya que se generan errores si no
    //config.update({region: (process.env.AWS_DEFAULT_REGION as string)})

    // Solo funciona asi, no se por que
    config.update({region: "us-east-1"})
    this.client = new DynamoDB.DocumentClient();
}

  async createRobotDeliveryEvent(data: {eventName: string, robotName: string, neighbourhoodLot: number, itemName: string}): Promise<any>{
    
    const item = new RobotDelivery
    item.eventid = v4()
    item.eventName = data.eventName
    item.robotName = data.robotName
    item.neighbourhoodLot = data.neighbourhoodLot
    item.itemName = data.itemName
    item.createdDate = new Date().getTime()

    const params = {
      TableName: ROBOT_TABLE,
      Item: item,
    };

    console.log(item)

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