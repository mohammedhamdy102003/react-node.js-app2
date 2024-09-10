const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://mongo:27017/students', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Student Schema and Model
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number
});
const Student = mongoose.model('Student', studentSchema);

// Get all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find({});
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Get student by name
app.get('/students/:name', async (req, res) => {
  try {
    const student = await Student.findOne({ name: req.params.name });
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});
