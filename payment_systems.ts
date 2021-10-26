import readlineSync = require('readline-sync');

export class PaymentSystemExecutor {
    private infoGetter: () => { [key: string]: string }
    private checkInput: (inputs: { [key: string]: string }) => boolean;

    public constructor(inputs: () => { [key: string]: string }, checkInput: (inputs: { [key: string]: string }) => boolean) {
        this.infoGetter = inputs;
        this.checkInput = checkInput;
    }

    execute() {
        let isGood = this.checkInput(this.infoGetter());

        if (isGood) {
            console.log("Encrypting payment information.");

            console.log("Processing payment.");
        } else {
            console.log("Sorry, invalid payment.");
        }
    }
}

export abstract class PaymentSystem {
    private payExe!: PaymentSystemExecutor;
    abstract infoGetter: () => { [key: string]: string };
    abstract checkPayment: (inputs: { [key: string]: string }) => boolean;

    build(): void {
        this.payExe = new PaymentSystemExecutor(this.infoGetter, this.checkPayment);
    }
    getExe(): PaymentSystemExecutor {
        return this.payExe;
    }
}

export class CCSys extends PaymentSystem {
    infoGetter: () => { [key: string]: string };
    checkPayment: (inputs: { [key: string]: string }) => boolean;
    constructor() {
       super();
        this.infoGetter = this.paymentInfo;
        this.checkPayment = this.doesItWork;
    }
    
    paymentInfo(): { [key: string]: string } {
        let inputs: { [key: string]: string } = {};
        console.log('Enter Credit Card Payment Details.');
        inputs['name'] = readlineSync.question('  Name: ');
        inputs['creditCardNumber'] = readlineSync.question('  Credit Card Number: ');
        inputs['creditCardExpirationDate'] = readlineSync.question('  Credit Card Expiration Date (MM/DD): ');
        return inputs;
    }
    doesItWork(inputs: { [key: string]: string }): boolean {
        return /^[\w.' ]+$/.test(inputs.name) && /\d{15,16}/.test(inputs.creditCardNumber) && /\d\d\/\d\d/.test(inputs.creditCardExpirationDate);
    }
}

export class BankPayment extends PaymentSystem {
    infoGetter: () => { [key: string]: string };
    checkPayment: (inputs: { [key: string]: string }) => boolean;

    constructor() {
        super();
        this.infoGetter = this.paymentInfo;
        this.checkPayment = this.doesItWork;
    }

    paymentInfo(): { [key: string]: string; } {
        let inputs: { [key: string]: string } = {};
        console.log('Enter Bank Account Details.');
        inputs['name'] = readlineSync.question('  Name: ');
        inputs['bankRoutingNumber'] = readlineSync.question('  Bank Routing Number: ');
        inputs['bankAccountNumber'] = readlineSync.question('  Bank Account Number: ');
        return inputs;
    }

    doesItWork(inputs: { [key: string]: string }): boolean {
        return /^[\w.' ]+$/.test(inputs.name) && /\d{15,16}/.test(inputs.creditCardNumber) && /\d\d\/\d\d/.test(inputs.creditCardExpirationDate);
    }
}

export class OnlinePayment extends PaymentSystem {
    infoGetter: () => { [key: string]: string };
    checkPayment: (inputs: { [key: string]: string }) => boolean;

    constructor() {
        super();
        this.infoGetter = this.paymentInfo;
        this.checkPayment = this.doesItWork;
    }

    paymentInfo(): { [key: string]: string; } {
        let inputs: { [key: string]: string } = {};
        console.log('Enter Online Payment Details.');
        inputs['email'] = readlineSync.question('  Enter Your Email Address: ');
        inputs['paymentPassword'] = readlineSync.question('  Enter Your Payment Password: ');
        return inputs;
    }

    doesItWork(inputs: { [key: string]: string }): boolean {
        return /^[\w.' ]+$/.test(inputs.name) && /\d{15,16}/.test(inputs.creditCardNumber) && /\d\d\/\d\d/.test(inputs.creditCardExpirationDate);
    }
}

export class PayOnDelivery extends PaymentSystem {
    infoGetter: () => { [key: string]: string };
    checkPayment: (inputs: { [key: string]: string }) => boolean;

    constructor() {
        super();
        this.infoGetter = this.paymentInfo;
        this.checkPayment = this.doesItWork;
    }

    paymentInfo(): { [key: string]: string; } {
        let inputs: { [key: string]: string } = {};
        console.log('Enter Offline Payment Details.');
        inputs['name'] = readlineSync.question('  Name: ');
        inputs['billingAddress'] = readlineSync.question('  Enter Your Billing Address: ');
        return inputs;
    }

    doesItWork(inputs: { [key: string]: string }): boolean {
        return /^[\w.' ]+$/.test(inputs.name) && /\d{15,16}/.test(inputs.creditCardNumber) && /\d\d\/\d\d/.test(inputs.creditCardExpirationDate);
    }
}

