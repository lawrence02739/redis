const mongoose = require('mongoose');

// export interface IUser extends Document {
//   name: string;
//   email: string;
// }

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, },
});

module.exports = mongoose.model('User', UserSchema);
