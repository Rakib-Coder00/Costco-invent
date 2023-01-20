import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        trim: true,
        // match: [
        //     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Please enter a valid email'
        // ]
    },
    password: {
        type: String,
        required: [true, 'Enter your password'],
        // minLength: [6, 'Password must be upto 6 character'],
        // maxLength: [23, 'Password must not be more than 23 character']
    },
    photo: {
        type: String,
        required: [true, 'Upload your photo'],
        default: 'yt.com'
    },
    phone: {
        type: String,
        default: '+880'
    },
    bio: {
        type: String,
        default: 'Bio',
        maxLength: [250, 'Bio must not be more than 250 character']
    }
},
    {
        timestamps: true,

    }
)
//Hashed Password :
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User