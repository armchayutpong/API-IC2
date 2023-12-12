import "dotenv/config"

const SMS_OTC_ID = process.env.SMS_OTC_ID;

const smsOtpSend = {
    "bulkId": "",
    "messages": [
        {
            "from": "",
            "destinations": [
                {
                    "to": "",
                    "messageId": ""
                }
            ],
            "text": "",
            "shorturl" : "",
            "notifyUrl": "",
            "notifyContentType": "",
            "sendAt": "",
            "callbackData":""
        }
    ]
}
const baseOtpSend = {
    "otcId": SMS_OTC_ID,
    "mobile": "",
    "notifyUrl": "",
    "notifyContentType": "",
    "callbackData": ""
}
const baseOtpResend = {
    "otpId": "",
}
const baseOtpVerify = {
    "otpId": "",
    "otpCode": "",
}

export {
    baseOtpVerify,
    baseOtpResend,
    baseOtpSend,
    smsOtpSend
}