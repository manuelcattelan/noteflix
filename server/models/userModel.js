const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    email: String,
    passwordHash: String,
    passwordSalt: String,
    joinDate: Date,
    userType: String,
    username: String,
    subscription: { type: Schema.Types.ObjectId, ref:'Subscription'},
    savedDocuments:[{ type: Schema.Types.ObjectId, ref:'Document'}],
    avatar: {
        sex: String,
        faceColor: String,
        earSize: String,
        eyeStyle: String,
        noseStyle: String,
        mouthStyle: String,
        shirtStyle: String,
        glassesStyle: String,
        hairColor: String,
        hairStyle: String,
        hatStyle: String,
        hatColor: String,
        eyeBrowStyle: String,
        shirtColor: String,
        bgColor: String
      }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
