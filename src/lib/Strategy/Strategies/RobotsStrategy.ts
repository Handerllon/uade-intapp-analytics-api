import { Strategy } from "../Strategy";
import { DeliveryUpdateSchema, DeliverySuccessfulSchema } from "../Schemas/RobotsSchemas";
import { DeliveryUpdate } from "../../../entity/Robots/DeliveryUpdate.entity";
import { DeliverySuccessful } from "../../../entity/Robots/DeliverySuccessful.entity";
import { v4 } from 'uuid'
import DatabaseService from "../../../services/DatabaseService";

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

        const res = await this.service.insert(DeliverySuccessful, item)
        console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
    }
}