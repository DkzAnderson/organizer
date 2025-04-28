//pagosPrevistos
interface ExpectedPayments {
    rent      : number,
    food      : number, 
    phone     : number,
    transport : number,
    savings   : number,
    emergency : number,
}
//Presupuesto
export interface BudgetProps {
    expectedIncome: number;
    expectedPayment: ExpectedPayments;
    available: number;
    usable: number
}
//Valores de Tabla
export interface TableValues {
    name: string;
    value: number;
}


export class Budget {
    expectedIncome: number;
    expectedPayment: ExpectedPayments;
    available: number;
    usable: number;

    constructor({
        expectedIncome,
        expectedPayment,
        available,
        usable,
    }: BudgetProps){
        this.expectedIncome  = expectedIncome;
        this.expectedPayment = expectedPayment;
        this.available       = available;
        this.usable          = usable;
    }
}