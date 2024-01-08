const { Schema, model } = require('mongoose');

const userSchema = new Schema({
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
            required: true,
            select: false
      },
      otp: {
            type: String,
            default: ""
      },
      verified: {
            type: Boolean,
            default: true
      }
}, { timestamps: true });

const otpSchema = new Schema({
      userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
      },
      otp: {
            type: String,
            required: true
      },
      expiresAt: {
            type: Date,
            required: true
      }
}, { timestamps: true });

const User = model('User', userSchema, 'users');
const OTP = model('OTP', otpSchema, 'OTP');

module.exports = { User, OTP };