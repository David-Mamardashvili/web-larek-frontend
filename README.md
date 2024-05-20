# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Интерфейсы и типы
import { categoryChoice } from './../utils/constants';
import { ProductItem } from "../components/AppData";

//index.ts
export interface ApiResponse {
    items: IProductItem[];
}

//Form.ts
export interface IFormState {
    valid: boolean;
    errors: string[];
}

export type FormErrors = Partial<Record<keyof IOrderForm, string>>;

//Modal.ts
export interface IModalData {
    content: HTMLElement;
}

//AppData.ts
export interface IProductItem {
    picked: boolean;
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

export interface IAppState {
    basket: IProductItem[];
    catalog: IProductItem;
    order: IOrder;
    formErrors: FormErrors;
}

//Basket.ts
export interface IBasketView {
    items: HTMLElement[];
    total: number;
}

export interface IBasketItem extends IProductItem {
    id: string;
    index: number;
}
  
export interface IBasketItemActions {
    onClick: (event: MouseEvent) => void;
}

//Card.ts
export interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export interface ICard {
    picked: boolean;
    id: string;
    category: string;
    title: string;
    image: string;
    price: number | null;
    description: string;
}

//Contacts.ts
export interface IContacts {
    email: string;
    phone: string;
}

//Order.ts
export interface IOrder {
    items: string[];
    total: number;
    payment: string;
    address: string;
    email: string;
    phone:string;
}

export interface IOrderForm {
    payment: string;
    address: string;
    email: string;
    phone: string;
}

export interface IOrderPayment {
    payment: string;
    address: string;
}

export interface IOrderForm {
    payment: string;
    address: string;
    email: string;
    phone: string;
}

//Page.ts
export interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}

export type CategoryOptions = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

export type CategoryChoice = {
    [key in CategoryOptions]: string;
};

//Success.ts
export interface ISuccessActions {
    onClick: (event: MouseEvent) => void;
  }
  
 export interface ISuccess {
    description: number;
}

## Model
//Класс базовой модели
abstract class Model<T> {
    constructor(data: Partial<T>, protected events: IEvents) {
        Object.assign(this, data);
    }

    // Сообщить всем что модель поменялась
    emitChanges(event: string, payload?: object) {
        // Состав данных можно модифицировать
        this.events.emit(event, payload ?? {});
    }

    // далее можно добавить общие методы для моделей
}

//Класс состояния приложения
export class AppState extends Model<IAppState> {
  // Массив товаров
  catalog: ProductItem[];
  // Объект заказа
  order: IOrder = {
    items: [],
    total: null,
    payment: '',
    address: '',
    email: '',
    phone: '',
  };
  // Массив товаров в корзине
  basket: ProductItem[] = [];
  // Объект ошибок форм
  formErrors: FormErrors = {};

  /**
   * Метод подсчета количества товаров в корзине
   * @returns Количество товаров
   */
  basketItemsLength(): number {
    return this.basket.length;
  }

  /**
   * Метод добавления id товаров в заказ
   */
  setItems(): void {
    this.order.items = this.basket.map(item => item.id);
  }

  /**
   * Метод подсчета общей суммы заказа
   * @returns Общая сумма товаров в корзине
   */
  totalPrice(): number {
    return this.basket.reduce((total, item) => total + item.price, 0);
  }

  /**
   * Метод добавления продукта в корзину
   * @param newItem - Новый продукт для добавления в корзину
   */
  appendBasket(newItem: ProductItem): void {
    this.basket.push(newItem);
  }

  /**
   * Метод удаления продукта из корзины
   * @param id - Идентификатор продукта для удаления
   */
  removeBasket(id: string): void {
    this.basket = this.basket.filter(item => item.id !== id);
  }

  /**
   * Метод полной очистки корзины
   */
  absoluteBasketClear(): void {
    this.basket = [];
  }

  /**
   * Метод создания каталога
   * @param products - Массив продуктов для каталога
   */
  setCatalog(products: ProductItem[]): void {
    this.catalog = products.map(item => new ProductItem({ ...item, picked: false }, this.events));
    this.emitChanges('catalog:changed', { catalog: this.catalog });
  }

  /**
   * Метод для сброса выбора продуктов в каталоге
   */
  resetPicked(): void {
    for (const product of this.catalog) {
      product.picked = false;
    }
  }

