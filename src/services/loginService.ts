import * as jwt from 'jsonwebtoken';
import HttpException from '../utils/httpException';
import { IUser } from '../interfaces/IUser';
import { ICustomer } from '../interfaces/ICustomer';
import { jwtSign, jwtVerify } from '../utils/jwt';
import userModel from '../models/userModel';
import customerModel from '../models/customerModel';

class LoginService {
  private readonly _UserModel = userModel;

  private readonly _CustomerModel = customerModel;

  private _secret: string = (process.env.JWT_SECRET as string) || 'secret';

  private _jwtConfig: object = { algorithms: ['HS256'] };

  private _LOGIN_UNAUTHORIZED = new HttpException(401, 'Login Unauthorized');

  public loginCustomer = async (userData: ICustomer) => {
    const checkCustomerExist = await this._CustomerModel.getByEmail(userData.email);

    if (!checkCustomerExist) throw this._LOGIN_UNAUTHORIZED;

    const { id, role, email } = checkCustomerExist;
    const token = jwtSign({ id, role, email });
    console.log(token);

    return token;
  };

  public loginUser = async (userData: IUser | ICustomer) => {
    const checkUserExist = await this._UserModel.getByEmail(userData.email);

    if (!checkUserExist) throw this._LOGIN_UNAUTHORIZED;

    const { id, role, email } = checkUserExist;
    const token: string = jwtSign({ id, role, email });

    return token;
  };

  public validateLogin = async (token: string) => {
    const { role } = jwtVerify(token) as jwt.JwtPayload;

    return role;
  };
}

export default new LoginService();
