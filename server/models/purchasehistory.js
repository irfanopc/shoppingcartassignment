const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  pdf: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
}
});

const Purchasehistory = mongoose.model('property', invoiceSchema);

module.exports = Purchasehistory;
 