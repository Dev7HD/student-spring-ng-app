# Student Payment Application

Welcome to the Student Payment Application documentation. This application allows you to manage students and their payments efficiently. Below, you'll find detailed information on how to navigate and utilize the various features offered by the application.

## Table of Contents

- [Features Overview](#features-overview)
- [Backend Documentation](#backend-documentation)
  - [Endpoints](#endpoints)
  - [Entities](#entities)
  - [Repositories](#repositories)
  - [Services](#services)
  - [Web Controllers](#web-controllers)
- [Frontend Documentation](#frontend-documentation)
  - [Components](#components)
  - [Guards](#guards)
  - [Angular Services](#angular-services)
  - [Interceptors](#interceptors)
  - [Routing](#routing)
  - [Dependencies](#dependencies)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)

## Features Overview

- Visualize list of students and their payments.
- Import students list and payments list.
- Check student information by student code.
- Get students list by their study program.
- Get payments by status or type.
- Get payment by ID.
- Get student payment by student code.
- Update payment status.
- Add new student payment.

## Backend Documentation

### Endpoints

#### **Check the endpoints using Swagger-UI**

- **GET /students/all**: Retrieve all students.
- **GET /students/{programId}**: Retrieve students by study program.
- **GET /students/{code}**: Retrieve student information by student code.
- **GET /payments/all**: Retrieve all payments.
- **GET /payments/status/{status}**: Retrieve payments by status.
- **GET /payments/type/{type}**: Retrieve payments by type.
- **GET /payment/{id}**: Retrieve payment by ID.
- **GET /payments/student/{code}**: Retrieve payments by student code.
- **PUT /payments/{id}**: Update payment status.
- **POST /payments/new**: Add new student payment.

### Entities

- **Student**: Represents a student entity with attributes like ID, first name, last name, email, code, and program ID.
- **Payment**: Represents a payment entity with attributes like ID, date, amount, type, status, and receipt.

### Repositories

- **StudentRepository**: Repository for accessing student data.
- **PaymentRepository**: Repository for accessing payment data.

### Angular Services

- **PaymentService**: Service for handling payment-related operations.

### Web Controllers

- **PaymentRestController**: REST controller for handling payment-related requests.
- **StudentRestController**: REST controller for handling student-related requests.

## Frontend Documentation

### Components

- **Admin Template Component**: Provides the main layout for the admin panel.
- **Login Component**: Allows users to log in to the application.
- **Dashboard Component**: Displays dashboard.
- **Home Component**: Displays home page.
- **Loading Students Component**: Allows admin to import students list.
- **Loading Payments Component**: Allows admin to import payments list.
- **Loading Toast Component**: Provides a popup loading toast.
- **Payments Component**: Displays a list of payments.
- **Students Component**: Displays a list of students.
- **Profile Component**: Displays a user profile.

### Guards

- **Auth Guard**: Prevents unauthorized access to certain routes.
- **Authorization Guard**: Restricts access based on user roles.

### Services

- **Authentication Service**: Manages user authentication.
- **Toast Service**: Displays toast notifications.

### Interceptors

- **App Interceptor**: Intercepts HTTP requests and responses.

### Routing

- Defines application routes and guards.

### Dependencies

- Angular Material: UI components library.
- RxJS: Reactive programming library.
- Angular Forms: Form handling library.
- HttpClientModule: HTTP client module.

## Getting Started

To get started with the application, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the backend directory and run the Spring Boot application.
3. Navigate to the frontend directory and install Angular dependencies.
4. Start the Angular development server.

## Usage

Once the application is running, you can:

- Log in with your credentials.
- Navigate through different sections to visualize student and payment information.
- Import student and payment lists.
- Check student details by code.
- Update payment status.
- Add new student payments.

## Contributing

Contributions to the Student Payment Application are welcome! Feel free to submit pull requests or report any issues you encounter.
