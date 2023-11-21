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
        status: string,
        deliveryDate: string,
        requestDate: string
    }
}

export interface RobotUpdateSchema {
    sender: string,
    created_at: string,
    event_name: string,
    data: {
        id: string,
        x: string,
        y: string,
        name: string,
        velocity: string,
        battery: string,
        robotStatus: string,
        deliveryId: string,
    }
}