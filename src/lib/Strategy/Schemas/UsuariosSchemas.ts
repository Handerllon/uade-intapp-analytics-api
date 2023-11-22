export interface NewUserCreateSchema {
    sender: string,
    created_at: string,
    event_name: string,
    data: {
        username: string,
        password: string,
        name: string,
        email: string,
        document: string
    }
}