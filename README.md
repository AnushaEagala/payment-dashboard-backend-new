# Full-Stack Payment Dashboard Backend

<p align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
</p>

## Overview

This is the backend API for the **Full-Stack Payment Dashboard System**, built with **NestJS** and **TypeScript**.  
It provides secure RESTful endpoints for managing payments, users, authentication, and dashboard metrics.  

## Features

- JWT-based authentication with role-based access control (Admin, Viewer)
- Payment management (CRUD + filtering + pagination)
- User management (add, list users with roles)
- Dashboard metrics endpoint for revenue trends and failed transactions
- Input validation and error handling
- (Optional) Real-time updates via WebSockets

## Tech Stack

- Node.js
- NestJS Framework
- TypeScript
- PostgreSQL or MongoDB (configurable)
- JWT Authentication
- Class-validator for request validation

## Getting Started

### Prerequisites

- Node.js >= 16.x
- npm or yarn
- PostgreSQL or MongoDB instance running
- Optional: Docker (if you want to run DB in container)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/AnushaEagala/payment-dashboard-backend-new.git
   cd payment-dashboard-backend-new
