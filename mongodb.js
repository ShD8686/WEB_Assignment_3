const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

const developerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    foundedYear: { type: Number, required: true },
    games: [String]
}, { timestamps: true });

const Developer = mongoose.model('Developer', developerSchema);

app.get('/developers', async (req, res) => {
    try {
        const developers = await Developer.find();
        res.json(developers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/developers/:id', async (req, res) => {
    try {
        const developer = await Developer.findById(req.params.id);
        if (!developer) return res.status(404).json({ error: "Developer not found" });
        res.json(developer);
    } catch (error) {
        res.status(400).json({ error: "Invalid ID format" });
    }
});

app.post('/developers', async (req, res) => {
    try {
        const { name, country, foundedYear, games } = req.body;
        
        if (!name || !country || !foundedYear) {
            return res.status(400).json({ error: "Name, Country and Founded Year are required" });
        }

        const newDev = new Developer({ name, country, foundedYear, games });
        await newDev.save();
        res.status(201).json(newDev);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/developers/:id', async (req, res) => {
    try {
        const updatedDev = await Developer.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!updatedDev) return res.status(404).json({ error: "Developer not found" });
        res.json(updatedDev);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/developers/:id', async (req, res) => {
    try {
        const deletedDev = await Developer.findByIdAndDelete(req.params.id);
        if (!deletedDev) return res.status(404).json({ error: "Developer not found" });
        res.json({ message: "Developer deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

connectDB().then(() => {
    app.listen(3000, () => {
        console.log(`Server running at http://localhost:3000`);
    });

});
