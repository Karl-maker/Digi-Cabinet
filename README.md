# Project Digi-Cabinet Instructions

### On use of the node.js application the .env files must be filled to connect to MongoDB database and any other dependencies needed such as Redis and other services (example: Nodemailer)

##### Create a file named .env OR other .env types in backend folder and copy and paste then fill in all variables in .example.env (varibles with \* by it are optional)

##### Create a keys folder in root and create access-private.key, access-public.key, refresh-private.key and refresh-public.key. Place keys inside accordingly. Generate from https://dinochiesa.github.io/jwt/

##### For Next.js App Set .env in the folder

#### in terminal follow instructions to run backend:

0. #### cd backend
1. #### npm run dev
