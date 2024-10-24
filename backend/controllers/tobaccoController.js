import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; // To get the file path from import.meta.url
import tobaccoModel from "../models/tobaccoModel.js";
import mongoose from "mongoose";

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Controller to list all tobacco items
export const listTobacco = async (req, res) => {
    try {
        const list = await tobaccoModel.find();
        return res.status(200).json({ success: true, data: list });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: err });
    }
};


export const findOne = async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters
    try {
      const tobacco = await tobaccoModel.findById(id);
  
      if (!tobacco) {
        return res.status(404).json({ success: false, message: 'Tobacco not found' });
      }
  
      return res.status(200).json({ success: true, data: tobacco });
    } catch (err) {
      console.error(err); // Log the error for debugging
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  
// Controller to add a new tobacco item
export const addTobacco = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    let image_filename = `${req.file.filename}`;

    const newTobacco = new tobaccoModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        rating: req.body.rating,
        image: image_filename,
        flavor:req.body.flavor,
        size:req.body.size,
        collectionName:req.body.collectionName
    });

    try {
        await newTobacco.save();
        return res.status(201).json({ success: true, message: "Tobacco stored successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Error, Tobacco not stored" });
    }
};

// Controller to remove a tobacco item and its image
export const removeTobacco = async (req, res) => {
    const tobaccoID = req.body._id;

    if (!tobaccoID) {
        return res.status(400).json({ success: false, message: "ID is required" });
    }

    try {
        const tobacco = await tobaccoModel.findById(tobaccoID);
        if (!tobacco) {
            return res.status(404).json({ success: false, message: "ID not found" });
        }

        // Construct the path to the image file
        const imagePath = path.join(__dirname, '..', 'uploads', tobacco.image);

        // Delete the tobacco document
        await tobaccoModel.findByIdAndDelete(tobaccoID);

        // Check if the image file exists and delete it
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error(`Error removing file: ${err}`);
                return res.status(500).json({ success: false, message: "Error removing the image file" });
            }
        });

        return res.status(200).json({ success: true, message: "Tobacco and associated image removed" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Error, Tobacco not removed" });
    }
};




// Controller to edit tobacco with image upload
export const updateTobacco = async (req, res) => {
    try {
        const { _id: id, name, description, price, rating, flavor, size } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Enter an id" });
        }

        const tobacco = await tobaccoModel.findById(id);
        if (!tobacco) {
            return res.status(404).json({ success: false, message: "Tobacco not found" });
        }

        const updatedData = { name, description, price, rating, flavor, size };

        // If a new image is uploaded
        if (req.file) {
            const newImageName = req.file.filename;

            // Unlink (remove) the old image from the server
            const oldImagePath = path.join(__dirname, '..', 'uploads', tobacco.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath); // Remove the old image
            }

            updatedData.image = newImageName; // Save the new image name in the database
        }

        const updated = await tobaccoModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updated) {
            return res.status(500).json({ success: false, message: "Tobacco not updated" });
        }

        return res.status(200).json({ success: true, message: "Tobacco updated successfully", updated });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

