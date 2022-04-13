import { PrismaClient } from '@prisma/client';
import { ICustomer } from '../interfaces/ICustomer';

class CustomerModel {
  private _prisma = new PrismaClient();

  public create = async (customerData: ICustomer) => {
    const { role, name, email, password, telephone, address } = customerData;
    const customerCreated = await this._prisma.customer.create({
      data: {
        role,
        name,
        email,
        password,
        telephone,
        address,
      },
    });

    return customerCreated;
  };

  public getByEmail = async (email: string) => {
    const customerByEmail = await this._prisma.customer.findUnique({ where: { email } });
    return customerByEmail;
  };

  public getAll = async () => this._prisma.customer.findMany();

  public getById = async (id: string) => {
    const customerById = await this._prisma.customer.findUnique({
      where: { id: parseInt(id, 10) } });
    return customerById;
  };

  public update = async (id: string, customerData: ICustomer) => {
    const { role, name, email, password, telephone, address } = customerData;
    const customerUpdated = await this._prisma.customer.update({
      where: { id: parseInt(id, 10) },
      data: {
        role,
        name,
        email,
        password,
        telephone,
        address,
      },
    });

    return customerUpdated;
  };

  public remove = async (id: string) => {
    const deletedCustomer = await this._prisma.customer.delete({ where: { id: parseInt(id, 10) } });
    return deletedCustomer;
  };
}

export default new CustomerModel();
