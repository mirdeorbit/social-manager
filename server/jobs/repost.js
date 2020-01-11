const db = require('../db');
const apis = require('../utils/socials/api').apis;

module.exports = async function() {
    const schedules = await db.schedules.find().toArray();

   // console.log(schedules);
};