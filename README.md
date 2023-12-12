## Description

This project for backend was build by [NodeJS](https://nodejs.org/). Develop to apply to Sukionsen customers by clone project, originally from following works:
* The Tha Chang on 28/10/2023
* The Sukionsen on 24/11/2023 version tag v1.0.2.dev and v1.0.2.prod

## Getting Started

First, install essentials packages modules from package.json:
* npm install

First, run the development server:
* npm run dev

When you want to build and run production server:
* npm start

Open  [http://localhost:8080/api/docs](http://localhost:8080/api/docs)  with your browser to see the result.
You can start editing the page by modifying `src/app.ts` and save file. The page auto-updates as you edit the file.

##  Project Structure
| Name  | Description |
| ------------- | ------------- |
| dist  | Contains the distributable (or output) from your TypeScript build.  |
| node_modules  | Contains all npm dependencies  |
| src | Contains source code that will be compiled to the dist dir  |
| src/config | Contains various settings in the project.  |
| src/controllers| Controllers define functions to serve various express routes.|
| src/docs| Contains of creating API Documents.|
| src/middlewares | Express middlewares which process the incoming requests before handling them down to the controllers |
| src/routes | Contain all express routes |
| src/utility | Contains functions used in the project. |
| src/app.ts | Entry point to express app|
| package.json | Contains npm dependencies as well as build scripts |
| tsconfig.json | Configuring typeScript compilation |

## Learn More
To learn more about Next.js, take a look at the following resources:
-   [Node.js Documentation](https://nodejs.dev/en/learn/nodejs-with-typescript/)  - learn about Node.js with TypeScript features.
-   [Express](https://expressjs.com/en/api.html) - learn about API