export interface NewPurchaseSchema {
    sender: string,
    created_at: string,
    event_name: string,
    data: {
        product_name: string,
        product_price: number,
        product_amount: number,
        product_marketplace: string,
        product_marketplace_cuit: string,
        delivery_lot: string,
        user_info: {
             name: string,
        	 email: string,
        	 document: string
        }
        purchase_id: string
    }

}