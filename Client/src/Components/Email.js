import CryptoJS from "crypto-js";
let Decrpyt_email = localStorage.getItem("useremail");
const secretKey = "mySecretKey123";
const bytes = CryptoJS.AES.decrypt(Decrpyt_email, secretKey);
const Add = bytes.toString(CryptoJS.enc.Utf8);
export const userEmail = Add;