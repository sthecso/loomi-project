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
}

export default new UserModel();
