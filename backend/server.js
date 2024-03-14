const express = require('express');
const multer = require('multer');
const path = require('path');
const {spawn} = require('child_process');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/saveImage', upload.single('file'), (req, res) => {
  try {
    // Access the uploaded file via req.file.buffer
    const imageData = req.file.buffer;

    // Save the file to the desired location (e.g., 'img/' directory)
    const filePath = path.join(__dirname, 'img', `${req.body.name}.png`);
    require('fs').writeFileSync(filePath, imageData);

    const childPython = spawn('python',['check.py',"Hello"]);
    
    let imageDataRecieved = "";
    childPython.stdout.on('data',(data) => {
      imageDataRecieved += data;
    });

    childPython.on('close' , (code) => {
      console.log(imageDataRecieved);
      console.log("Child process exited with " + code);
      res.send(imageDataRecieved);;
    });
  } catch (error) {
    console.error('Error saving image:', error);
    res.status(500).json({ success: false, message: 'Error saving image.' });
  }
});

// app.post('/saveImage', (req,res) => {
//   try{
//     res.send("Working");
//   }catch(e){
//     res.send("Error");
//   }
// })

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
