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
## Основные интерфейсы и типы 

  ### index.ts

  // Ответ сервера
  interface ApiResponse {
      // Товары
      items: IProductItem[];
  }

  ### Form.ts

  // Тип ошибок формы
  type FormErrors = Partial<Record<keyof IOrderForm, string>>;

  ### AppData.ts

  // Интерфейс товара в магазине
  interface IProductItem {
      // Добавлен товар в корзину или нет
      picked: boolean;
      // id товара
      id: string;
      // Описание товара
      description: string;
      // Изображение товара
      image: string;
      // Название товара
      title: string;
      // Категория товара
      category: string;
      // Цена товара
      price: number;
  }
  
  // Интерфейс состояния приложения
  interface IAppState {

  // Массив товаров в каталоге
  catalog: ProductItem[];

  // Массив товаров в корзине
  basket: ProductItem[];

  // Объект заказа
  order: IOrder;

  // Объект ошибок форм
  formErrors: FormErrors;

  // Возвращает количество товаров в корзине
  basketItemsLength(): number;

  // Добавляет id товаров в заказ
  setItems(): void;

  // Считает общую сумму заказа
  totalPrice(): number;

  // Добавляет новый продукт в корзину
  appendBasket(item: ProductItem): void;
  
  // Удаляет продукт из корзины
  removeBasket(id: string): void;

  // Полностью очищает корзину
  absoluteBasketClear(): void;

  // Создает каталог товаров из товаров
  setCatalog(products: ProductItem[]): void;

  // Сбрасывает выбранные продукты в каталоге товаров
  resetPicked(): void;

  // Валидирует заказ
  validateOrder(): boolean;

  // Валидирует контакты
  validateContacts(): boolean;

  // Валидирует все формы
  validation(field: keyof IOrderForm, value: string): void;

  // Очищает заказ после покупки
  orderReset(): void;

  }

  ### Basket.ts

  // Интерфейс корзины товаров
  interface IBasketView {
      // Массив товаров
      items: HTMLElement[];
      //Сумма стоимости товаров
      total: number;
  }

  // Интерфейс товара в корзине
  interface IBasketItem extends IProductItem {
      // id товара
      id: string;
      // Индекс товара
      index: number;
  }
  
  ### Card.ts

  // Интерфейс карточки на главной странице
  interface ICard {
      // Добавлен товар в корзину или нет
      picked: boolean;
      // id товара
      id: string;
      // Описание товара
      description: string;
      // Изображение товара
      image: string;
      // Название товара
      title: string;
      // Категория товара
      category: string;
      // Цена товара
      price: number;
  }

  ### Contacts.ts

  // Интерфейс окна контактов 
  interface IContacts {
      // Почта
      email: string;
      // Телефон
      phone: string;
  }

  ### Order.ts

  // Интерфейс заказа 
  interface IOrder {
      // Массив товаров
      items: string[];
      // Сумма стоимости товаров
      total: number;
      // Способ оплаты
      payment: string;
      // Адрес 
      address: string;
      // Почта
      email: string;
      // Телефон
      phone:string;
  }

  // Интерфейс формы заказа
  interface IOrderForm {
      // Способ оплаты
      payment: string;
      // Адрес
      address: string;
      // Почта
      email: string;
      // Телефон
      phone: string;
  }

  // Интерфейс оплаты заказа
  interface IOrderPayment {
      // Способ оплаты
      payment: string;
      // Адрес
      address: string;
  }


  ### Page.ts

  // Интерфейс главной страницы
  interface IPage {
      // Счетчик товара корзины
      counter: number;
      // Каталог товаров 
      catalog: HTMLElement[];
      // Блокировщик прокрутки страницы
      locked: boolean;
  }

  // Тип категории карточки
  type CategoryOptions = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

  // Тип ключа в категории карточки
  type CategoryChoice = {
      [key in CategoryOptions]: string;
  };

  ### Success.ts
  
  // Интерфейс успешной оплаты
  interface ISuccess {
      // Описане успешной оплаты
      description: number;
  }


## Model

### Класс Model, класс базовой модели.
  Методы:

  // Сообщает всем что модель поменялась
  emitChanges(event: string, payload?: object);

