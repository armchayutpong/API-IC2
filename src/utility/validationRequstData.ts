const validationRegister = (key:string, value:any) => {
    let pattern:RegExp;
    switch(key){
        case 'sex':
            pattern = /(M|F|N|O)/;
            if(!pattern.test(value)) return 'sex';
        break;
        case 'birthDate':
            pattern = /^\d{4}-\d{2}-\d{2}$/;
            if(!pattern.test(value)) return 'birthDate';
        break;
        case 'tel':
            pattern = /\d{10}/;
            if(!pattern.test(value)) return 'tel';
        break;
        case 'Consent1':
            if(value != '1' || value != 1) return 'Consent1';
        break;
        case 'otpType':
            pattern = /^(Register|Login)$/;
            if(!pattern.test(value)) return 'otpType';
        case 'otpId':
            if(!value) return 'otpId';
        case 'otpCode':
            pattern = /\d{4}/;
            if(!pattern.test(value)) return 'otpCode';
        break;
    }
}
const validationOTP = (key:string, value:any) => {
    let pattern:RegExp;
    switch(key){
        case 'tel':
            pattern = /\d{10}/;
            if(!pattern.test(value)) return 'tel';
        break;
        case 'otp':
            pattern = /\d{4}/;
            if(!pattern.test(value)) return 'otp';
        break;
        case 'otpType':
            pattern = /^(Register|Login)$/;
            if(!pattern.test(value)) return 'otpType';
        break;
    }
}
const validationTel = (key:string, value:any) => {
    let pattern:RegExp;
    switch(key){
        case 'tel':
            pattern = /\d{10}/;
            if(!pattern.test(value)) return 'tel';
        break;
    }
}

export { 
    validationRegister,
    validationOTP,
    validationTel
}