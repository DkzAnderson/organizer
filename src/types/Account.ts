interface AccountProps {
    id?: string;
    name: string;
    amount: number;
    type: 'saving' | 'payment' | 'others' 
}

export class Account {
    id? : string;
    name: string;
    amount: number;
    type: 'saving' | 'payment' | 'others' 

    
    constructor({
        id, name,
        amount,
        type
    }: AccountProps){
        this.name = name
        this.id = id ? id : undefined
        this.amount = amount
        this.type = type
    }

    show(){
        console.log(this);
    }
}