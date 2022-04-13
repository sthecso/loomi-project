export interface IProduct {
  name: string
  code: string
  characteristics: string
  image: string
}

export interface IProductWithId extends IProduct {
  id: number
}
