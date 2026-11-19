# Urban Couture — Full-Stack Fashion E-Commerce Platform

A full-stack fashion e-commerce application built using the **MERN stack**, enabling customers to browse fashion products, manage shopping carts, place orders, and make secure payments. The platform includes a dedicated administration interface for managing products, monitoring orders, and handling fulfilment workflows.

**Live Application:** https://urban-couture.vercel.app  
**Source Code:** https://github.com/Madhuri36/Urban-Couture


## Overview

Urban Couture provides an end-to-end online shopping experience with separate customer-facing and administrative interfaces.

The application is organized into three main components:

- **Frontend:** Handles customer interactions, product discovery, shopping cart operations, and checkout.
- **Backend:** Provides REST API services, authentication, database operations, order processing, and payment integration.
- **Admin:** Provides administrative functionality for product management, order processing, and shipping operations.

The application uses MongoDB Atlas for persistent data storage and supports both Stripe payments and Cash on Delivery (COD).

## Core Features

### 1. Customer Application

- **Product Discovery:** Browse fashion products and search the available catalogue.
- **Product Details:** View individual product information.
- **Shopping Cart:** Add products and manage cart contents.
- **User Authentication:** Register accounts and securely log in.
- **Order Placement:** Submit orders through the checkout workflow.
- **Order Tracking:** View order information and monitor order status.
- **Payment Options:** Choose between Stripe online payments and Cash on Delivery.

### 2. Administration Dashboard

- **Product Management:** Add and remove products from the catalogue.
- **Order Management:** View incoming orders and manage order records.
- **Order Processing:** Process orders and manage shipping operations.
- **Administrative Interface:** Handle product and order management through a dedicated dashboard.

### 3. Payment Integration

- Stripe integration for online payment processing.
- Cash on Delivery as an alternative payment method.
- Payment options integrated into the order checkout workflow.

---

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JSON Web Tokens (JWT) |
| Payment Gateway | Stripe |
| Deployment | Vercel |

### Backend Technologies

**Node.js and Express.js**

The backend provides the application's REST API layer and handles business logic, including authentication, product operations, order management, and payment-related workflows.

**MongoDB and Mongoose**

MongoDB stores application data, while Mongoose provides the object modelling layer for defining and interacting with database records.

**JWT Authentication**

JSON Web Tokens are used for authentication, allowing protected application functionality to be accessed by authenticated users.

### Frontend Technologies

**React.js**

Provides the component-based interface for product browsing, shopping cart interactions, authentication, and order-related functionality.

**Tailwind CSS**

Provides utility-based styling for the application's user interface.

---

## System Architecture

Urban Couture follows a client-server architecture with independently organized frontend, backend, and administrative components.

```text
                 CUSTOMER
                    |
                    v
             React Frontend
                    |
              HTTP Requests
                    |
                    v
             Express Server
                    |
          +---------+---------+
          |         |         |
          v         v         v
       Auth     Products    Orders
          |         |         |
          +---------+---------+
                    |
                    v
              MongoDB Atlas
                    |
          +---------+---------+
          |                   |
          v                   v
     Stripe Gateway       Admin Panel
       Payments         Product & Order
                         Management
```

**Application Responsibilities**

| Component | Responsibility |
|---|---|
| React Frontend | Customer-facing interface and application interactions |
| Express Backend | API handling and application business logic |
| MongoDB Atlas | Persistent application data |
| JWT | Authentication |
| Stripe | Online payment processing |
| Admin Interface | Product and order administration |

---

## Application Workflows

### Customer Shopping Workflow

1. A customer accesses the product catalogue.
2. Products are browsed and selected.
3. Selected products are added to the shopping cart.
4. The customer proceeds to checkout.
5. A payment method is selected: Stripe or Cash on Delivery.
6. The order is submitted for processing.
7. The customer can subsequently view and track the order.

### Administrative Workflow

1. The administrator accesses the administration interface.
2. Products can be added or removed from the catalogue.
3. Incoming orders can be viewed and processed.
4. Shipping operations can be managed through the dashboard.

