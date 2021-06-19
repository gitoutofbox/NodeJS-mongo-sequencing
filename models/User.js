const mongoose = require("mongoose");
const sequencing = require("../config/sequencing");

const autoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new mongoose.Schema({
    _id: Number,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
    { _id: false }
);
UserSchema.plugin(autoIncrement);
// UserSchema.pre("save", function (next) {
//     let doc = this;
//     sequencing.getSequenceNextValue("user_id").
//     then(counter => {
//         console.log("asdasd", counter);
//         if(!counter) {
//             sequencing.insertCounter("user_id")
//             .then(counter => {
//                 doc._id = counter;
//                 console.log(doc)
//                 next();
//             })
//             .catch(error => next(error))
//         } else {
//             doc._id = counter;
//             next();
//         }
//     })
//     .catch(error => next(error))
// });

const User = mongoose.model('User', UserSchema);
module.exports = User;