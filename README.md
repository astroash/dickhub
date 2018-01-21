# :eggplant:

## Huh?

Sadly misogyny is still an issue in the workplace, especially in _"traditionally masculine"_ jobs. DickHub is a place for developers to _raise issues_ and support each other with sexism they experience in the tech industry.

## Install Guide

* run `npm i` then `npm start` from root
* `cd` to `/client`
* run `npm start` from /client

### Learnings

* This app uses React with an Express backend. Create-react-app automatically creates a local server on localhost:3000, so here we have created our separate Express server on localhost:3001 and configured it as a proxy in our client side package.json (like this: js`"proxy": "http://localhost:3001"`). This means that whenever our React app requests a non-static file, it will forward the request to our specified proxy server i.e. localhost:3001.

https://dev.to/loujaybee/using-create-react-app-with-express

https://daveceddia.com/create-react-app-express-backend/
