export interface Client {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    balance: number;
    created_at?: Date;
}
