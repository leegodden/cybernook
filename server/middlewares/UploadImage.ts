
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    const originalname = file.originalname;
    const extension = path.extname(originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = crypto.createHash('sha256').update(originalname + uniqueSuffix).digest('hex') + extension;
    
    // Comprueba si el archivo ya existe en la carpeta de destino
    const filePath = path.join('./uploads/', filename);
    if (fs.existsSync(filePath)) {
      // Si existe, renombra el archivo agregando un número aleatorio único
      const newFilename = crypto.createHash('sha256').update(originalname + Date.now()).digest('hex') + extension;
      cb(null, newFilename);
    } else {
      cb(null, filename);
    }
  },
});

const uploads = multer({ storage });


export default uploads