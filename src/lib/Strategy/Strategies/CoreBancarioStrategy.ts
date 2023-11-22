import { Strategy } from "../Strategy";
import { DeepRacerPaymentOkSchema, PaymentAckSchema, PaymentOkSchema, UserDepositSchema } from "../Schemas/CoreBancarioSchemas";
import { v4 } from 'uuid'
import DatabaseService from "../../../services/DatabaseService";
import { PaymentAck } from "../../../entity/Core Bancario/PaymentAck.entity";
import { UserDeposit } from "../../../entity/Core Bancario/UserDeposit.entity";
import { PaymentOk } from "../../../entity/Core Bancario/PaymentOk.entity";
import { DeepRacerPaymentOk } from "../../../entity/Core Bancario/DeepRacerPaymentOk.entity";

export class CoreBancarioStrategy implements Strategy{

    private service: DatabaseService

    constructor(){
        this.service = new DatabaseService()
    }

    public processLog(data: any){
        try {
            switch(data["event_name"]){
                case "payment_ack":
                    this.paymentAck(data)
                case "user_deposit":
                    this.userDeposit(data)
                case "payment_ok":
                    this.paymentOk(data)
                case "deep_racer_payment_ok":
                    this.deepRacerPaymentOk(data)
                default:
                    throw new Error()
            }
        }
        catch (err){
            throw new Error("Unprocessed core-bancario event, logging...")
        }
    }

    private async paymentAck(schema: PaymentAckSchema){
        const item = new PaymentAck
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
        item.paymentMethod = schema.data.payment_method

        const res = await this.service.insert(PaymentAck, item)
        console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
    }

    private async userDeposit(schema: UserDepositSchema){
        const item = new UserDeposit
        item.createdDate = new Date(schema.created_at)
        
        item.username = schema.data.username
        item.amount = schema.data.amount
        item.currency = schema.data.currency

        const res = await this.service.insert(UserDeposit, item)
        console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
    }

    private async paymentOk(schema: PaymentOkSchema){
        const item = new PaymentOk
        item.createdDate = new Date(schema.created_at)

        item.dni = schema.data.dni
        item.monto = schema.data.monto
        item.result = schema.data.result
    }

    private async deepRacerPaymentOk(schema: DeepRacerPaymentOkSchema){
        const item = new DeepRacerPaymentOk
        item.createdDate = new Date(schema.created_at)

        item.paymentDate = new Date(schema.data.payment_date)
        item.totalAmount = schema.data.total_amount
    }
}