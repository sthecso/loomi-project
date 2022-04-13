export interface ICustomer {
  role: string
  name: string
  email: string
  password: string
  telephone: string
  address: string
}

export interface ICustomerWithId extends ICustomer {
  id: number
}
