# Books project

A single-page app for saving, editing and deleting books and relative information.

## Description

Single-page app made by using ReactJS on frontend and NodeJS with express on the backend. MongoDB Atlas is used as a database to store the information. Winston library is used for logging. Tests are made using the Jest-framework. On the page you can add, modify, delete books with the form provided, as well as browse existing ones on the table provided.

## Getting Started

### Dependencies

You need to have NodeJS installed in order to run this program. You will also need git to clone the repository to your computer. You will also need a modern web browser (such as [Google Chrome](https://www.google.com/intl/fi_fi/chrome/)) to open the page. You will also need an internet connection to connect to the database in the cloud.

Download NodeJS [here](https://nodejs.org/en/).
Download Git [here](https://git-scm.com/).

### Installing
After installing NodeJS and Git, you can clone the project and start installing it on your computer. Open up a command-line tool (such as command prompt or bash).

First, clone the repository into your desired location on your computer by using 
```
git clone https://github.com/erikhamalainen/books-project.git
```
on the command line.

Next change into the repository by typing
```
cd books-project
```
on the command line.

Once in the repository, run command
```
npm run first-install
```
to install the needed dependencies for the project to work.

Next up you need to set up environment variables so the program works as intended. You need to locate .env.example files from both client and server folders. They are located at:
```
server\.env.example
client\.env.example
```
Change the name of these files into just .env `.env.example -> .env`. 

Add the provided environment variables to the .env files on place of the placeholders and save the files.

Now you are all set for running the program.


### Executing program

Run the program from command line by running command
```
npm run dev
```

The program should run, and open it in localhost:3000 automatically on your browser. You should see the headerbar, form, and booktable, without any errors.

### Testing

Although there isn't a lot to test, I've created a few unit tests with Jest on the frontend-side to test sorting functions. They can be ran by going into the client folder
```
cd client
```

and running command

```
npm test
```
