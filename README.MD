[Live Link](https://mod3-warehouses.onrender.com/)

#### Summary

This is a resource management system allowing for Users and Organizations to manage inventory.
The app handles authentication resource access based on the User and their membership to a organization.

#### Build Instructions

Run in project root:

```
git https://github.com/ranylm/MOD3-Project-Pending.git
npm install && cd ./client && npm install
npm run dev
```
##### Production
```
git https://github.com/ranylm/MOD3-Project-Pending.git
npm run prod-build
npm run prod-start
```

#### Details

This project consists of a React frontend and Express backend.
Mongoose is used to manage Users, Organizations, Warehouses, and Items.
Authentication is done using JWT for users, and relation models of all entities to the User.

[Trello Link](https://trello.com/b/HD5XbLZg/ps-mod3)

#### Built with:

- Node.js
- Express
- Mongoose
- React
- Typescript/Javascript
- HTML/CSS
- JWT
- React-Router
- react-hook-form
- bcrypt

#### To Be Fixed

- Removing items from warehouse
