import { Strategy } from "../Strategy";
import { DeliveryUpdateSchema, DeliverySuccessfulSchema, RobotUpdateSchema, RobotRepairSchema } from "../Schemas/RobotsSchemas";
import { RobotsDeliveryUpdate } from "../../../entity/Robots/DeliveryUpdate.entity";
import { RobotsDeliverySuccessful } from "../../../entity/Robots/DeliverySuccessful.entity";
import { v4 } from 'uuid'
import DatabaseService from "../../../services/DatabaseService";
import { RobotsRobotUpdate } from "../../../entity/Robots/RobotStatus.entity";
import { RobotsRobotRepair } from "../../../entity/Robots/RobotRepair.entity";

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
                    break
                case "delivery_successful":
                    this.deliverySuccessful(data)
                    break
                case "robot_update":
                    this.robotUpdate(data)
                    break
                case "robot_repair":
                    this.robotRepair(data)
                    break
                default:
                    throw new Error()
                    
            }
        }
        catch (err){
            console.log(data)
            throw new Error("Unprocessed robots event, logging...")
        }
    }

    private async deliveryUpdate(schema: DeliveryUpdateSchema){
        const item = new RobotsDeliveryUpdate
        item.createdDate = new Date(schema.created_at)

        item.purchaseId = schema.data.purchase_id
        item.status = schema.data.status

        const res = await this.service.insert(RobotsDeliveryUpdate, item)
        console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
    }

    private async deliverySuccessful(schema: DeliverySuccessfulSchema){
        const item = new RobotsDeliverySuccessful
        item.createdDate = new Date(schema.created_at)

        item.purchaseId = schema.data.purchase_id
        item.status = schema.data.status
        item.deliveryDate = new Date(schema.data.deliveryDate)
        item.requestDate = new Date(schema.data.requestDate)

        const res = await this.service.insert(RobotsDeliverySuccessful, item)
        console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
    }

    private async robotUpdate(schema: RobotUpdateSchema){
        const item = new RobotsRobotUpdate
        item.createdDate = new Date(schema.created_at)

        item.id = schema.data.id
        item.x = schema.data.x
        item.y = schema.data.y
        item.name = schema.data.name
        item.velocity = schema.data.velocity
        item.battery = schema.data.battery
        item.robotStatus = schema.data.robotStatus
        item.deliveryId = schema.data.deliveryId

        const res = await this.service.insert(RobotsRobotUpdate, item)

        console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
        return
    }

    private async robotRepair(schema: RobotRepairSchema){
        const item = new RobotsRobotRepair
        item.createdDate = new Date(schema.created_at)

        item.robotId = schema.data.robot.id
        item.robotX = schema.data.robot.x
        item.robotY = schema.data.robot.y
        item.robotName = schema.data.robot.name
        item.robotVelocity = schema.data.robot.velocity
        item.robotBattery = schema.data.robot.battery
        item.robotStatus = schema.data.robot.robotStatus
        item.robotDeliveryId = schema.data.robot.deliveryId
        item.user = schema.data.user
        item.previousRobotStatus = schema.data.previousRobotStatus

        const res = await this.service.insert(RobotsRobotRepair, item)
        console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
    }
}