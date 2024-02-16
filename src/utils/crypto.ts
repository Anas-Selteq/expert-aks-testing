import CryptoJS from 'crypto-js';
  
  export const EncryptObject = (text:string): string|null => {
    try {
        // Convert JSON string to UTF-8 bytes
        const jsonBytes = CryptoJS.enc.Utf8.parse(text);

        // Decode Base64 key and IV
    const key = CryptoJS.enc.Base64.parse(process.env.NEXT_PUBLIC_SECRET_KEY_BASE64??"");
    const iv = CryptoJS.enc.Base64.parse(process.env.NEXT_PUBLIC_IV_KEY_BASE64??"");

        //Create AES cipher
        const cipher = CryptoJS.AES.encrypt(jsonBytes,key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        //convert encrypted data to base64 string
        return cipher.toString();
      } catch (error) {
        console.error("Encryption Error:", error);
        throw error;
      }
  }
  
//   export const DecryptObject = (ciphertext:any) => {
//     try {
//         const secret = base64ToWordArray(process.env.NEXT_PUBLIC_SECRET_KEY_BASE64);
//         const ivHex = "yourHexIVHere"; // Replace with your actual hexadecimal IV
//         const ivBase64 = hexToBase64(ivHex);
//         const iv = base64ToWordArray(ivBase64);
    
//         console.log("Secret Key:", process.env.NEXT_PUBLIC_SECRET_KEY_BASE64);
//         console.log("IV in Base64:", ivBase64);
    
//         const decryptedObject = CryptoJS.AES.decrypt(ciphertext, secret, { iv, padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8);
//         return decryptedObject;
//       } catch (error) {
//         console.error("Decryption Error:", error);
//         throw error;
//       }
//   }