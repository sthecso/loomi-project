import { PrismaClient } from '@prisma/client';
import { IProduct } from '../interfaces/IProduct';

class ProductModel {
  private _prisma = new PrismaClient();

  public create = async (productData: IProduct, path: string) => {
    const { name, code, characteristics } = productData;
    const productCreated = await this._prisma.product.create({
      data: {
        name,
        code,
        characteristics,
        image: path,
      },
    });

    return productCreated;
  };
}

export default new ProductModel();
