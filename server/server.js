import express from 'express';
import multer from 'multer';

export const app = express();

var storage = multer.memoryStorage();
var upload = multer({storage: storage});

app.use('/', express.static('client'));

app.post('/upload', upload.single('data'), (request, response) => {
  if(request.file) {
    response.status(200).json({
      filename: request.file.originalname,
      size: request.file.size,
      type: request.file.mimetype
    });
  } else {
    res.status(500).json({error: `No file was provided in the 'data' field.`});
  }
});
