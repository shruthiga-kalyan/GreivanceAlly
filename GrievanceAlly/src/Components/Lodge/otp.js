const accountSid = "ACd3a2044ed0d4ec075707f0fb6bbb822c";
const authToken = "de27e765c82fe54ea95a08ca01e99709";
const verifySid = "VA3c20c79d4dd0328c9b190aaaf91a7c63"; 
const client = require("twilio")(accountSid, authToken);
const aadharData = require("../../aadhar.json"); 

function sendOTP(phone) {
  return client.verify.v2.services(verifySid)
    .verifications.create({ to: phone, channel: "sms" });
}

function verifyOTP(phone, otpCode) {
  return client.verify.v2.services(verifySid)
    .verificationChecks.create({ to: phone, code: otpCode });
}

function sendAndVerifyOTP(aadharId) {
const user = aadharData.aadhar.find((entry) => entry.number === aadharId);

  if (!user) {
    console.log("User not found with the given Aadhar ID.");
    return 0;
  }

  const { phone } = user;

  sendOTP(phone)
    .then((verification) => {
      console.log(`OTP sent to ${phone}. Verification status: ${verification.status}`);
      
      // Prompt the user to enter the OTP
      const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      readline.question("Please enter the OTP:", (otpCode) => {
        verifyOTP(phone, otpCode)
          .then((verification_check) => {
            console.log(`Verification check status: ${verification_check.status}`);
            readline.close();
          })
          .catch((error) => {
            console.error("Error verifying OTP:", error);
            readline.close();
          });
      });
    })
    .catch((error) => {
      console.error("Error sending OTP:", error);
    });
}

module.exports = {
    sendOTP,
};