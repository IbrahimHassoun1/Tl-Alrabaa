import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; // To get the file path from import.meta.url
import partsModel from "../models/partsModel.js";
import mongoose from "mongoose";

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Controller to list all parts items
export const listParts = async (req, res) => {
    try {
        const list = await partsModel.find();
        return res.status(200).json({ success: true, data: list });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: err });
    }
};
export const findOne = async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters
    try {
      const parts = await partsModel.findById(id);
  
      if (!parts) {
        return res.status(404).json({ success: false, message: 'parts not found' });
      }
  
      return res.status(200).json({ success: true, data: parts });
    } catch (err) {
      console.error(err); // Log the error for debugging
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  };
// Controller to add a new parts item
export const addParts = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    let image_filename = `${req.file.filename}`;

    const newParts = new partsModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        rating: req.body.rating,
        image: image_filename,
        type:req.body.type,
        color:req.body.color,
        collectionName:req.body.collectionName
    });

    try {
        await newParts.save();
        return res.status(201).json({ success: true, message: "Parts stored successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Error, Parts not stored" });
    }
};

// Controller to remove a parts item and its image
export const removeParts = async (req, res) => {
    const partsID = req.body._id;

    if (!partsID) {
        return res.status(400).json({ success: false, message: "ID is required" });
    }

    try {
        const parts = await partsModel.findById(partsID);
        if (!parts) {
            return res.status(404).json({ success: false, message: "ID not found" });
        }

        // Construct the path to the image file
        const imagePath = path.join(__dirname, '..', 'uploads', parts.image);

        // Delete the parts document
        await partsModel.findByIdAndDelete(partsID);

        // Check if the image file exists and delete it
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error(`Error removing file: ${err}`);
                return res.status(500).json({ success: false, message: "Error removing the image file" });
            }
        });

        return res.status(200).json({ success: true, message: "Parts and associated image removed" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Error, Parts not removed" });
    }
};
// Controller to edit parts with image upload
export const updateParts = async (req, res) => {
    try {
        const { _id: id, name, description, price, rating, flavor, size } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Enter an id" });
        }

        const parts = await partsModel.findById(id);
        if (!parts) {
            return res.status(404).json({ success: false, message: "Parts not found" });
        }

        const updatedData = { name, description, price, rating, flavor, size };

        // If a new image is uploaded
        if (req.file) {
            const newImageName = req.file.filename;

            // Unlink (remove) the old image from the server
            const oldImagePath = path.join(__dirname, '..', 'uploads', parts.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath); // Remove the old image
            }

            updatedData.image = newImageName; // Save the new image name in the database
        }

        const updated = await partsModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updated) {
            return res.status(500).json({ success: false, message: "Parts not updated" });
        }

        return res.status(200).json({ success: true, message: "Parts updated successfully", updated });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

