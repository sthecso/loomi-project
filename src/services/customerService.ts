import HttpException from '../utils/httpException';
import customer from '../models/customerModel';
import { ICustomer } from '../interfaces/ICustomer';

class CustomerService {
  private readonly _Customer = customer;

  private _USER_ALREADY_EXIST = new HttpException(422, 'Email Already Registered');

  public create = async (customerData: ICustomer) => {
    const checkUserExist = await this._Customer.getByEmail(customerData.email);
    if (checkUserExist) throw this._USER_ALREADY_EXIST;
    const customerCreated = await this._Customer.create(customerData);
    return customerCreated;
  };
}

export default new CustomerService();
