export interface IUser {
  role: string,
  email: string,
  password: string,
}

export interface IUserWithId extends IUser {
  id: number
}
