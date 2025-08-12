import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  emailVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  role: { type: String, enum: ['user', 'admin', 'superadmin'], default: 'user' },
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
