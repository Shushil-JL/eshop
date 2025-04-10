const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    name:{
        fname: {
            type: String,
            required: [true, "Please enter a name"],
        },
        lname: {
            type: String,
            required: [true, "Please enter a name"],
        }
    },
    avatar: {
        public_id: String,
        url: String,
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: [true, "email already exists"],
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minLenght: [6, "Pasword must be atleast 6 characters"],
        select: false,
    },
    contact:{
        type:Number,
        required:[true,"Please enter your contact number!"],
        length:[10,"Contacts should be 10 digits!"]
    },
    order: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
        }
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date,

})


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {

        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET)
}
userSchema.methods.getResetPasswordToken = function () {

    const resetToken = crypto.randomBytes(20).toString("hex")

    // console.log(resetToken)

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000

    return resetToken

}

module.exports = mongoose.model("User", userSchema)