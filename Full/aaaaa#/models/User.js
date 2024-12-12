//Full\flatNode\models\User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Funcție pentru validarea email-ului
const emailValidator = (email) => {
    const regex = /^\S+@\S+\.\S+$/; // Regex simplu pentru validarea email-ului
    return regex.test(email);
};

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: [true, 'Email is required.'], 
        unique: true, 
        validate: [emailValidator, 'Please fill a valid email address.'] // Validare pentru email
    },
    password: { 
        type: String, 
        required: [true, 'Password is required.'], 
        minlength: [6, 'Password must be at least 6 characters long.'] // Validare pentru lungimea parolei
    },
    firstName: { 
        type: String, 
        required: [true, 'First name is required.'],
        minlength: [2, 'First name must be at least 2 characters long.'] // Validare pentru lungimea numelui
    },
    lastName: { 
        type: String, 
        required: [true, 'Last name is required.'],
        minlength: [2, 'Last name must be at least 2 characters long.'] // Validare pentru lungimea numelui
    },
    birthDate: { 
        type: Date, 
        required: [true, 'Birth date is required.'],
        validate: {
            validator: function(value) {
                // Verifică dacă utilizatorul are cel puțin 18 ani
                const age = new Date().getFullYear() - value.getFullYear();
                return age >= 18;
            },
            message: 'User must be at least 18 years old.' // Mesaj de eroare pentru vârstă
        }
    },
    isAdmin: { type: Boolean, default: false },
    favouriteFlats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flat' }],
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
});

// Middleware pentru criptarea parolei
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model('User', userSchema);
