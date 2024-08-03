# FIFTHGENTASK

## Project Overview

This project consists of a backend and a frontend. The backend is responsible for handling TCP/IP communication and device management, while the frontend provides a user interface for interacting with the devices.I use  ** google ,chatGPT and other tools ** to write better code and for testing code and to understand problem. ** But i know how its working. **

### Backend

The backend, located in the `backend_device_man_back` directory, supports TCP/IP communication, communicates with multiple devices simultaneously, and allows for future additions of communication protocols. It also includes unit tests and a stub to test TCP/IP communication.

### Frontend

The frontend, located in the `frontend/device-management` directory, is a React application that provides a user interface for managing devices, displaying real-time data, and handling user interactions.

## Project Structure

### Backend
```
backend_device_man_back/
├── config/
│ └── config.env
├── database/
│ └── dbcollection.js
├── handlers/
│ └── TCPHandler.js
├── model/
│ └── deviceSchema.js
├── routes/
│ └── deviceRoutes.js
├── services/
│ └── communicationService.js
├── test/
│ ├── e2e/
│ │ └── server.test.js
│ ├── name/
│   └── communicationService.test.js
│ └── unit/
│   └── TCPHandler.test.js
├── app.js
└── index.js
```


### Frontend
```
frontend/device-management/
├── public/
├── src/
│ ├── components/
│ │ ├── DeviceForm.js
│ │ ├── DeviceList.js
│ │ ├── RealTimeData.js
│ ├── App.css
│ ├── App.js
│ ├── App.test.js
│ ├── index.css
│ ├── index.js
│ ├── logo.svg
│ ├── reportWebVitals.js
│ └── setupTests.js
├── .gitignore
├── package-lock.json
└── package.json

```


## Setup and Installation

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

### Backend

1. **Navigate to the backend directory:**

    ```sh
    cd backend_device_man_back
    ```

2. **Install the dependencies:**

    ```sh
    npm install
    ```

3. **Create a `.env` file in the `config` directory and add your environment variables:**

    ```
    MONGO_URI=<your_mongodb_url>
    ```

4. **Run the backend server:**

    ```sh
    npm run dev
    ```

### Frontend

1. **Navigate to the frontend directory:**

    ```sh
    cd frontend/device-management
    ```

2. **Install the dependencies:**

    ```sh
    npm install
    ```

3. **Run the frontend development server:**

    ```sh
    npm start
    ```

## Usage

Once both the backend and frontend servers are running, you can interact with the application by navigating to `http://localhost:3000` in your web browser.

## Testing

### Backend

1. **Run the backend tests:**

    ```sh
    npm test
    ```




