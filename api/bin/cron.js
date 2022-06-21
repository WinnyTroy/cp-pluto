const cron = require('node-cron');
const service = require('../services/index');

cron.schedule('* * * * *', async () => {
    //console.log('[X] Reset device verification count');
    //await service.customer.resetDVCountAll();
});

//59 20 * * *
cron.schedule('59 20 * * *', async () => {
    await service.customer.resetDVCountAll().then(async callback => {
        console.log(callback);
    }, async err => {
        console.error(err);
    })
})