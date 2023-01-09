# Books project

A single-page app for saving, editing and deleting books and relative information.

## Description

Single-page app made by using ReactJS on frontend and NodeJS with express on the backend. MongoDB Atlas is used as a database on the cloud to store the information. Winston library is used for logging. Tests are made using the Jest-framework. On the page you can add, modify, delete books with the form provided, as well as browse existing ones on the table provided.

## Getting Started

### Dependencies

* NodeJS installed in order to run this program. Download NodeJS [here](https://nodejs.org/en/).

* Python v3.7, v3.8, v3.9, or v3.10 (for example from Microsoft Store if on Windows). 

* **(APPLIES ONLY TO WINDOWS)** Latest [Visual Studio](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=BuildTools) with "Desktop development with C++" workload. Underneath you will find a picture to see selections for Windows 10. If you are running Windows 11, you need to select the Windows 11 SDK.  ![image](https://user-images.githubusercontent.com/50096393/211222302-a66f3433-850e-4b8b-96ef-7f50d5e05e70.png)

* The reasoning for Python and Visual Studio comes from [node-gyp](https://github.com/nodejs/node-gyp), which npm utilizes to compile native addon modules for Node.js. For windows, you can refer to [here](https://github.com/nodejs/node-gyp#on-windows) for a guide on how to do these same steps as just listed but **NOTE: YOU NEED TO SET THE NPM CONFIG VERSION OF MSVS TO 2022** as so `npm config set msvs_version 2022` instead of the `npm config set msvs_version 2017` listed on the link provided. If you use other OS than Windows, refer to the [node-gyp](https://github.com/nodejs/node-gyp) guide for your specific OS.


* git to clone the repository to your computer. Download Git [here](https://git-scm.com/).

* modern web browser (such as [Google Chrome](https://www.google.com/intl/fi_fi/chrome/)) to open the page. 

* Internet connection (you can run the app without, but will get `Network error` on load since you can't fetch the books from database).

### Installing
After installing dependencies, you can clone the project and start installing it on your computer. Open up a command-line tool (such as command prompt or bash).

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
You might encounter `6 high severity vulnerabilities``warning after installing is complete in the command logs. Do not worry, this is due to `npm audit` and how it works, there are no actual vulnerabilities. You can read more [here](https://overreacted.io/npm-audit-broken-by-design/)

Next up you need to set up environment variables so the program works as intended. You need to locate .env.example files from both client and server folders. They are located at:
```
server\.env.example
client\.env.example
```
Change the name of these files into just .env `.env.example -> .env`. 

Add the provided environment variables to the .env files on place of the placeholders and save the files.
For `server\.env`
```
PORT
DB_USER
DB_PASS
```

and for `client\.env`
```
REACT_APP_API_URL
```

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
