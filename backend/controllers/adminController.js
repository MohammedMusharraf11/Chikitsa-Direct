import validator from "validator";
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "backend\models\doctorModels.js"
import jwt from "jsonwebtoken"


// API for adding doctor
const addDoctor = async (req, res) => {

    try {
      const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
      const imageFile = req.file
    
      console.log({ name, email, password, speciality, degree, experience, about, fees, address },imageFile)
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success:false,message:"Missing Details"})
        }
        
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please Enter a Valid Email"})
            
        }
        
        if(password.length<8){
            return res.json({success:false,message:"Password is Too weak"})

        }
        
        const salt = await bcrypt.genSalt(5)
        const hashedPassword = await bcrypt.hash(password,salt)


        const imageUpload =await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageURl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            iamge:imageURl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()

        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true,message:"Doctor Successfully Added"})


    } catch (error) {
      console.log(error);
      res.json({success:false,message:error.message})
      
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
  

  export {addDoctor,loginAdmin}