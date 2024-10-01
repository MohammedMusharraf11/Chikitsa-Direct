import validator from "validator";
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctorModels.js"; // Use correct relative path

import jwt from "jsonwebtoken"


// API for adding doctor
const addDoctor = async (req, res) => {
  try {
      const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
      const imageFile = req.file;

      console.log({ name, email, password, speciality, degree, experience, about, fees, address }, imageFile);

      // Check for missing details
      if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
          return res.json({ success: false, message: "Missing Details" });
      }
      
      // Validate email
      if (!validator.isEmail(email)) {
          return res.json({ success: false, message: "Please Enter a Valid Email" });
      }
      
      // Validate password length
      if (password.length < 8) {
          return res.json({ success: false, message: "Password is Too weak" });
      }
      
      // Hash password
      const salt = await bcrypt.genSalt(5);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Upload image to Cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
      const imageURL = imageUpload.secure_url;  // Use correct variable name

      // Prepare doctor data
      const doctorData = {
          name,
          email,
          image: imageURL,  // Corrected typo here
          password: hashedPassword,
          speciality,
          degree,
          experience,
          about,
          fees,
          address: JSON.parse(address),  // Ensure valid JSON
          date: Date.now(),
      };

      // Create and save new doctor
      const newDoctor = new doctorModel(doctorData);
      await newDoctor.save();

      res.json({ success: true, message: "Doctor Successfully Added" });
  } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
  }
};


  const loginAdmin = async(req,res) => {
    try{
        const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign(email + password, process.env.JWT_SECRET);
    res.json({ success: true, token });
        } else {
  res.json({ success: false, message: "Invalid credentials" });
}
    }
    catch(error){
        console.log(error);
      res.json({success:false,message:error.message})
    }
  }
  
// API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select('-password');
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addDoctor, loginAdmin, allDoctors };
 