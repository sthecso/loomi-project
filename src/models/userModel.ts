import { PrismaClient } from '@prisma/client';
import { IUser } from '../interfaces/IUser';

class UserModel {
  private _prisma = new PrismaClient();

  public create = async (userData: IUser) => {
    const { role, email, password } = userData;
    const userCreated = await this._prisma.user.create({
      data: {
        role,
        email,
        password,
      },
    });

    return userCreated;
  };

  public getByEmail = async (email: string) => this._prisma.user.findUnique({ where: { email } });

  public getAll = async () => {
    const users = await this._prisma.user.findMany();
    return users;
  };

  public getById = async (id: string) => {
    const userById = await this._prisma.user.findUnique({ where: { id: parseInt(id, 10) } });
    return userById;
  };

  public update = async (id: string, userData: IUser) => {
    const { role, email, password } = userData;

    const userUpdated = await this._prisma.user.update({
      where: { id: parseInt(id, 10) },
      data: {
        role,
        email,
        password,
      },
    });

    return userUpdated;
  };

  public remove = async (id: string) => {
    const deletedUser = await this._prisma.user.delete({ where: { id: parseInt(id, 10) } });
    return deletedUser;
  };
}

export default new UserModel();
