import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; // To get the file path from import.meta.url
import shishaModel from "../models/shishaModel.js";
import mongoose from "mongoose";

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Controller to list all tobacco items
export const listShisha = async (req, res) => {
    try {
        const list = await shishaModel.find();
        return res.status(200).json({ success: true, data: list });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: err });
    }
};
export const findOne = async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters
    try {
      const shisha = await shishaModel.findById(id);
  
      if (!shisha) {
        return res.status(404).json({ success: false, message: 'shisha not found' });
      }
  
      return res.status(200).json({ success: true, data: shisha });
    } catch (err) {
      console.error(err); // Log the error for debugging
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  
// Controller to add a new shisha item
export const addShisha = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    let image_filename = `${req.file.filename}`;

    const newShisha = new shishaModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        rating: req.body.rating,
        image: image_filename,
        color:req.body.color,
        size:req.body.size,
        collectionName:req.body.collectionName
    });

    try {
        await newShisha.save();
        return res.status(201).json({ success: true, message: "Shisha stored successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Error, Shisha not stored" });
    }
};

// Controller to remove a tobacco item and its image
export const removeShisha = async (req, res) => {
    const shishaID = req.body._id;

    if (!shishaID) {
        return res.status(400).json({ success: false, message: "ID is required" });
    }

    try {
        const shisha = await shishaModel.findById(shishaID);
        if (!shisha) {
            return res.status(404).json({ success: false, message: "ID not found" });
        }

        // Construct the path to the image file
        const imagePath = path.join(__dirname, '..', 'uploads', shisha.image);

        // Delete the tobacco document
        await shishaModel.findByIdAndDelete(shishaID);

        // Check if the image file exists and delete it
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error(`Error removing file: ${err}`);
                return res.status(500).json({ success: false, message: "Error removing the image file" });
            }
        });

        return res.status(200).json({ success: true, message: "shisha and associated image removed" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Error, shisha not removed" });
    }
};
// Controller to edit shisha with image upload
export const updateShisha = async (req, res) => {
    try {
        const { _id: id, name, description, price, rating, flavor, size } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Enter an id" });
        }

        const shisha = await shishaModel.findById(id);
        if (!shisha) {
            return res.status(404).json({ success: false, message: "Shisha not found" });
        }

        const updatedData = { name, description, price, rating, flavor, size };

        // If a new image is uploaded
        if (req.file) {
            const newImageName = req.file.filename;

            // Unlink (remove) the old image from the server
            const oldImagePath = path.join(__dirname, '..', 'uploads', shisha.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath); // Remove the old image
            }

            updatedData.image = newImageName; // Save the new image name in the database
        }

        const updated = await shishaModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updated) {
            return res.status(500).json({ success: false, message: "Shisha not updated" });
        }

        return res.status(200).json({ success: true, message: "Shisha updated successfully", updated });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


