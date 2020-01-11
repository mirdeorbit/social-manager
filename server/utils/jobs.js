const _ = require('underscore');
var CronJob = require('cron').CronJob;

const jobs = [{
    name: 'repost',
    schedule: '*/10 * * * * *'
}];

exports.init = function () {
    var jobsResult = {};
    _(jobs).each(function (job) {
        const jobFunction = require('../jobs/' + job.name);

        jobsResult[job.name] = new CronJob(job.schedule, jobFunction, null, true, 'Europe/Moscow');

        jobsResult[job.name].start();
    });

    return jobsResult;
};