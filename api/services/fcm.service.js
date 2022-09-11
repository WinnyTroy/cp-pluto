require('dotenv').config()
const FCM = require('fcm-node');
const serverKey = process.env.FIREBASE_SERVER_KEY;
const fcm = new FCM(serverKey);
const moment = require('moment')

exports.sendFcmNotification = async (firebaseToken, title, body) => {
    console.log(typeof firebaseToken)
    return new Promise(async (resolve, reject) => {
        var message = {
            to: firebaseToken,
            collapse_key: '',
            notification: {
                title: title,
                body: body
            },
            data: {
                my_key: '',
                my_another_key: ''
            }
        };

        await fcm.send(message, async (err, response) => {
            if (err) {
                console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] FCM Service | Error | Response:`, err);
                reject(err)
            } else {
                console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] FCM Service | Success | Response: `, response);
                resolve(response)
            }
        });
    })
}