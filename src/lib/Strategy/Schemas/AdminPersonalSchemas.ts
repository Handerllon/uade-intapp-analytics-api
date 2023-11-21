export interface NewUserCreateSchema {
    sender: string,
    created_at: string,
    event_name: string,
    data: {
        username: string,
        password: string,
        nombre: string,
        apellido: string,
        email: string,
        carLicense: string,
        grupo: string
    }
}

export interface UserActivitySchema {
    sender: string,
    created_at: string,
    event_name: string,
    data: {
        username: string,
        email: string,
        grupo: string,
        evento: string
    }
}

export interface EmployeePaymentSchema {
    sender: string,
    created_at: string,
    event_name: string,
    data: {
        username: string,
        carLicense: string,
    }
}