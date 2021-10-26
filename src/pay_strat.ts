import * as payment_systems from './payment_systems';   //used for building various payment system objects


export function payStrat(type: string): payment_systems.PaymentSystemExecutor | undefined {
    let paymentMethod: payment_systems.PaymentSystem;
    if (type === "CC") {
        let paymentMethod = new payment_systems.CCSys();
        paymentMethod.build();
        return paymentMethod.getExe();
    }
    if (type === "bankPay") {
        let paymentMethod = new payment_systems.BankPayment();
        paymentMethod.build();
        return paymentMethod.getExe();
    }
    if (type === "online") {
        let paymentMethod = new payment_systems.OnlinePayment();
        paymentMethod.build();
        return paymentMethod.getExe();
    }
    if (type === "onDelivery") {
        let paymentMethod = new payment_systems.PayOnDelivery();
        paymentMethod.build();
        return paymentMethod.getExe();
    } else {
        return undefined;
    }
}