  /**
   * Метод валидации заказа
   * @returns Возвращает true, если заказ валиден
   */
  validateOrder(): boolean {
    const errors: FormErrors = {};
    if (!this.order.address) errors.address = 'Необходимо указать адрес';
    if (!this.order.payment) errors.payment = 'Необходимо указать способ оплаты';
    this.formErrors = errors;
    this.events.emit('orderFormErrors:change', this.formErrors);
    return !Object.keys(errors).length;
  }

  /**
   * Метод валидации контактов
   * @returns Возвращает true, если контактная информация валидна
   */
  validateContacts(): boolean {
    const errors: FormErrors = {};
    if (!this.order.email) errors.email = 'Необходимо указать email';
    if (!this.order.phone) errors.phone = 'Необходимо указать телефон';
    this.formErrors = errors;
    this.events.emit('contactsFormErrors:change', this.formErrors);
    return !Object.keys(errors).length;
  }

  /**
   * Метод для заполнения всех полей и валидации формы
   * @param field - Поле формы заказа
   * @param value - Значение поля формы заказа
   */
  validation(field: keyof IOrderForm, value: string): void {
    this.order[field] = value;
    if (this.validateContacts()) this.events.emit('contacts:ready', this.order);
    if (this.validateOrder()) this.events.emit('order:ready', this.order);
  }

  /**
   * Метод полной очистки заказа после покупки товара
   */
  orderReset(): void {
    this.order = {
      items: [],
      total: null,
      address: '',
      email: '',
      phone: '',
      payment: '',
    };
  }
}

## View
//Базовый компонент
export abstract class Component<T> {
    protected constructor(protected readonly container: HTMLElement) {
        // Учитывайте что код в конструкторе исполняется ДО всех объявлений в дочернем классе
    }

    // Инструментарий для работы с DOM в дочерних компонентах

    // Переключить класс
    toggleClass(element: HTMLElement, className: string, force?: boolean) {
        element.classList.toggle(className, force);
    }

    // Установить текстовое содержимое
    protected setText(element: HTMLElement, value: unknown) {
        if (element) {
            element.textContent = String(value);
        }
    }

    // Сменить статус блокировки
    setDisabled(element: HTMLElement, state: boolean) {
        if (element) {
            if (state) element.setAttribute('disabled', 'disabled');
            else element.removeAttribute('disabled');
        }
    }

    // Скрыть
    protected setHidden(element: HTMLElement) {
        element.style.display = 'none';
    }

    // Показать
    protected setVisible(element: HTMLElement) {
        element.style.removeProperty('display');
    }

    // Установить изображение с алтернативным текстом
    protected setImage(element: HTMLImageElement, src: string, alt?: string) {
        if (element) {
            element.src = src;
            if (alt) {
                element.alt = alt;
            }
        }
    }

    // Вернуть корневой DOM-элемент
    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }
}

//Класс корзины 
export class Basket extends Component<IBasketView> {
  // Ссылки на внутренние элементы
  protected _items: HTMLElement;
  protected _total: HTMLElement;
  protected _button: HTMLButtonElement;

  /**
   * Конструктор принимает контейнер и обработчик событий
   * @param container - Родительский элемент контейнера корзины
   * @param events - Обработчик событий для взаимодействия с корзиной
   */
  constructor(container: HTMLElement, protected events: IEvents) {}

  /**
   * Сеттер списка товаров
   * @param items - Массив элементов товаров для отображения в корзине
   */
  set items(items: HTMLElement[]) {
    this._items.replaceChildren(...items);
    this._button.disabled = items.length <= 0;
  }

  /**
   * Сеттер общей суммы
   * @param total - Общая стоимость товаров в корзине
   */
  set total(total: number) {
    this.setText(this._total, total + ' синапсов');
  }

  /**
   * Метод блокирующий кнопку 
   */
  disableButton(): void {
    this._button.disabled = true;
  }

  /**
   * Метод для обновления индексов
   */
  indexReset(): void {
    Array.from(this._items.children).forEach((item, index) => {
      item.querySelector('.basket__item-index')!.textContent = (index + 1).toString();
    });
  }
}

//Класс карточки
export class Card extends Component<ICard> {
  // Ссылки на внутренние элементы карточки
  protected _title: HTMLElement;
  protected _image: HTMLImageElement;
  protected _category: HTMLElement;
  protected _price: HTMLElement;
  protected _button: HTMLButtonElement;

