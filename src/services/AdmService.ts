// services/DynamoDBService.ts
import { USER_ADM_TABLE } from '../Constants';
import { v4 } from 'uuid'
import { Repository, DataSource } from 'typeorm';
import { AdmUserAuth } from '../entity/Admin. Personal/AdmUserAuth.entity';
import { AdmUserCreate } from '../entity/Admin. Personal/AdmUserCreate.entity';
import { MariaDbDataSource } from '../DataSource';

export default class AdmService {

    private repository_auth: Repository<AdmUserAuth>
    private repository_create: Repository<AdmUserCreate>


    constructor(){
        // Agregamos esto ya que se generan errores si no
        // Solo funciona asi, no se por que, cuando viene la region por
        // variable de entorno tira errores
        const ds: DataSource = MariaDbDataSource
        this.repository_auth = ds.manager.getRepository(AdmUserAuth);
        this.repository_create = ds.manager.getRepository(AdmUserCreate);

    }

    async createUserAuthEvent(data: {username: string, organization: string}): Promise<any>{
        
        const item = new AdmUserAuth
        item.createdDate = new Date()
        item.eventName = "userAuthentication"

        item.username = data.username
        item.organization = data.organization

        const res = await this.repository_auth.save(item)
        return res;
    }

    async createUserCreationEvent(data: {username: string, organization: string}): Promise<any>{
        
        const item = new AdmUserCreate
        item.createdDate = new Date()
        item.eventName = "userCreation"

        item.username = data.username
        item.organization = data.organization

        const res = await this.repository_create.save(item)
        return res;
    }
}