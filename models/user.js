import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name must be filled!'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email must be filled!'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password must be filled!'],
        minlength: [6, 'Password must be 6 character length!'],
        select: false
    }
}, {
    timestamps: true
});

// Pre-save Hook: Hash password before saving to the DB
userSchema.pre('save', async function () {
    // Only hash password if the data is new or updated
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Comparing passwrod while login
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;