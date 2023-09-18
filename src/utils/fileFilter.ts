import { Callback } from 'typeorm';

export const fileFilter: any = (
  _: Request,
  file: Express.Multer.File,
  callback: Callback
) => {
  const fileType = file.mimetype;

  const acceptedFiles = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg'];

  if (acceptedFiles.includes(fileType)) {
    callback(null, true);
  } else {
    callback(new Error(`O tipo ${fileType} não é aceito`), false);
  }
};
