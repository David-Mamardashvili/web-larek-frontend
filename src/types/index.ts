export interface IProduct { 
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
}

export interface IOrder {
  payment: 'online' | 'upon receipt';
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export type IProductList = Omit<IProduct[], 'description'>;

export type IOrderBasket = Pick<IProduct, 'description' | 'price'> & Pick<IOrder, 'total'>

export type IOrderPayment = Pick<IOrder, 'payment' | 'address'>

export type IOrderContacts = Pick<IOrder, 'email' | 'phone'>

export type IOrderResult = Pick<IOrder, 'total'>