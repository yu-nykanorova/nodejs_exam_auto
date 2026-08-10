# AutoDeal - backend (nodejs/express exam AutoRia Clone)

A learning backend project developed as a backend control task.

The project implements user roles and permissions, car advertisements, brands and models, currency conversion, automatic profanity checking, advertisement statistics, premium accounts, authentication, email notifications, and some other platform functionality.

The project is built with Node.js and Express.js and uses MongoDB Atlas as a cloud database. The application is containerized with Docker and can be tested completely through Postman.

## Features

### Authentication, authorization
Users registration, login, logout, access and refresh tokens authentication, forgot password flow, changing password, role-based + permission-based authorization, user status management.
### User roles
BUYER, SELLER, ADMIN, MANAGER
### Account types
BASIC and PREMIUM seller account types
### Advertisements
- Creating, editing, deleting advertisements.
- Selecting car brand and model.
- Specifying prices in USD, EUR, UAH, using PrivatBank API for currencies exchange rates.
- Recalculating of all advertisements prices once a day.
- Uploading, deleting advertisement photo using AWS S3 service.
- For PREMIUM sellers - getting their own advertisement's statistics (views count, average prices).
- Profanity moderation - automatically check advertisement for profanity during creating/updating.
### Brands and models
Brands and models are stored separately. There are endpoints for retrieving available brands and models. If the required brand or model does not exist, a seller can submit a request to the administration. Brand and model requests can then be reviewed and processed by an authorized Manager/Admin.
### Email notifications
The application uses Nodemailer for email notifications, including moderation-related notifications and password recovery functionality.
### Scheduled tasks (cron library)
- Updating advertisement prices according to current exchange rates.
- Removing expired/deleted data where applicable.
- Cleaning old hashes.

## Technologies
- Node.js
- Express.js
- TypeScript
- MongoDB
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt
- Joi
- Nodemailer
- Cron
- Docker, Docker Compose
- AWS SDK
- Postman

## Project structure
The backend source code is located in the backend directory.    
The application structure includes separate controllers, services, repositories, validators, middleware, models and routers to make the system easier to extend and modify.

## Getting started

1) Clone the repository
```bash
git clone git@github.com:yu-nykanorova/nodejs_exam_auto.git
cd nodejs_exam_auto
```
2) Create the .env file  
 
The repository contains .env.example.  
Create your local .env file in the root directory of the project.  
Copy the variables from .env.example and fill them with the values provided at the link given below.  
https://drive.google.com/file/d/19OqGheTaZp8DlNRocFqAHOf-OLYKA-el/view?usp=sharing

3) Run with Docker

Run your Docker Desktop.  
From the project root directory execute:
```bash
docker compose up --build
```
Docker will:
- build the Node.js application image;
- install backend dependencies;
- start the backend container;
- pass environment variables from .env to the container;
- connect the application to cloud MongoDB Atlas;
- start the Express server on port 3000.

Expected output:

Connecting to DB...  
Database available!!!  
Server listening on port 3000

The API will then be available at:

http://localhost:3000

To stop the application:
```bash
docker compose down
```

4) Run without Docker  

For development/testing without Docker:
```bash
cd backend
npm install
npm run start
```

5) Administrator account  

For the provided test database, the administrator account has already been created.  
Use the following credentials for Postman testing:  
email: admin@test.com  
password: Superadmin@1  

The project also contains an administrator seed script. If needed, it can be executed from the backend directory:
```bash
npm run seed:admin
```

6) Postman

The repository contains the Postman collection and environment required to test the API (folder "postman" in the project root directory).  
Import both files into your Postman.  
Select the imported environment before sending requests.


## Additional information
The test database already contains buyers, sellers with BASIC and PREMIUM accounts, managers and admin, a few car brands and models, advertisements of different status.  

To test the advertisement moderation flow create an advertisement containing prohibited language and verify that the automatic moderation detects it. Then update this advertisement and verify the allowed number of editing attempts. After the maximum number of failed moderation attempts, the advertisement becomes BLOCKED and all managers receives emails.
