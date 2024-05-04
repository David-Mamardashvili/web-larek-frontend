import { IOrder } from './index';

export interface IProductItem {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    price: number;
  }

  export type IProducts = IProductItem[];
  
  export interface IProductList {
    total: number;
    items: IProducts;
  }
  
  export interface ICartList {
    total: number;
    items: IProducts;
    summary: number;
  }

  export type IPayment = 'online' | 'receipt'
  
  export interface IOrderForm {
    payment: IPayment;
    email: string;
    phone: string;
    address: string;
  }

  export interface IOrder extends IOrderForm {
    total: number;
    items: string[];
    isPaid: boolean;
  }
  
  export type FormErrors = Partial<Record<keyof IOrder, string>>;
  
  export interface IOrderResult {
    id: string;
  }
  
  export interface IAppState {
    catalog: IProductList[];
    cart: ICartList[];
    order: IOrder | null;
    loading: boolean;
  }