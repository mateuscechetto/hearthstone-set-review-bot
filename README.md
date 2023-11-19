# Hearthstone set review

A web application for Hearthstone Set Reviews. It centralizes information about card reviews, let any user create their own, and let streamers record their chat's ratings for each card.
Live on: https://hs-set-review.herokuapp.com/

Home page:
![Home page](https://github.com/mateuscechetto/hearthstone-set-review-bot/assets/32515099/d0cb882a-6c39-485a-8b5a-4029fed4fca4)

Review page:
![Review page](https://github.com/mateuscechetto/hearthstone-set-review-bot/assets/32515099/c942527c-7b76-4601-add4-fe41ece9299b)


## Technologies

### Backend

- Node
- Express
- OAuth2 (passport)
- JWT
- MongoDB (mongoose)


### Frontend

- Angular
- PrimeNG

### Deploy

- Heroku

## Running the project in DEV mode

---

Clone the repository:

    git clone https://github.com/mateuscechetto/hearthstone-set-review-bot.git

---

Install backend dependencies:

    npm install

---

You may need to create a [MongoDB Atlas Database](https://www.mongodb.com/atlas/database). 

---

Create a .env file and fill it with the content of [template.env](https://github.com/mateuscechetto/hearthstone-set-review-bot/blob/master/template.env).

JWT_SECRET and SESSION_SECRET can be filled with any string. Same for USERNAME and PASSWORD, that for now are not being used. 
TWITCH_CLIENT_ID and TWITCH_SECRET are obtained from [twitch developers](https://dev.twitch.tv/console/apps).

---

Populate the database using:

    node .\seed-cards\seed-db.js

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

## Contributing

This is an open-source project. [Read this](https://github.com/mateuscechetto/hearthstone-set-review-bot/blob/master/.github/contributing.md) to know how to contribute.
