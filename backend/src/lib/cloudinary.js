import { v2 as cloudinary } from 'cloudinary';
import config from "../config/index.js";
// import fs from "fs";

cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret
});

const uploadToCloudinary = async (localFilePath) => {
    try {
        const response = await cloudinary.uploader.upload(localFilePath)
        return response
    } catch (err) {
        console.log(err, "Hello")
        fs.unlinkSync(localFilePath)
        return err
    }
}

export default uploadToCloudinary