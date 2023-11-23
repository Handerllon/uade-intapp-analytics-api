export interface NewUserCreateSchema {
    sender: string,
    created_at: string,
    event_name: string,
    data: {
        username: string,
        password: string,
        name: string,
        email: string,
        document: string,
        address: string,
    }
}

export interface LoginUserSchema {
    sender: string,
    created_at: string,
    event_name: string,
    data: {
        username: string,
        password: string,
        name: string,
        email: string,
        document: string,
        address: string,
    }
}

export interface UserSupplierCountSchema {
    sender: string,
    created_at: string,
    event_name: string,
    data: {
        userCount: string,
        supplierCount: string
    }
}