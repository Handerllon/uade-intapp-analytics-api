import { Strategy } from "../Strategy";
import { NewPurchaseSchema } from "../Schemas/MarketplaceSchemas";
import { v4 } from 'uuid'
import DatabaseService from "../../../services/DatabaseService";
import { NewPurchase } from "../../../entity/Marketplace/NewPurchase.entity";

export class MarketplaceStrategy implements Strategy{

    private service: DatabaseService

    constructor(){
        this.service = new DatabaseService()
    }

    public processLog(data: any){
        try{
            switch(data["event_name"]){
                case "new_purchase":
                    this.newPurchase(data)   
                default:
                    throw new Error()   
            }
        }
        catch (err){
            throw new Error("Unprocessed marketplace event, logging...")
        }
    }

    private async newPurchase(schema: NewPurchaseSchema){
        const item = new NewPurchase
        item.createdDate = new Date(schema.created_at)

        item.productName = schema.data.product_name
        item.productPrice = schema.data.product_price
        item.productAmount = schema.data.product_amount
        item.productMarketplace = schema.data.product_marketplace
        item.productMarketplaceCUIT = schema.data.product_marketplace_cuit
        item.deliveryLot = schema.data.delivery_lot

        item.name = schema.data.user_info.name
        item.email = schema.data.user_info.email
        item.document = schema.data.user_info.document

        item.purchaseId = schema.data.purchase_id

        const res = await this.service.insert(NewPurchase, item)
        console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
    }
}