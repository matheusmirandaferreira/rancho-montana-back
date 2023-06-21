import multer from 'multer';
import { AppDataSource } from '../data-source';
import { Horse } from '../models/Horse';
import { validate } from 'uuid';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'storage/public/');
  },

  filename: async (req, file, callback) => {
    const { uuid: uuidhorse } = req.params;

    if (!validate(uuidhorse)) callback(new Error('Informe um uuid válido'), '');

    const horse = await AppDataSource.createQueryBuilder(Horse, 'horse')
      .select()
      .where('horse.uuidhorse = :uuidhorse', { uuidhorse })
      .getExists();

    if (!horse) {
      console.log('errou');
      callback(new Error('Cavalo não encontrado'), '');
    } else {
      callback(null, uuidhorse + '-' + file.originalname);
    }
  },
});

const fileFilter: any = (_: Request, file: Express.Multer.File, callback) => {
  const fileType = file.mimetype;

  const acceptedFiles = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg'];

  if (acceptedFiles.includes(fileType)) {
    callback(null, true);
  } else {
    callback(new Error(`O tipo ${fileType} não é aceito`), false);
  }
};

const uploadsMiddleware = multer({ storage, fileFilter });

export { uploadsMiddleware };
