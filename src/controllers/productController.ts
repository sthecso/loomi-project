/* Fiz a tentativa de fazer o upload da imagem que estaria no product com o multer, mas não consegui executá-la. Seria feita uma request pelo user onde seriam enviados os dados do produto e seriam registrados no bando de dados, sendo a imagem o path.
 */

import * as express from 'express';
import uploadFile from '../config/multer';
// import schemaBase from '../utils/schemaBase';
// import { validateProduct } from '../utils/validations';
import productService from '../services/productService';
// import { IUploadedFile } from '../interfaces/IUploadedFile';

class ProductController {
  public path = '/products';

  private readonly _ProductService = productService;

  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    console.log('entrei');
    this.router.post(this.path, this.create);
  }

  public handleSingleUploadFile = async (req: express.Request, res: express.Response) => (
    new Promise<any>((resolve, reject): void => {
      uploadFile(req, res, (error) => {
        if (error) {
          reject(error);
        }

        resolve({ file: req.file, body: req.body });
      });
    }));

  public create = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const uploadResult = await this.handleSingleUploadFile(req, res);
      const upload = uploadResult.path;
      const productCreated = await this._ProductService.create(req.body, upload);
      res.status(201).json(productCreated);

    } catch (error) {
      next(error);
    }
  };
}

export default new ProductController();
