import HttpException from '../utils/httpException';
import customer from '../models/customerModel';
import { ICustomer } from '../interfaces/ICustomer';

class CustomerService {
  private readonly _CustomerModel = customer;

  private _USER_ALREADY_EXIST = new HttpException(422, 'Email Already Registered');

  public create = async (customerData: ICustomer) => {
    const checkUserExist = await this._CustomerModel.getByEmail(customerData.email);
    if (checkUserExist) throw this._USER_ALREADY_EXIST;
    const customerCreated = await this._CustomerModel.create(customerData);
    return customerCreated;
  };

  public getAll = async () => {
    const customers = await this._CustomerModel.getAll();
    return customers;
  };
}

export default new CustomerService();
