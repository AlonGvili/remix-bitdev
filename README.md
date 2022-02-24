# Remix Bit.dev Clone

This is a clone of [bit.dev](https://bit.dev) that was build using [Remix.run](https://remix.run) framework

This demo not 100% functional beacuse i don't know the underline tech bit.dev uses.

so some things are working some aren't.

## The TechStack

Remix as framework

Prisma as ORM

Postgres as database

Express as backend server

Tailwindcss as css framework

## Using this Remix app

to use this app you will need to configure a couple of things.

#### First rename the file from `.env.examples` to `.env`

--

#### This clone uses `Remix-Auth` for the authentication, to be more specific it uses the `remix auth google` and `remix auth GitHub` to enable users to login using their Github or Google account, so you will need to create a `0Auth app` for Github and `Google app` for google.

--

#### Third you will need `Postgres` database locally or in the cloud somewhere for this app to work, the app uses `Prisma` as ORM so when the app starts it looks for a database to connect.

--

#### The last thing to configure is to create a `Cloudinary` account this is for hosting user's avatar images, by default when a user connects using their GitHub or google account their avatar image will be stored in the database as URL, but if you want to enable the user to change the avatar you will need to create `Cloudinary` account

--

### after you finish the above steps open the .env file and put the info in.

### Next Steps

install dependencies

    npm install

prepare the database and seed some demo accounts and entries

    npm run prepare

start the development environment

    npm run dev

open you browser at `http://localhost:3000` you should see the login page.

## This is still work in progress, so don't panic if something breaks...
