import { Strategy } from "../Strategy";
import { LoginUserSchema, NewUserCreateSchema } from "../Schemas/UsuariosSchemas";
import { v4 } from 'uuid'
import DatabaseService from "../../../services/DatabaseService";
import { UsuariosNewUserCreate } from "../../../entity/Usuarios/UsuariosNewUserCreate.entity";
import { UsuariosLoginUser } from "../../../entity/Usuarios/LoginUser.entity";

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
                    break
                case "login_user":
                    this.loginUser(data)
                    break
                default:
                    throw new Error()   
            }
        }
        catch (err){
            console.log(data)
            throw new Error("Unprocessed usuarios event, logging...")
        }
    }

    private async newUserCreate(schema: NewUserCreateSchema){
        const item = new UsuariosNewUserCreate
        item.createdDate = new Date(schema.created_at)

        item.username = schema.data.username
        item.password = schema.data.password
        item.name = schema.data.name
        item.email = schema.data.email
        item.document = schema.data.document
        item.address = schema.data.address

        const res = await this.service.insert(UsuariosNewUserCreate, item)
        console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
    }

    private async loginUser(schema: LoginUserSchema){
        const item = new UsuariosLoginUser
        item.createdDate = new Date(schema.created_at)

        item.username = schema.data.username
        item.password = schema.data.password
        item.name = schema.data.name
        item.email = schema.data.email
        item.document = schema.data.document
        item.address = schema.data.address

        const res = await this.service.insert(UsuariosLoginUser, item)
        console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
    }
}