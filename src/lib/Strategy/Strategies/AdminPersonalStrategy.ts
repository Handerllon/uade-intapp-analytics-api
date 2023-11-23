import { Strategy } from "../Strategy";
import DatabaseService from "../../../services/DatabaseService";
import { EmployeePaymentSchema, NewUserCreateSchema, UserActivitySchema } from "../Schemas/AdminPersonalSchemas";
import { AdmNewUserCreate } from "../../../entity/Admin. Personal/AdmNewUserCreate.entity";
import { AdmUserActivity } from "../../../entity/Admin. Personal/AdmUserActivity.entity";
import { AdmEmployeePayment } from "../../../entity/Admin. Personal/AdmEmployeePayment.entity";

export class AdminPersonalStrategy implements Strategy{

    private service: DatabaseService

    constructor(){
        this.service = new DatabaseService()
    }

    public processLog(data: any) {
        try {
            switch(data["event_name"]){
                case "new_user_create":
                    this.newUserCreate(data)
                    break
                case "user_activity":
                    this.userActivity(data)
                    break
                case "employee_payment":
                    this.employeePayment(data)
                    break
                default:
                    throw new Error()
            }
        }
        catch (err){
            console.log(data)
            throw new Error("Unprocessed admn-personal event, logging...")
        }
    }

    private async newUserCreate(schema: NewUserCreateSchema){
        const item = new AdmNewUserCreate
        item.createdDate = new Date(schema.created_at)

        item.username = schema.data.username
        item.password = schema.data.password
        item.nombre = schema.data.nombre
        item.apellido = schema.data.apellido
        item.email = schema.data.email
        item.document = schema.data.carLicense
        item.grupo = schema.data.grupo

        const res = await this.service.insert(AdmNewUserCreate, item)
        console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
    }

    private async userActivity(schema: UserActivitySchema){
        const item = new AdmUserActivity
        item.createdDate = new Date(schema.created_at)

        item.username = schema.data.username
        item.email = schema.data.email
        item.grupo = schema.data.grupo
        item.evento = schema.data.evento

        const res = await this.service.insert(AdmUserActivity, item)
        console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
    }

    private async employeePayment(schema: EmployeePaymentSchema){
        const item = new AdmEmployeePayment
        item.createdDate = new Date(schema.created_at)

        item.username = schema.data.username
        item.document = schema.data.carLicense

        const res = await this.service.insert(AdmEmployeePayment, item)
        console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
    }
}