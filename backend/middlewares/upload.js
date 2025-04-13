// middlewares/upload.js

import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

// Configura o destino e o nome dos arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // pasta onde as imagens serão salvas
  },
  filename: (req, file, cb) => {
    const extensao = path.extname(file.originalname);
    cb(null, `${uuidv4()}${extensao}`);
  },
});

// Filtra para aceitar apenas imagens
const fileFilter = (req, file, cb) => {
  const tiposPermitidos = /jpeg|jpg|png|webp/;
  const tipo = tiposPermitidos.test(file.mimetype);
  const ext = tiposPermitidos.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (tipo && ext) {
    return cb(null, true);
  }
  cb(new Error("Tipo de arquivo não suportado"));
};

const upload = multer({ storage, fileFilter });

export default upload;
