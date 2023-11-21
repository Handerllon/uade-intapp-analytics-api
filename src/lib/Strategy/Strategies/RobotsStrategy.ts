import { Strategy } from "../Strategy";
import { DeliveryUpdateSchema, DeliverySuccessfulSchema, RobotUpdateSchema } from "../Schemas/RobotsSchemas";
import { DeliveryUpdate } from "../../../entity/Robots/DeliveryUpdate.entity";
import { DeliverySuccessful } from "../../../entity/Robots/DeliverySuccessful.entity";
import { v4 } from 'uuid'
import DatabaseService from "../../../services/DatabaseService";
import { RobotUpdate } from "../../../entity/Robots/RobotStatus.entity";

export class RobotStrategy implements Strategy{

    private service: DatabaseService

    constructor(){
        this.service = new DatabaseService()
    }

    public processLog(data: any){
        try{
            switch(data["event_name"]){
                case "delivery_update":
                    this.deliveryUpdate(data)
                case "delivery_successful":
                    this.deliverySuccessful(data)
                case "robot_update":
                    this.robotUpdate(data)
                default:
                    throw new Error()
            }
        }
        catch (err){
            throw new Error("Unprocessed robots event, logging...")
        }
    }

    private async deliveryUpdate(schema: DeliveryUpdateSchema){
        const item = new DeliveryUpdate
        item.createdDate = new Date(schema.created_at)

        item.purchaseId = schema.data.purchase_id
        item.status = schema.data.status

        const res = await this.service.insert(DeliveryUpdate, item)
        console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
    }

    private async deliverySuccessful(schema: DeliverySuccessfulSchema){
        const item = new DeliverySuccessful
        item.createdDate = new Date(schema.created_at)

        item.purchaseId = schema.data.purchase_id
        item.status = schema.data.status
        item.deliveryDate = new Date(schema.data.deliveryDate)
        item.requestDate = new Date(schema.data.requestDate)

        const res = await this.service.insert(DeliverySuccessful, item)
        console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
    }

    private async robotUpdate(schema: RobotUpdateSchema){
        const item = new RobotUpdate
        item.createdDate = new Date(schema.created_at)

        item.id = schema.data.id
        item.x = schema.data.x
        item.y = schema.data.y
        item.name = schema.data.name
        item.velocity = schema.data.velocity
        item.battery = schema.data.battery
        item.robotStatus = schema.data.robotStatus
        item.deliveryId = schema.data.deliveryId

        const res = await this.service.insert(RobotUpdate, item)
        console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
    }
}