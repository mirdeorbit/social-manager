var Collection = require('mongodbext').Collection;

exports.create = function(db) {
    exports.collection = new Collection(db, 'reposts', {
        changeDataMethods: [
            'insertOne',
            'updateOne', 'findOneAndUpdate', 'updateMany'
        ]
    });

    return exports.collection;
};

exports.init = function() {
    var collection = exports.collection;

    collection.addPlugin('sequenceId');
    collection.addPlugin('detailedError');
    collection.addPlugin('createDate', {format: 'ISODate'});
    collection.addPlugin('updateDate', {format: 'ISODate'});
};
