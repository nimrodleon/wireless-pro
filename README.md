# Wireless-Pro

![License](https://img.shields.io/badge/license-GPLv3-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D%2010.0.0-green)
![Express.js](https://img.shields.io/badge/express-%5E4.17.1-yellow)
![MongoDB](https://img.shields.io/badge/mongodb-%5E3.6.0-blue)
![Angular](https://img.shields.io/badge/angular-%5E10.0.0-red)

Wireless-Pro is an open-source project under the GNU General Public License Version 3. It is a software written in Node.js with Express.js for the backend, MongoDB for the database, and Angular for the frontend. Its purpose is to help wireless network ISP companies manage customers and payments, handle breakdowns, work orders, and register company devices. It also performs automatic disconnections and controls respective payments.

## Features

- Customer and payment management for ISPs
- Breakdown and work order management
- Device registration
- Automatic disconnections
- Payment control

## Technologies

- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Frontend**: Angular

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/wireless-pro.git
    ```
2. Navigate to the project directory:
    ```bash
    cd wireless-pro
    ```
3. Install backend dependencies:
    ```bash
    cd backend
    npm install
    ```
4. Install frontend dependencies:
    ```bash
    cd ../frontend
    npm install
    ```
5. Set up MongoDB:
  - Ensure MongoDB is installed and running.
  - Create a database named `wireless-pro`.

## Configuration

1. Backend:
  - Create a `.env` file in the `backend` directory with the following contents:
    ```plaintext
    MONGODB_URI=mongodb://localhost:27017/wireless-pro
    PORT=3000
    ```
2. Frontend:
  - Update the API endpoint in `frontend/src/environments/environment.ts`:
    ```typescript
    export const environment = {
      production: false,
      apiUrl: 'http://localhost:3000/api'
    };
    ```

## Usage

1. Start the backend server:
    ```bash
    cd backend
    npm start
    ```
2. Start the frontend development server:
    ```bash
    cd ../frontend
    ng serve
    ```
3. Open your browser and navigate to `http://localhost:4200`.

## Contributing

Contributions are welcome! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

## License

This project is licensed under the GNU General Public License Version 3 - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Angular](https://angular.io/)
