*** WORK-IN-PROGRESS***

[![Build Status](https://travis-ci.org/IBM/edb-tickets.svg?branch=main)](https://travis-ci.org/IBM/edb-tickets)

# EDB Tickets

A support ticket system built on EDB -- enterprise ready PostgreSQL.

In this code pattern, we will [create something] using [technologies] and [components]. [Explain briefly how things work]. [Give acknowledgements to others if necessary]

When you have completed this code pattern, you will understand how to:

* [goal 1]
* [goal 2]
* [goal 3]
* [goal 4]

![architecture](doc/source/images/architecture.png)

## Flow

1. Step 1.
2. Step 2.
3. Step 3.
4. Step 4.
5. Step 5.

## Steps

### Clone the repo

Clone the **edb-tickets** repo locally. In a terminal, run:

```zsh
git clone https://github.com/IBM/edb-tickets
cd edb-tickets
```
> Note: Example commands below will assume you ran the `cd edb-tickets` command to start from the base directory of your cloned repo.

### Provision the cloud services

<img src="doc/source/images/edb.svg" alt="logo" width="10" height="10"> [Databases for EDB](https://cloud.ibm.com/catalog/services/databases-for-enterprisedb)  
<img src="doc/source/images/DDE_50.svg" alt="logo" width="10" height="10"> [
IBM Cognos Dashboard Embedded](https://cloud.ibm.com/catalog/services/ibm-cognos-dashboard-embedded)

### Configure EDB

* Create a DB (see below)
* Gather credentials and download cert to a file.
* Copy the [**env.sample**](env.sample) to **.env**.
* Put the creds and access info in .env

Example command to copy the [**env.sample**](env.sample) to **.env**:

```bash
cp env.sample .env
```

Edit the `.env` file with the necessary settings.

#### `env.sample:`

```bash
# Copy this file to .env and replace the credentials with
# your own before starting the app.

DB_USERNAME=admin
DB_PASSWORD=*******
DB_DATABASE=edb-tickets
DB_HOST=Aaa12345-ed12-45d6-aa63-0d2a83dcc93b.bn2a2uid0de8vv7mv2ig.databases.appdomain.cloud
DB_PORT=32465
DB_CERTFILE=/users/username/edb-cert
```

### Run the application

1. Install [Node.js](https://nodejs.org/en/) runtime.
1. Build and start the app by running the following commands:
   ```bash
   npm install
   npm run build
   npm start
   ```
1. Use the app at [http://localhost:8080](http://localhost:8080).

When the app starts it will connect to the database and create the tables.

> NOTE: The following code snippet in **app.js** determines whether the tables will be dropped and re-created, or altered and migrated:

#### app.js

```javascript
(async () => {
  // Clobber and recreate the tables for testing
  await models.sequelize.sync({ force: true });
  // Don't clobber the tables, but alter and migrate if needed
  // await models.sequelize.sync({ alter: true });
})();
```

> TODO: Perhaps we should make that configurable instead of commented code? (but still show those interesting 2 lines).

### For UI Developers

1. Run the above to start the server with the REST API and a build of the UI.
1. Run the below to start a development server so you can work on the UI and see your changes.
1. The development server will take the next available port so it should be accessible at http://localhost:8081.
1. Keep in mind that when using this dev app, it will still rely no the REST services provided by the server running on port 8080.

```bash
npm run serve
```

### Load some historical data

You can create, edit, assign, and close your own tickets using the app.

We have prepared some example data to give us something to show for analytics (and in the app). If you want to load this additional data into your database, the instructions and data are [here](data/README.md):

* [Load tickets into the database from a CSV file using `psql`](data/README.md)


### Use the app

* TODO: Describe how to use it, what to look for...

![sample_output](doc/source/images/sample_output.png)

## License

This code pattern is licensed under the Apache License, Version 2. Separate third-party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1](https://developercertificate.org/) and the [Apache License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache License FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)
