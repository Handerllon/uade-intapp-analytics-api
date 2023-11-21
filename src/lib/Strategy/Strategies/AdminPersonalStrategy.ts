import { Strategy } from "../Strategy";
import DatabaseService from "../../../services/DatabaseService";
import { EmployeePaymentSchema, NewUserCreateSchema, UserActivitySchema } from "../Schemas/AdminPersonalSchemas";
import { NewUserCreate } from "../../../entity/Admin. Personal/NewUserCreate.entity";
import { UserActivity } from "../../../entity/Admin. Personal/UserActivity.entity";
import { EmployeePayment } from "../../../entity/Admin. Personal/EmployeePayment.entity";

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
                case "user_activity":
                    this.userActivity(data)
                case "employee_payment":
                    this.employeePayment(data)
                default:
                    throw new Error()
            }
        }
        catch (err){
            throw new Error("Unprocessed admn-personal event, logging...")
        }
    }

    private async newUserCreate(schema: NewUserCreateSchema){
        const item = new NewUserCreate
        item.createdDate = new Date(schema.created_at)

        item.username = schema.data.username
        item.password = schema.data.password
        item.nombre = schema.data.nombre
        item.apellido = schema.data.apellido
        item.email = schema.data.email
        item.document = schema.data.carLicense
        item.grupo = schema.data.grupo

        const res = await this.service.insert(NewUserCreate, item)
        console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
    }

    private async userActivity(schema: UserActivitySchema){
        const item = new UserActivity
        item.createdDate = new Date(schema.created_at)

        item.username = schema.data.username
        item.email = schema.data.email
        item.grupo = schema.data.grupo
        item.evento = schema.data.evento

        const res = await this.service.insert(UserActivity, item)
        console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
    }

    private async employeePayment(schema: EmployeePaymentSchema){
        const item = new EmployeePayment
        item.createdDate = new Date(schema.created_at)

        item.username = schema.data.username
        item.document = schema.data.carLicense

        const res = await this.service.insert(EmployeePayment, item)
        console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
    }
}