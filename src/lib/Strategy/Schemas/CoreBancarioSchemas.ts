export interface PaymentAckSchema {
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
        purchase_id: number,
        payment_method: string
    }
}

export interface UserDepositSchema {
    sender: string,
    created_at: string,
    event_name: string,
    data: {
        username: string,
        amount: string,
        currency: string
    }
}

export interface PaymentOkSchema {
    sender: string,
    created_at: string,
    event_name: string,
    data: {
        dni: string,
        monto: string,
        result: string
    }
}

export interface DeepRacerPaymentOkSchema {
    sender: string,
    created_at: string,
    event_name: string,
    data: {
        payment_date: string,
        total_amount: string
    }
}

export interface NewPaymentDeliverarSchema {
    sender: string,
    created_at: string,
    event_name: string,
    data: {
        business_name: string,
        payment_date: string,
        amount: string
    }
}