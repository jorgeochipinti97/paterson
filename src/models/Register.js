import mongoose from "mongoose";

const regsiterSchema = new mongoose.Schema({
  name: { type: String, },
  phone: { type: String, },
  email: { type: String, },
  city: { type: String, },
  provincia: { type: String, },

});

const RegisterDublin =
  mongoose.models.RegisterDublin || mongoose.model("RegisterDublin", regsiterSchema);

export default RegisterDublin;