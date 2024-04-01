export type Expense = {
    Id : number|null, //👈️ required
    Image: string|null,
    GeneralName: string|null,
    Quantity: number|null, //👈️ required or default 1
    Together : string|null,
    Name : string, //👈️ required
    Place : string, //👈️ required
    Price : number|null, //👈️ required
    Weight : number|null,
    PaymentDetails : string, //👈️ required
    Type : string, //👈️ required
    Date : string, //👈️ required
    Week : string, //👈️ required
}