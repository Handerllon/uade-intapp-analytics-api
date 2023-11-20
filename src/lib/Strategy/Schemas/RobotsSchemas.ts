export interface DeliveryUpdateSchema {
    sender: string,
    created_at: string,
    event_name: string,
    data: {
        purchase_id: number,
        status: string
    }
}

export interface DeliverySuccessfulSchema {
    sender: string,
    created_at: string,
    event_name: string,
    data: {
        purchase_id: number,
        status: string
    }
}