import { Strategy } from "../Strategy";
import { BillGenerationSchema, EmployeePaymentSchema } from "../Schemas/CoreContableSchemas";
import { BillGeneration } from "../../../entity/Core Contable/BillGeneration.entity";
import { v4 } from 'uuid'
import DatabaseService from "../../../services/DatabaseService";
import { CoreContableEmployeePayment } from "../../../entity/Core Contable/CoreContableEmployeePayment.entity";

export class CoreContableStrategy implements Strategy{

    private service: DatabaseService

    constructor(){
        this.service = new DatabaseService()
    }

    public processLog(data: any){
        try{
            switch(data["event_name"]){
                case "bill_generation":
                    this.billGeneration(data)
                case "employee_payment":
                    this.employeePayment(data)
                default:
                    throw new Error()
            }
        }
        catch (err) {
            throw new Error("Unprocessed core-contable event, logging...")
        }
    }

    private async billGeneration(schema: BillGenerationSchema){
        const item = new BillGeneration
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
        item.billURL = schema.data.bill_url

        const res = await this.service.insert(BillGeneration, item)
        console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
    }

    private async employeePayment(schema: EmployeePaymentSchema){
        const item = new CoreContableEmployeePayment
        item.createdDate = new Date(schema.created_at)

        item.salary = schema.data.salary
        item.document = schema.data.idEmpleado

        const res = await this.service.insert(CoreContableEmployeePayment, item)
        console.log(`Successfully inserted ${schema.event_name} event from ${schema.sender}`)
    }
}