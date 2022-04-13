import * as multer from 'multer';
import * as crypto from 'crypto';
import * as path from 'path';

const uploadFilePath = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

const storageFile: multer.StorageEngine = multer.diskStorage({
  destination: uploadFilePath,
  filename(
    req: Express.Request,
    file: Express.Multer.File,
    fn: (error: Error | null, filename: string) => void,
  )
    : void {
    crypto.randomBytes(16, (err, hash) => {
      if (err) {
        console.log(err);
        throw err;
      }
      fn(null, `${hash.toString('hex')}-${file.originalname}`);
    });
  },
});

const uploadFile = multer({
  dest: uploadFilePath,
  storage: storageFile,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Invalid file type.'));
    }
  },
});

export default uploadFile;
