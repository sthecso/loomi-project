import HttpException from '../utils/httpException';
import customer from '../models/customerModel';
import { ICustomer } from '../interfaces/ICustomer';
import SendMail from '../utils/sendMail';

class CustomerService {
  private readonly _CustomerModel = customer;

  private SendMail = new SendMail();

  private _USER_ALREADY_EXIST = new HttpException(422, 'Email Already Registered');

  private _CUSTOMER_NOT_FOUND = new HttpException(404, 'Customer Not Found');

  public create = async (customerData: ICustomer) => {
    const checkUserExist = await this._CustomerModel.getByEmail(customerData.email);
    if (checkUserExist) throw this._USER_ALREADY_EXIST;
    const customerCreated = await this._CustomerModel.create(customerData);
    await this.SendMail.sendMail({
      to: {
        name: customerCreated.name || 'Customer',
        email: customerCreated.email,
      },
      from: {
        name: 'Equipe do Meu App',
        email: 'email@loomi.com',
      },
      subject: 'Seja bem-vindo à Loomi Store',
      body: '<p>Você já pode fazer login em nossa plataforma.</p>',
    });

    return customerCreated;
  };

  public getAll = async () => {
    const customers = await this._CustomerModel.getAll();
    return customers;
  };

  public getById = async (id: string) => {
    const customerById = await this._CustomerModel.getById(id);
    if (!customerById) throw this._CUSTOMER_NOT_FOUND;
    return customerById;
  };

  public update = async (id: string, customerData: ICustomer) => {
    await this.getById(id);
    const customerUpdated = await this._CustomerModel.update(id, customerData);
    return customerUpdated;
  };

  public remove = async (id: string) => {
    await this.getById(id);
    const deletedCustomer = await this._CustomerModel.remove(id);
    return deletedCustomer;
  };
}

export default new CustomerService();