---

## Authentication and Security

The application uses JWT-based authentication to manage authenticated access.

Authentication-related responsibilities include:

- User registration and login.
- Token-based authentication.
- Access to protected application functionality.
- Separation of customer-facing and administrative operations.

Sensitive configuration values, including database credentials and payment gateway secrets, should be maintained through environment variables rather than committed to source control.

---

## Payment Processing

Urban Couture supports two payment methods:

**Stripe**

Provides an online payment option integrated into the checkout process.

**Cash on Delivery**

Allows customers to place orders without completing an online payment at checkout.

Both payment options are incorporated into the application's order placement workflow.

---

## Database

The application uses **MongoDB Atlas** as its cloud-hosted database, with Mongoose providing the data modelling and database interaction layer.

The database supports the application's core operations, including:

- User account management.
- Product catalogue management.
- Shopping and order-related data.
- Administrative operations.

---

## Project Structure

The repository is organized into three primary application directories:

```text
Urban-Couture/
│
├── frontend/          # Customer-facing React application
│
├── backend/           # Node.js and Express API
│
├── admin/             # Administrative application
│
├── .gitignore
└── README.md
```

Each component has a separate responsibility, keeping customer interactions, server-side application logic, and administrative functionality organized independently.

---

## Installation and Setup

### Prerequisites

Ensure the following tools are installed:

- Node.js
- npm
- Git
- MongoDB Atlas account
- Stripe account for payment integration

### 1. Clone the Repository

```bash
git clone https://github.com/Madhuri36/Urban-Couture.git

cd Urban-Couture
```

### 2. Install Dependencies

Install dependencies separately for the frontend, backend, and admin applications:

```bash
cd frontend
npm install

cd ../backend
npm install

cd ../admin
npm install
```

### 3. Configure Environment Variables

Create the required `.env` files in the relevant application directories.

Configure the database connection, authentication secrets, payment credentials, and any application-specific configuration required by the source code.

Refer to the backend and frontend configuration files to identify the exact environment variable names.

**Important:** Never commit actual API keys, database credentials, or private secrets to GitHub.

### 4. Start the Applications

Navigate to each application directory and execute its configured development script.

```bash
npm run
```

Use the scripts listed in each component's `package.json` to start the corresponding development server.

---

## Environment Configuration

The application requires external service configuration for database connectivity and payment processing.

| Configuration | Purpose |
|---|---|
| MongoDB connection | Database connectivity |
| JWT secret | Token authentication |
| Stripe credentials | Payment gateway integration |
| API configuration | Frontend-to-backend communication |

Use the exact variable names expected by the application source code when configuring these values.

---

## Deployment

The application is deployed using Vercel, with MongoDB Atlas providing cloud database connectivity.

| Component | Deployment |
|---|---|
| Frontend | Vercel |
| Backend | Vercel |
| Database | MongoDB Atlas |

The deployed application is accessible at:

**https://urban-couture.vercel.app**

---

## Engineering Highlights

Urban Couture demonstrates practical full-stack development through:

- Separation of frontend, backend, and administrative application components.
- REST API development using Node.js and Express.js.
- Database integration using MongoDB and Mongoose.
- JWT-based user authentication.
- Third-party payment gateway integration using Stripe.
- E-commerce workflows covering product discovery, cart operations, checkout, and order management.
- Independent deployment of application components.

---

## Future Improvements

Potential extensions to the application include:

- Product filtering, sorting, and pagination.
- Automated order confirmation notifications.
- Enhanced inventory tracking.
- Product reviews and ratings.
- Payment reconciliation and transaction history.
- Automated backend testing and API documentation.
- Application logging and monitoring.

---

**Built with React.js, Node.js, Express.js, MongoDB, and Stripe.**

## **Preview**
![image](https://github.com/user-attachments/assets/6784909d-6d25-40eb-b5a9-bfae91c4cfd2)
