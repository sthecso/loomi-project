export interface ICustomer {
  role: string
  nome: string
  email: string
  password: string
  telephone: string
  address: string
}

export interface ICustomerWithId extends ICustomer {
  id: number
}
