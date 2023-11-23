import { Strategy } from "../Strategy";
import { LoginUserSchema, NewCompanyCreateSchema, NewUserCreateSchema, UserSupplierCountSchema } from "../Schemas/UsuariosSchemas";
import { v4 } from 'uuid'
import DatabaseService from "../../../services/DatabaseService";
import { UsuariosNewUserCreate } from "../../../entity/Usuarios/UsuariosNewUserCreate.entity";
import { UsuariosLoginUser } from "../../../entity/Usuarios/LoginUser.entity";
import { UsuariosUserSupplierCount } from "../../../entity/Usuarios/UserSupplierCount.entity";
import { UsuariosNewCompanyCreate } from "../../../entity/Usuarios/NewCompanyCreate.entity";

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
                case "user_supplier_count":
                    this.userSupplierCount(data)
                    break
                case "new_company_create":
                    this.newCompanyCreate(data)
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

    private async userSupplierCount(schema: UserSupplierCountSchema){
        const item = new UsuariosUserSupplierCount
        item.createdDate = new Date(schema.created_at)

        item.supplierCount = schema.data.supplierCount
        item.userCount = schema.data.userCount

        const res = await this.service.insert(UsuariosUserSupplierCount, item)
        console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
    }

    private async newCompanyCreate(schema: NewCompanyCreateSchema){
        const item = new UsuariosNewCompanyCreate
        item.createdDate = new Date(schema.created_at)

        item.name = schema.data.name
        item.businessName = schema.data.businessName
        item.cuit = schema.data.cuit
        item.domain = schema.data.domain
        item.address = schema.data.address
        item.phone = schema.data.phone
        item.category = schema.data.category
        item.email = schema.data.email
        item.password = schema.data.password

        const res = await this.service.insert(UsuariosNewCompanyCreate, item)
        console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
    }
}