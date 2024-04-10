// pages/api/productos/index.js

import { connectDB } from "@/lib/db";
import RegisterDublin from "@/models/Register";


export default async function handler(req, res) {
  const { method } = req;

  await connectDB();

  switch (method) {
    case "GET":
      try {
        const registers = await RegisterDublin.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: registers });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "POST":
      try {
        const producto = new RegisterDublin(req.body);
        await producto.save();
        res.status(201).json({ success: true, data: producto });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(405).json({ success: false, error: "Método no permitido" });
      break;
  }
}
