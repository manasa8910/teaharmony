
# Tea Harmony

#### Tea Harmony is an e-commerce platform dedicated to offering a curated selection of premium teas and exquisite teaware to tea enthusiasts worldwide. Our platform provides a seamless shopping experience, allowing customers to explore a diverse range of teas, from traditional blends to rare finds, alongside an array of beautifully crafted teapots, cups, and accessories.

[**Hosted Link**](https://teaharmony-4zco.vercel.app/)


## Features

- Extensive Tea Collection
- Teaware Selection
- Secure Payment and Checkout
- interactive immersive 3D environment
- Animated Product Showcases
- Encrypted Secure User Authentication


## Technology Used

- **Node.js:** Server-side JavaScript runtime.
- **Express.js:** Web application framework for Node.js.
- **Razorpay API:** Payment gateway integration for processing online transactions.
- **jsonwebtoken:** Library for generating JSON Web Tokens (JWT) used for authentication.
- **mongoose:** MongoDB object modeling tool designed to work in an asynchronous environment.
- **React:** JavaScript library for building user interfaces.
- **GSAP:** Animation library for creating engaging and interactive animations.
- **Three.js:** JavaScript library for creating and displaying 3D computer graphics in a web browser.
- **react-three/fiber:** React renderer for Three.js.
- **split-text:** Library for splitting text into characters, words, or lines for animation purposes.
- **vanilla-tilt:** JavaScript library for creating tilt effects on elements.
- **cors:** Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.js.
- **tailwindcss:** Utility-first CSS framework for rapidly building custom designs.
- **p5.js:** JavaScript library for creative coding and interactive graphics.

## UI

Home 

![image](https://github.com/manasa8910/reactProjects/assets/67619299/210cf56a-2281-48b2-b615-f850b5b37b52)

![image](https://github.com/manasa8910/reactProjects/assets/67619299/24ae8e07-2647-4113-b482-bea994f14318)

![image](https://github.com/manasa8910/reactProjects/assets/67619299/16ffa877-0bbc-4897-bc23-c65fb7d9c20e)

![image](https://github.com/manasa8910/reactProjects/assets/67619299/c79db84c-4f94-4d3b-8d01-609943283b2c)

Products

![prod_dis](https://github.com/manasa8910/reactProjects/assets/67619299/4a0e191c-9c4b-46fb-bf5a-4fdf4dc570c4)

Display Product

![image](https://github.com/manasa8910/reactProjects/assets/67619299/0b046fe2-f33d-4e1c-98b4-1cf754072aa6)

About Us

![image](https://github.com/manasa8910/reactProjects/assets/67619299/fd3d2a1d-34ca-4318-8a3b-da15aff6c524)

Navigation

![image](https://github.com/manasa8910/reactProjects2/assets/67619299/43a76f2b-2830-40cf-905f-382f0aee82fc)

Cart
![image](https://github.com/manasa8910/reactProjects/assets/67619299/75e4b5b2-5c68-4404-ad27-e65837d9f5a2)

payment gateway 
![image](https://github.com/manasa8910/reactProjects/assets/67619299/e78ec0db-ff8b-46cd-8b00-53585a3e76ea)

order Placed
![image](https://github.com/manasa8910/reactProjects/assets/67619299/7f02504b-12e3-499a-866b-31a89e05f3e7)

Orders
![image](https://github.com/manasa8910/reactProjects/assets/67619299/0df15679-fd58-4b10-93ad-7a65c32e00a7)

Gallery
![image](https://github.com/manasa8910/reactProjects/assets/67619299/ebeb686b-4fb0-40a1-8bdb-a47b62764c25)



## Installation Guide

### Prerequisites

- Node.js installed on your machine. You can download it [here](https://nodejs.org/).

### Steps

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/manasa8910/teaharmony
    ```

2. **Navigate to Project Directory:**

    ```bash
    cd backend
    ```

3. **Install Dependencies:**

    ```bash
    npm install
    ```
4. **Create a .env file in the backend directory and add the following configurations**

```bash
PORT=3000   # Port on which backend server will run
MONGODB_URI=<your_mongodb_uri>   # MongoDB connection URI (e.g., mongodb://localhost:27017/your_database_name)
JWT_SECRET=<your_jwt_secret>   # Secret key for JWT token generation
```
5. **Start the backend server:**

    ```bash
    node index.js
    ```
6. **Similarly install Dependencies for frontend in new terminal and run:**

    ```bash
    cd frontend
    npm install
    npm run dev
    ```


7. **Access the Application:**

    Open your web browser and visit [http://localhost:5137](http://localhost:5137) to access the application.
