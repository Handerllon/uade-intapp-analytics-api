import { Strategy } from "../Strategy";
import { DeepRacerPaymentOkSchema, NewPaymentDeliverarSchema, PaymentAckSchema, PaymentOkSchema, UserDepositSchema } from "../Schemas/CoreBancarioSchemas";
import { v4 } from 'uuid'
import DatabaseService from "../../../services/DatabaseService";
import { CoreBancPaymentAck } from "../../../entity/Core Bancario/PaymentAck.entity";
import { CoreBancUserDeposit } from "../../../entity/Core Bancario/UserDeposit.entity";
import { CoreBancPaymentOk } from "../../../entity/Core Bancario/PaymentOk.entity";
import { CoreBancDeepRacerPaymentOk } from "../../../entity/Core Bancario/DeepRacerPaymentOk.entity";
import { CoreBancNewPaymentDeliverar } from "../../../entity/Core Bancario/NewPaymentDeliverar.entity";

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
                    break
                case "user_deposit":
                    this.userDeposit(data)
                    break
                case "payment_ok":
                    this.paymentOk(data)
                    break
                case "deep_racer_payment_ok":
                    this.deepRacerPaymentOk(data)
                    break
                case "new_payment_deliverar":
                    this.newPaymentDeliverar(data)
                    break
                default:
                    throw new Error()
            }
        }
        catch (err){
            console.log(data)
            throw new Error("Unprocessed core-bancario event, logging...")
        }
    }

    private async paymentAck(schema: PaymentAckSchema){
        try {
            const item = new CoreBancPaymentAck
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

            const res = await this.service.insert(CoreBancPaymentAck, item)
            console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
        }
        catch (err){
            console.log(schema)
            throw new Error("Error parsing core bancario payment_ack")
        }
    }

    private async userDeposit(schema: UserDepositSchema){
        const item = new CoreBancUserDeposit
        item.createdDate = new Date(schema.created_at)
        
        item.username = schema.data.username
        item.amount = schema.data.amount
        item.currency = schema.data.currency

        const res = await this.service.insert(CoreBancUserDeposit, item)
        console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
    }

    private async paymentOk(schema: PaymentOkSchema){
        const item = new CoreBancPaymentOk
        item.createdDate = new Date(schema.created_at)

        item.dni = schema.data.dni
        item.monto = schema.data.monto
        item.result = schema.data.result

        const res = await this.service.insert(CoreBancPaymentOk, item)
        console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
    }

    private async deepRacerPaymentOk(schema: DeepRacerPaymentOkSchema){
        const item = new CoreBancDeepRacerPaymentOk
        item.createdDate = new Date(schema.created_at)

        item.paymentDate = new Date(schema.data.payment_date)
        item.totalAmount = schema.data.total_amount

        const res = await this.service.insert(CoreBancDeepRacerPaymentOk, item)
        console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
    }

    private async newPaymentDeliverar(schema: NewPaymentDeliverarSchema){
        const item = new CoreBancNewPaymentDeliverar
        item.createdDate = new Date(schema.created_at)

        item.businessName = schema.data.business_name
        item.paymentDate = new Date(schema.data.payment_date)
        item.amount = schema.data.amount

        const res = await this.service.insert(CoreBancNewPaymentDeliverar, item)
        console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
    }
}