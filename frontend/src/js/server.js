const express = require('express');
const mongoose = require('mongoose');
const jsPDF = require('jspdf');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/pdfDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const pdfSchema = new mongoose.Schema({
  fileName: String,
  content: String,
});

const PDF = mongoose.model('PDF', pdfSchema);

app.post('/api/save-pdf', async (req, res) => {
  const { fileName, content } = req.body;

  const newPDF = new PDF({
    fileName,
    content,
  });

  try {
    await newPDF.save();
    res.status(201).json({ message: 'PDF saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
