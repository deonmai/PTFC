# SEP Personal Fitness Trainers Club - PFTC3 Repo
This is the new develop branch with a React frontend and Express backend.

## How was this set up?
1. <a href = https://reactjs.org/docs/create-a-new-react-app.html#create-react-app> Creating a React frontend </a>
2. <a href = https://levelup.gitconnected.com/create-a-react-app-with-an-express-backend-24740b0a6f5e> Using a React frontend with an Express backend </a>


## What do I need to install?
1. Install Node.js <a href = https://nodejs.org/en/download/> here! </a>
2. You also need <code>npm</code> >= 5.6
3. Now, <code>npm run install_all</code>. This will create and populate the two <code>node_modules</code>
4. Finally, install <code>npm i concurrently</code>. This is just for efficiency when running.

## To run:
Instead of running two terminals and starting the frontend and backend separately, enter:
<code>npm run startboth</code>.
You're all good to go!

## Supporting Links
1. <a href = https://css-tricks.com/using-fetch/> How to use Fetch </a>

## Import database
If you do not have an exisisting database, you have to first create a blank one. 
```mysql```

```CREATE DATABASE pt_club;```

```mysql -u user -p pt_club < pt_club.sql```

If you have an exisisting database

```mysql -u user -p pt_club < pt_club.sql```
