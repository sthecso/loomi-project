import { IUser } from '../interfaces/IUser';
import userModel from '../models/userModel';

class UserService {
  private _UserModel = userModel;

  public create = async (userData: IUser) => {
    const userCreated = await this._UserModel.create(userData);
    return userCreated;
  };
}

export default new UserService();
