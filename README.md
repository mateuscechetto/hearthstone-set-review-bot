# Hearthstone set review

A web application for Hearthstone Set Reviews. It centralizes information about card reviews, let any user create their own, and let streamers record their chat's ratings for each card.
Live on: https://hs-set-review.herokuapp.com/

## Technologies

### Backend

- Node
- Express
- OAuth2
- JWT
- MongoDB (mongoose)


### Frontend

- Angular

### Deploy

- Heroku

## Running the project in DEV mode

---

Clone the repository:

    git clone hearthstone-set-review-bot

---

Install backend dependencies:

    npm install

---

Create a .env file and fill it with the content of [template.env](https://github.com/mateuscechetto/hearthstone-set-review-bot/blob/master/template.env). You may need to create a [MongoDB Atlas Database](https://www.mongodb.com/atlas/database)

---

Install frontend dependencies:

    cd client
    npm install

---

Run the backend:
    
    cd ..
    npm start

The backend will be served at http://localhost:5000

---

In another terminal run the frontend:

    cd client
    ng serve

The frontend will be served at http://localhost:4200
