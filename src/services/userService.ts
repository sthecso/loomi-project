class UserService {
  public create = async (body) => {
    const userCreated = await userModel.create();
  };
}

export default new UserService();
