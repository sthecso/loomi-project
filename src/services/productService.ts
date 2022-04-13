import productModel from '../models/productModel';
import { IProduct } from '../interfaces/IProduct';

class CustomerService {
  private readonly _ProductModel = productModel;

  public create = async (productData: IProduct, path: string) => {
    const productCreated = await this._ProductModel.create(productData, path);
    return productCreated;
  };
}

export default new CustomerService();
