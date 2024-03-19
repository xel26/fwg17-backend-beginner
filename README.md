# COFFEE SHOP WEB BACKEND PROJECT

Welcome to the Coffee Shop Backend Web Project! This project harnesses the capabilities of Node.js and Express.js to develop a robust and efficient backend. It is structured with a modular architecture, ensuring seamless performance and scalability


Built using

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![Google Chrome](https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

## Getting Started

To run the project locally, follow these simple steps:

1. Clone this repository
```sh
git clone https://github.com/](https://github.com/xel26/fwg17-backend-beginner.git
cd fwg17-backend-beginner
```

2. Open in VSCode
```sh
code .
```

3. install all the dependencies
```
npm install
```

4. run the project
```
npm run dev
```

## Technologies Used
- ExpressJS: This project harnesses the power of ExpressJS, a fast and minimalist web framework for Node.js, to create robust and scalable server-side applications.
- Node.js: This project is built on Node.js, leveraging its non-blocking, event-driven architecture for scalable and high-performance server-side applications
  
## Customer Router
### Public Router
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/products` | `GET` | List All Products |
| `/product/:id` | `GET` | Detail Product |
| `/testimonial` | `GET` | List All Testimonial |


### Auth Router
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/login` | `POST` | Access Existing Account |
| `/register` | `POST` | Create New Account |
| `/forgot-password` | `POST` | Create New Password |


### Private Router
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/profile` | `GET` | Profile Information |
| `/profile` | `PATCH` | Update Profile Information |
| `/history-order` | `GET` | List All History Order |
| `/history-order/:id` | `GET` | Detail History Order |
| `/history-order/products?orderId=int` | `GET` | List Of Products Purchased In One Order |
| `/checkout` | `POST` | create An Order |


## Admin Router
### users Router
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/users` | `GET` | List All Users |
| `/users/:id` | `GET` | Detail User |
| `/users` | `POST` | Create New Users |
| `/users/:id` | `PATCH` | Update One User |
| `/users/:id` | `DELETE` | Delete One User |


### Products Router
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/products` | `GET` | List All Products |
| `/products/:id` | `GET` | Detail Product |
| `/products` | `POST` | Create New Product |
| `/products/:id` | `PATCH` | Update One product |
| `/products/:id` | `DELETE` | Delete One product |


### Orders Router
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/orders` | `GET` | List All Orders |
| `/orders/:id` | `GET` | Detail Order |
| `/orders` | `POST` | Create New Order |
| `/orders/:id` | `PATCH` | Update One Order |
| `/orders/:id` | `DELETE` | Delete One Order |


### Categories Router
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/categories` | `GET` | List All Categories |
| `/categories/:id` | `GET` | Detail Category |
| `/categories` | `POST` | Create New Category |
| `/categories/:id` | `PATCH` | Update One Category |
| `/categories/:id` | `DELETE` | Delete One Category |


### Messages Router
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/messages` | `GET` | List All Messages |
| `/messages/:id` | `GET` | Detail Messag |
| `/messages` | `POST` | Create New Messag |
| `/messages/:id` | `PATCH` | Update One Messag |
| `/messages/:id` | `DELETE` | Delete One Messag |


### Order-Details Router
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/order-details` | `GET` | List All Order-Details |
| `/order-details/:id` | `GET` | Detail Of Order-Details |
| `/order-details` | `POST` | Create New Order-Details |
| `/order-details/:id` | `PATCH` | Update One Order-Details |
| `/order-details/:id` | `DELETE` | Delete One Order-Details |


### Product-Categories Router
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/product-categories` | `GET` | List All Product-Categories |
| `/product-categories/:id` | `GET` | Detail Product-Categories |
| `/product-categories` | `POST` | Create New Product-Categories |
| `/product-categories/:id` | `PATCH` | Update One Product-Categories |
| `/product-categories/:id` | `DELETE` | Delete One Product-Categories |


### Product-Ratings Router
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/product-ratings` | `GET` | List All Product-Ratings |
| `/product-ratings/:id` | `GET` | Detail Product-Ratings |
| `/product-ratings` | `POST` | Create New Product-Ratings |
| `/product-ratings/:id` | `PATCH` | Update One Product-Ratings |
| `/product-ratings/:id` | `DELETE` | Delete One Product-Ratings |


### Size Router
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/size` | `GET` | List All Size |
| `/size/:id` | `GET` | Detail Size |
| `/size` | `POST` | Create New Size |
| `/size/:id` | `PATCH` | Update One Size |
| `/size/:id` | `DELETE` | Delete One Size |


### Variant Router
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/variant` | `GET` | List All Variant |
| `/variant/:id` | `GET` | Detail Variant |
| `/variant` | `POST` | Create New Variant |
| `/variant/:id` | `PATCH` | Update One Variant |
| `/variant/:id` | `DELETE` | Delete One Variant |


### Promo Router
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/promo` | `GET` | List All Promo |
| `/promo/:id` | `GET` | Detail Promo |
| `/promo` | `POST` | Create New Promo |
| `/promo/:id` | `PATCH` | Update One Promo |
| `/promo/:id` | `DELETE` | Delete One Promo |


### Tags Router
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/tags` | `GET` | List All Tags |
| `/tags/:id` | `GET` | Detail Tags |
| `/tags` | `POST` | Create New Tags |
| `/tags/:id` | `PATCH` | Update One Tags |
| `/tags/:id` | `DELETE` | Delete One Tags |


### Testimonial Router
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `/testimonial` | `GET` | List All Testimonial |
| `/testimonial/:id` | `GET` | Detail Testimonial |
| `/testimonial` | `POST` | Create New Testimonial |
| `/testimonial/:id` | `PATCH` | Update One Testimonial |
| `/testimonial/:id` | `DELETE` | Delete One Testimonial |


## Contributing

We welcome contributions! If you have ideas for improvements, bug fixes, or new features, please open an issue or submit a pull request.
