import HttpException from '../utils/httpException';
import { IUser } from '../interfaces/IUser';
import userModel from '../models/userModel';
import SendMail from '../utils/sendMail';

class UserService {
  private readonly _UserModel = userModel;

  private SendMail = new SendMail();

  private _USER_ALREADY_EXIST = new HttpException(422, 'Email Already Registered');

  private _USER_NOT_FOUND = new HttpException(404, 'User Not Found');

  public create = async (userData: IUser) => {
    const checkUserExist = await this._UserModel.getByEmail(userData.email);
    if (checkUserExist) throw this._USER_ALREADY_EXIST;
    const userCreated = await this._UserModel.create(userData);
    await this.SendMail.sendMail({
      to: {
        name: 'User',
        email: userCreated.email,
      },
      from: {
        name: 'Equipe do Meu App',
        email: 'email@loomi.com',
      },
      subject: 'Seja bem-vindo à Loomi Store',
      body: '<p>Você já pode fazer login em nossa plataforma.</p>',
    });
    return userCreated;
  };

  public getAll = async () => {
    const userCreated: IUser[] = await this._UserModel.getAll();
    return userCreated;
  };

  public getById = async (id: string) => {
    const userById = await this._UserModel.getById(id);
    if (!userById) throw this._USER_NOT_FOUND;
    return userById;
  };

  public update = async (id: string, userData: IUser) => {
    await this.getById(id);
    const userUpdated = await this._UserModel.update(id, userData);
    return userUpdated;
  };

  public remove = async (id: string) => {
    await this.getById(id);
    const deletedUser = await this._UserModel.remove(id);
    return deletedUser;
  };
}

export default new UserService();
