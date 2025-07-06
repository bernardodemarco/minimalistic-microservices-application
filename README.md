# Minimalistic Microservices Application

This project implements a minimalistic microservice-based backend simulating a scooter rental application. Each service is developed in Node.js and exposes REST APIs for communication. SQLite is used as the database engine where persistence is required, with Prisma ORM managing the database access. Raw SQL queries are used intentionally in parts of the system for SQL practicing purposes.

## Overview

The system consists of five independent services:

- **Users Service:** Manages user data such as name, email, and phone number.
- **Scooters Service:** Registers scooters and manages their data, including serial number, status (available, rented, or out of operation) and coordinates (latitude and longitude). Coordinates are periodically updated, and users can query for nearby available scooters.
- **Rent Service:** Handles the start and end of rental sessions, updates the scooter’s status accordingly, and triggers access control operations at the beginning and end of each rental.
- **Scooter Access Control Service:** Simulates the physical locking and unlocking of scooters during rental transitions.
- **Payment Service:** Registers payment methods and simulates charging users for completed rentals.

![](https://github.com/user-attachments/assets/e0c9da21-69f0-47cb-bf61-76fdad5bc143)

All services are accessed via an API gateway. Based on the URL path, the gateway routes each incoming request to the corresponding service. All communication between services is handled via RESTful HTTP APIs.
