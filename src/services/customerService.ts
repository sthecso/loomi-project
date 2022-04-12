import customer from '../models/customerModel';
import { ICustomer } from '../interfaces/ICustomer';

class CustomerService {
  private readonly _Customer = customer;

  public create = async (customerData: ICustomer) => {
    const customerCreated = await this._Customer.create(customerData);
    return customerCreated;
  };
}

export default new CustomerService();
