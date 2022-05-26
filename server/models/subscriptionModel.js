const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema ({
    type: String,
    area: String,
    creationDate: Date,
    lastPayment: Date
});

const subscriptionModel = mongoose.model('Subscription', subscriptionSchema);

module.exports = subscriptionModel;
