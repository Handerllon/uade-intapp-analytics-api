import { Strategy } from "../Strategy";
import { NewUserCreateSchema } from "../Schemas/UsuariosSchemas";
import { v4 } from 'uuid'
import DatabaseService from "../../../services/DatabaseService";
import { NewUserCreate } from "../../../entity/Usuarios/NewUserCreate.entity";

export class UsuariosStrategy implements Strategy{

    private service: DatabaseService

    constructor(){
        this.service = new DatabaseService()
    }

    public processLog(data: any){
        try{
            switch(data["event_name"]){
                case "new_user_create":
                    this.newUserCreate(data)
                default:
                    throw new Error()   
            }
        }
        catch (err){
            throw new Error("Unprocessed usuarios event, logging...")
        }
    }

    private async newUserCreate(schema: NewUserCreateSchema){
        console.log("method arrived")
        const item = new NewUserCreate
        item.createdDate = new Date(schema.created_at)

        item.username = schema.data.username
        item.password = schema.data.password
        item.name = schema.data.name
        item.email = schema.data.email
        item.document = schema.data.document

        const res = await this.service.insert(NewUserCreate, item)
        console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
    }
}