### Класс AppState, класс состояния приложения.
  Свойства:

  // Массив товаров в каталоге
  catalog: ProductItem[];

  // Массив товаров в корзине
  basket: ProductItem[];

  // Объект заказа
  order: IOrder;

  // Объект ошибок форм
  formErrors: FormErrors;

  Методы:

  // Возвращает количество товаров в корзине
  basketItemsLength(): number;

  // Добавляет id товаров в заказ
  setItems(): void;

  // Считает общую сумму заказа
  totalPrice(): number;

  // Добавляет новый продукт в корзину
  appendBasket(item: ProductItem): void;
  
  // Удаляет продукт из корзины
  removeBasket(id: string): void;

  // Полностью очищает корзину
  absoluteBasketClear(): void;

  // Создает каталог товаров из товаров
  setCatalog(products: ProductItem[]): void;

  // Сбрасывает выбранные продукты в каталоге товаров
  resetPicked(): void;

  // Валидирует заказ
  validateOrder(): boolean;

  // Валидирует контакты
  validateContacts(): boolean;

  // Валидирует все формы
  validation(field: keyof IOrderForm, value: string): void;

  // Очищает заказ после покупки
  orderReset(): void;

## View

### Класс Component, класс базового компонента.
  Методы:

  // Переключает класс
  toggleClass(element: HTMLElement, className: string, force?: boolean);

  // Устанавливает текстовое содержимое
  protected setText(element: HTMLElement, value: unknown);

  // Меняет статус блокировки 
  setDisabled(element: HTMLElement, state: boolean);

  // Скрывает элемент
  protected setHidden(element: HTMLElement);

  // Показывает элемент
  protected setVisible(element: HTMLElement);

  // Устанавливает изображение с алтернативным текстом
  protected setImage(element: HTMLImageElement, src: string, alt?: string);
  
  // Возвращает корневой DOM-элемент
  render(data?: Partial<T>): HTMLElement;

### Класс Basket, класс корзины товаров.

  Свойства:

  // Список товаров
  protected _items: HTMLElement;

  // Сумма всех товаров
  protected _total: HTMLElement;

  // Кнопка "Оформить"
  protected _button: HTMLButtonElement;

  Методы:

  // Устанавливает список товаров
  set items(items: HTMLElement[]);
  
  // Устанавливает сумму всех товаров
  set total(total: number);

  // Блокирует кнопку "Оформить"
  disableButton(): void;

  // Обновляет индексы товаров
  indexReset(): void;

### Класс BasketItem, класс товара в корзине товаров.

  Свойства:
    
  // Индекс товара
  protected _index: HTMLElement;

  // Название товара
  protected _title: HTMLElement;

  // Цена товара
  protected _price: HTMLElement;

  // Кнопка "Корзина" товара
  protected _button: HTMLButtonElement;

  Методы:

  // Устанавливает индекс товару
  set index(value: number);

  // Устанавливает название товару
  set title(value: string);

  // Устанавливает цену товару
  set price(value: number)
 
### Класс Card, класс товара.

  Свойства:

  // Название товара
  protected _title: HTMLElement;

  // Изображение товара
  protected _image: HTMLImageElement;

  // Категория товара
  protected _category: HTMLElement;

  // Цена товара
  protected _price: HTMLElement;

  // Кнопка товара
  protected _button: HTMLButtonElement;

  Методы:

  // Устанавливает id товара
  set id(value: string);

  // Выводит id товара
  get id(): string;

  // Устанавливает название товара
  set title(value: string);

  // Выводит название товара
  get title(): string;

  // Устанавливает изображение товара
  set image(value: string);

  // Устанавливает определение выбора товара
  set picked(value: boolean);

  // Устанавливает цену товара
  set price(value: number | null);

  // Устанавливает категорию товара
  set category(value: CategoryOptions);

### Класс CatalogItem, класс одного товара.

   * Конструктор принимает контейнер и объект с колбэк функциями
   * container - Родительский элемент контейнера корзины
   * actions - Объект с колбэк функциями


  constructor(container: HTMLElement, actions?: ICardActions) {
      super('card', container, actions);
  }

### Класс CatalogItemPreview, класс превью товара.

  Свойства:

  // Описание товара
  protected _description: HTMLElement;

  Методы:
  
  // Устанавливает описание товара
  set description(value: string);

