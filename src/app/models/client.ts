export interface Client {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    balance: number;
    created_at?: Date;
    updated_at?: Date;
    user_id?: string;
}
