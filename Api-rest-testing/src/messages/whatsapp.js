import twilio from "twilio";

const accountId = "AC33b9e447deb3e4d6a71f5d3e6125612f"
const tokenTwilio = "40365b7faba66090d31c1ad74f202814"

const twilioWhatsappPhone = "whatsapp:+14155238886"
const adminWhatsappPhone = "whatsapp:+adminnumero"

const twilioClient = twilio(accountId, tokenTwilio)

export { twilioClient, twilioWhatsappPhone, adminWhatsappPhone }