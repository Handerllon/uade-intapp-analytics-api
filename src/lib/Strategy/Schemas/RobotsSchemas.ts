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

export interface RobotRepairSchema {
    sender: string,
    created_at: string,
    event_name: string,
    data: {
        robot: {
            id: string,
            x: string,
            y: string,
            name: string,
            velocity: string,
            battery: string,
            robotStatus: string,
            deliveryId: string,
        }
        user: string,
        previousRobotStatus: string
    }
}