// services/DynamoDBService.ts
import { DynamoDB, config } from 'aws-sdk';
import { RobotDelivery } from '../entity/Robots/RobotDelivery.entity';
import { RobotStatus } from '../entity/Robots/RobotStatus.entity';
import { ROBOT_TABLE } from '../Constants';
import { v4 } from 'uuid'
import { Repository, DataSource } from "typeorm"
import { MariaDbDataSource } from '../DataSource';

export default class RobotService {
    private repository_robot_delivery: Repository<RobotDelivery>
    private repository_robot_status: Repository<RobotStatus>

    constructor(){
        // Agregamos esto ya que se generan errores si no
        // Solo funciona asi, no se por que, cuando viene la region por
        // variable de entorno tira errores
        const ds: DataSource = MariaDbDataSource
        this.repository_robot_delivery = ds.manager.getRepository(RobotDelivery);
        this.repository_robot_status = ds.manager.getRepository(RobotStatus);
    }

    async createRobotDeliveryEvent(data: {robotName: string, neighbourhoodLot: number, itemName: string}): Promise<any>{
        
        const item = new RobotDelivery
        item.createdDate = new Date()
        item.eventName = "delivery"

        item.robotName = data.robotName
        item.neighbourhoodLot = data.neighbourhoodLot
        item.itemName = data.itemName

        const res = await this.repository_robot_delivery.save(item)

        return res;
    }

    async createRobotStatusEvent(data: {robotName: string, robotStatus: string, batteryLeft: number}): Promise<any>{
        
        const item = new RobotStatus
        item.createdDate = new Date()
        item.eventName = "status"

        item.robotName = data.robotName
        item.robotStatus = data.robotStatus
        item.batteryLeft = data.batteryLeft

        const res = await this.repository_robot_status.save(item)
        return res;
    }
}