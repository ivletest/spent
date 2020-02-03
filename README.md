# Spent - personal finance managemnt app

## Table of contents
* [Technologies](#technologies)
* [Setup](#setup)
* [Documentation](#documentation)

## Technologies
    * Yarn ^1.0
    * NodeJs ^12.14
    * PostgreSQL ^11.6
    * Sequelize ^5.21
    * Restify ^8.5
    * Ionic Framework ^5.4
    * Apidoc ^0.20
## Setup

### Yarn
The repo is using Yarn workspaces, which is available since Yarn 1.0.
**NOTE: ** Since NPM doesn't support workspaces, you must use Yarn.
Get [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable).

### Clone the repo and install packages
To begin, run:
```
git clone https://github.com/ivletest/spent.git
cd spent
yarn install
```

### Environment file
Place `.env` file in the root of the repository and format it like:
```
APP_HOST= application host
APP_PORT= application port

DATABASE_HOST= database host
DATABASE_NAME= database name
DATABASE_PORT= database port
DATABASE_USER= postgres user
DATABASE_PASS= postgres password
```

### Running the project

Run: `yarn run doc:api` to generate the documentation.

Run: `yarn run server:dev` to start development server. The database migrations
and seeding wil run automaticly when the server starts.

## Documentation
Link: [Api Documentation V1](localhost:3000/doc/v1).