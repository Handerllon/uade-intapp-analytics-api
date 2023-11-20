import { Repository, DataSource } from "typeorm"
import { MariaDbDataSource } from "../DataSource"

export default class DatabaseService {

    private ds: DataSource

    constructor(){
        this.ds = MariaDbDataSource
    }

    async insert(object: any, item: any): Promise<any> {

        const repository = this.ds.manager.getRepository(object)
        const res = await repository.save(item)
        return res
    }
}