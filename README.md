# TODO APP

## Backend
### Option 1 to run backend
1. Requirements to run
    - Mysql
    - Nodejs
2. Steps to run
    - `cd todo-server`
    - `npm i`
    - Rename `.env.example` to `.env`
    - Add the mysql connection details in `.env` file
3. Run `npm run migrate`
4. Run `node server.js` to run the server on port `8080`

### Option 2 to run backend
1. Run `docker compose up`
2. It will create a mysql db and run the api on port `8080`


## Frontend
1. Steps to run
    - `cd todo-frontend`
    - `npm i`
    - Rename `.env.example` to `.env`
    - Change port in `VITE_API_URL` in `.env` if port on api is changed
    - `npm run dev`
2. Website will be running on `http://localhost:5173/`
