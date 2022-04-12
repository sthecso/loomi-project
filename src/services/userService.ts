import HttpException from '../utils/httpException';
import { IUser } from '../interfaces/IUser';
import userModel from '../models/userModel';

class UserService {
  private readonly _UserModel = userModel;

  private _USER_ALREADY_EXIST = new HttpException(422, 'Email already registered');

  public create = async (userData: IUser) => {
    const checkUserExist = await this._UserModel.getByEmail(userData.email);
    if (checkUserExist) throw this._USER_ALREADY_EXIST;
    const userCreated = await this._UserModel.create(userData);
    return userCreated;
  };

  public getAll = async () => {
    const userCreated: IUser[] = await this._UserModel.getAll();
    return userCreated;
  };
}

export default new UserService();