  /**
   * Конструктор принимает имя блока, родительский контейнер
   * и объект с колбэк функциями
   * @param blockName - Имя блока карточки
   * @param container - Родительский контейнер карточки
   * @param actions - Объект с функциями-колбэками для действий
   */
  constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions) {}

  /**
   * Сеттер id
   */
  set id(value: string) {
    this.container.dataset.id = value;
  }
  /**
   * Геттер id
   */
  get id(): string {
    return this.container.dataset.id || '';
  }

  /**
   * Сеттер названия
   */
  set title(value: string) {
    this.setText(this._title, value);
  }
    /**
   * Геттер названия
   */
  get title(): string {
    return this._title.textContent || '';
  }

  /**
   * Сеттер картинки
   */
  set image(value: string) {
    this._image.src = CDN_URL + value;
  }

  /**
   * Сеттер определения выбора товара
   */
  set picked(value: boolean) {
    if (!this._button.disabled) {
      this._button.disabled = value;
    }
  }

  /**
   * Сеттер цены
   */
  set price(value: number | null) {
    if (value !== null) {
      this.setText(this._price, formatNumberWithSpaces(value) + ' синапсов');
    } else {
      this.setText(this._price, 'Бесценно');
    }
    if (!value && this._button) {
      this._button.disabled = true;
    }
  }

  /**
   * Сеттер категории
   */
  set category(value: CategoryOptions) {
    this.setText(this._category, value);
    this._category.classList.add(categoryChoice[value]);
  }
}

//Класс контактов
export class Contacts extends Form<IContacts> {
  
   /**
   * Конструктор принимает контейнер и обработчик событий
   * @param container - Родительский элемент контейнера корзины
   * @param events - Обработчик событий для взаимодействия с корзиной
   */
  constructor(container: HTMLFormElement, events: IEvents);
}

//Класс заказа
export class Order extends Form<IOrder> {
  // Ссылки на внутренние элементы
  protected _online: HTMLButtonElement;
  protected _uponReceipt: HTMLButtonElement;

  /**
   * Конструктор принимает имя блока, родительский элемент и обработчик событий
   * @param blockName - Имя блока
   * @param container - Родительский элемент контейнера формы заказа
   * @param events - Обработчик событий для взаимодействия с формой заказа
   */
  constructor(protected blockName: string, container: HTMLFormElement, protected events: IEvents) {}

  /**
   * Метод, отключающий подсвечивание кнопок
   */
    disableButtons(): void {
        this._uponReceipt.classList.remove('button_active');
        this._online.classList.remove('button_active');
    }
 }


//Класс страницы
export class Page extends Component<IPage> {
  // Ссылки на внутренние элементы
  protected _counter: HTMLElement;
  protected _store: HTMLElement;
  protected _wrapper: HTMLElement;
  protected _basket: HTMLElement;

   /**
   * Конструктор принимает имя блока, родительский элемент и обработчик событий
   * @param container - Родительский элемент контейнера формы заказа
   * @param events - Обработчик событий для взаимодействия с формой заказа
   */
  constructor(container: HTMLElement, protected events: IEvents) {}

  // Сеттер считающий товары
  set counter(value: number);

  // Сеттер каталога карточек
  set catalog(items: HTMLElement[]);

  // Сеттер для блокировки прокрутки страницы
  set locked(value: boolean);
}

//Класс успешной покупки
export class Success extends Component<ISuccess> {
// Ссылки на внутренние элементы
  protected _button: HTMLButtonElement;
  protected _description: HTMLElement;

   /**
   * Конструктор принимает имя блока, родительский контейнер
   * и объект с колбэк функциями
   * @param blockName - Имя блока карточки
   * @param container - Родительский контейнер карточки
   * @param actions - Объект с функциями-колбэками для действий
   */
  constructor(protected blockName: string, container: HTMLElement, actions?: ISuccessActions) {}

    //Сеттер выведения количества списанный синапсов
    set description(value: number) {
        this._description.textContent = 'Списано ' + formatNumberWithSpaces(value) + ' синапсов'
    }
}

## События
//Открывает модальное окно способа оплаты
'order:submit'
//Открывает модальное окно контактов
'contacts:submit'
//Валидирует форму
'input:change'
//Добавляет товар в корзину
card:toBasket'
//Открывает корзину
'basket:open'
//Удаляет товар из корзины
'basket:remove'
//Открывает модальное окно заказа
'basket:order'
//Изменение списка товаров
'catalog':changed;
//Открывает описание товара при клике на товар
'card:open'
