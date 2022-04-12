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
}

export default new CustomerModel();
