# SkyGym API

Backend REST API for the SkyGym platform.

The API handles authentication, user management, memberships, and integration with external services such as email and payments.

## Tech Stack

- NestJS
- TypeScript
- TypeORM
- MySQL
- JWT Authentication
- Swagger
- Nodemailer

## Features

Current and planned functionality:

- User registration
- Login and authentication
- Email verification
- Membership management
- Admin functionality
- Payment integration

## Installation

Install dependencies:

## Environment Variables

Example `.env` configuration:
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_DATABASE=skygym

JWT_SECRET=your_secret

MAIL_HOST=smtp.example.com
MAIL_USER=user
MAIL_PASSWORD=password

## Production Deployment

Production API:

https://api.skygym.lt

Deployment:

- Node.js application running on shared hosting using a Node.js vhost.