### Класс Contacts, класс контактов.
  
   * Конструктор принимает контейнер и обработчик событий
   * container - Родительский элемент контейнера корзины
   * events - Обработчик событий для взаимодействия с корзиной

    constructor(container: HTMLFormElement,events: IEvents) {
    super(container, events);
    }

### Класс Order, класс заказа.

  Свойства:
  
  // Кнопка оплаты "Онлайн"
  protected _online: HTMLButtonElement;

  // Кнопка оплаты "При получении"
  protected _uponReceipt: HTMLButtonElement;

  Методы:

  // Отключает подсвечивание кнопок оплаты
  disableButtons(): void;


### Класс Page, класс страницы.

  Свойства: 
  
  // Счетчик товаров корзины
  protected _counter: HTMLElement;

  // Каталог товаров
  protected _catalog: HTMLElement;

  // Обёртка страницы
  protected _wrapper: HTMLElement;

  // Корзина товаров
  protected _basket: HTMLElement;


  Методы:

  // Устанавливает количество товаров корзины
  set counter(value: number);

  // Устанавливает товары в каталог товаров
  set catalog(items: HTMLElement[]);

  // Устанавливает блокировку прокрутки страницы
  set locked(value: boolean);


### Класс Success, класс успешной покупки.

  Свойства:

  // Кнопка "За новыми покупками!"
  protected _button: HTMLButtonElement;

  // Описание покупки
  protected _description: HTMLElement;

  Методы:

  // Выводит количество списанных синапсов
  set description(value: number);

## Presenter

### Класс Api, класс взаимодействия с сервером.

  Свойства:

  // Url Api
  readonly baseUrl: string;

  // Опции
  protected options: RequestInit;

  Методы:

  // Обрабатывает запрос и возвращает промис
  protected handleResponse(response: Response): Promise<object>;

  // Делает get запрос
  get(uri: string);

  // Делает post запрос
  post(uri: string, data: object, method: ApiPostMethods = 'POST');

### Класс EventEmitter, класс обрабатывающий события.
  
  Свойства: 

  // Объект Map, событие и подписчик
  _events: Map<EventName, Set<Subscriber>>;

  Методы:

  // Устанавливает обработчик на событие
  on<T extends object>(eventName: EventName, callback: (event: T) => void);

  // Снимает обработчик с события
  off(eventName: EventName, callback: Subscriber);

  // Инициирует событие с данными
  emit<T extends object>(eventName: string, data?: T);

  // Слушает все события 
  onAll(callback: (event: EmitterEvent) => void);

  // Сбрасывает все обработчики
  offAll();

  // Делает коллбек триггер, генерирующий событие при вызове
  trigger<T extends object>(eventName: string, context?: Partial<T>);


## События

// Вызывается при нажатии на кнопку "Оформить" в окне корзины, переводит на окно оплаты заказа.
'basket:order'

// Вызывается при нажатии на кнопку "Далее" в окне оплаты заказа, переводит на окно контактов.
'order:submit'

// Вызывается при нажатии на кнопку "Оплатить" в окне контактов, переводит на окно успешной оплаты.
'contacts:submit'

// Вызывается при успешном ответе сервера после оплаты товара, переводит на окно успешной оплаты.
'order:success'

// Вызывается при нажатии на кнопку "В корзину" в окне превью карточки, добавляет товар в корзину.
card:toBasket'

// Вызывается при нажатии на кнопку "Корзина" на главной странице, открывает корзину.
'basket:open'

// Вызывается при нажатии на кнопку "Корзина" у карточки в окне корзины, удаляет товар из корзины.
'basket:remove'

// Вызывается при нажатии изменении каталога товаров на главной странице, изменяет товары на главной странице.
'catalog':changed;

// Вызывается при нажатии на карточку на главной странице, переводит на окно описание карточки.
'card:open'

// Вызывается при заполнении формы, проводит валдицаию формы.
'input:change'

// Вызывается при вводе данных в форме в окне оплаты заказа.
'orderFormErrors:change'

// Вызывается при вводе данных в форме в окне контактов. 
'contactsFormErrors:change'

// Вызывается при закрытии модального окна.
'modal:close'
