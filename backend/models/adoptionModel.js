const mongoose = require('mongoose');

const adoptionSchema = mongoose.Schema({
  idNumber: { type: String, required: true }, // תעודת זהות של המאמץ
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true }, // מזהה החיה
  address: { type: String, required: true },
  cardNumber: { type: String, required: true },
  cardExpiry: { type: String, required: true },
  cardCVV: { type: String, required: true },
  cardHolderID: { type: String, required: true },
  adoptionPackage: { type: Boolean, required: true },
  accessories: [{ type: String }],
  adoptionDate: { type: Date, default: Date.now }
});

const Adoption = mongoose.model('Adoption', adoptionSchema);

module.exports = Adoption;
