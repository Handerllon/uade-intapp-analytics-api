import { Strategy } from "../Strategy";
import { v4 } from 'uuid'
import DatabaseService from "../../../services/DatabaseService";

export class AdminPersonalStrategy implements Strategy{

    private service: DatabaseService

    constructor(){
        this.service = new DatabaseService()
    }

    public processLog(data: any) {
        console.log(data)
    }
}