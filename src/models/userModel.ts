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
    console.log(users);
    return users;
  };
}

export default new UserModel();
