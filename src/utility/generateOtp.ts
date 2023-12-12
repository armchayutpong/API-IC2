import "dotenv/config"

const getOtp =  (otpDigit:number) => {
    const digit:number = otpDigit; 
    const num:string = '0123456789';

    let otp:string = '';
    
    for (let i = 0; i < digit; i++ ) {
        otp += num[Math.floor(Math.random() * 10)];
    }
    return otp;
}

const getRef = (refDigit:number) => {
    const digit:number = refDigit;
    const test:string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let ref:string = '';
    
    var len:number = test.length;
    for (let i = 0; i < digit; i++ ) {
        ref += test[Math.floor(Math.random() * len)];
    }
    return ref;
}

const generateOTP = () => {
    const otpDigit:any = process.env.OTP_DIGIT;
    const refDigit:any = process.env.OTP_REF_DIGIT;

    return {
        "otpCode": getOtp(otpDigit),
        "otpRef": getRef(refDigit)
    }
}

export default generateOTP


