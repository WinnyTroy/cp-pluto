const CryptoJS = require("crypto-js");

exports.encrypt = (jsonData, cipherKey) => {
    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(jsonData), cipherKey).toString();
    return ciphertext
}

exports.decrypt = (ciphertext, cipherKey) => {
    let bytes = CryptoJS.AES.decrypt(ciphertext, cipherKey);

    console.info(JSON.stringify(bytes))

    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

    return decryptedData
}