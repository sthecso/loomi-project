import { IUser } from '../interfaces/IUser';
import userModel from '../models/userModel';

class UserService {
  private readonly _UserModel = userModel;

  public create = async (userData: IUser) => {
    const userCreated = await this._UserModel.create(userData);
    return userCreated;
  };

  public getAll = async () => {
    const userCreated: IUser[] = await this._UserModel.getAll();
    return userCreated;
  };
}

export default new UserService();
