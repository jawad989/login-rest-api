import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const upload = async (file) => {
  try {
    let uploadOptions = { folder: "investors_dashboard_uploads" }; 
    const result = await cloudinary.uploader.upload(file.path, uploadOptions);
    // console.log("cloudinary result: ", result);
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};
