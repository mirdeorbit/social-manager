const db = require('../../../db');

module.exports = (router) => {
    const validationRules = {
        scheduleIds: {
            type: 'array',
            required: true,
            items: {
                type: 'integer'
            }
        }
    };

    router.get('/getlast', async (req, res, next) => {
        var params = req.validate(validationRules);

        console.log(params);

        try {
            result = await db.reposts.find({
                'schedule._id': {$in: params.scheduleIds}
            }).sort({createDate: -1}).limit(1).toArray();

            res.json(result);
        } catch(err) {
            throw err;
        }
    })
};