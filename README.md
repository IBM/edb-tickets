[![Build Status](https://travis-ci.org/IBM/edb-tickets.svg?branch=main)](https://travis-ci.org/IBM/edb-tickets)

# Develop a modern web app using EDB, an enterprise-class PostgreSQL database-as-a-service

In this code pattern, we walk you through a working example of a web application that tracks a company's internal support ticket system. The app will allow users to create, assign, manage, and close support tickets.

All support tickets, users, and support staff will be maintained in a `Databases for EDB` deployment provisioned on IBM Cloud. `EDB` is a PostgreSQL-based database that provides features such as: high availability, automated backup orchestration, and de-coupled scaling of storage, RAM, and vCPUs.

Other featured technologies in this code pattern include:

* [Sequelize](https://sequelize.org/): A Node.js Object-Relational Mapper (ORM) for EDB, Postgres, MySQL, and other relational databases.
* [Node.js](https://nodejs.org): An open-source JavaScript run-time environment for executing server-side JavaScript code.
* [Express](https://expressjs.com/): A popular and minimalistic web framework for creating an API and Web server.
* [Vue](https://vuejs.org/): A JavaScript framework for building web app user interfaces.
* [Vuetify](https://vuetifyjs.com): A Material Design component framework for Vue.js apps.
* [psql](): A command-line interface utility for managing PostgreSQL databases.

When you have completed this code pattern, you will understand how to:

* Provision an `EDB for Databases` instance on IBM Cloud.
* Use `Sequelize` to programmatically map objects to your relational database.
* Create a modern web app built on Node.js, with an `Express` server for REST APIs, and a `Vue`-based UI.
* Use `psql` scripts to seed the database tables with tickets, users, and support staff.

![architecture](doc/source/images/architecture.png)

## Flow

1. Administrator uses `psql` to seed `EDB` tables with user, assignee, and ticket data.
1. User interacts with the `Node.js` app to create and maintain ticket information. The `Vue`-based client UI accesses EDB data via the `Express` server REST APIs.
1. The server uses `Sequelize` to perform CRUD operations on the EDB instance.

## Steps

1. [Clone the repo](#1-clone-the-repo)
1. [Provision the "Databases for EDB" service](#2-provision-the-databases-for-edb-service)
1. [Add service credentials to environment file](#3-add-service-credentials-to-environment-file)
1. [Load sample data](#4-load-sample-data)
1. [Run the application](#5-run-the-application)
1. [Use the app](#6-use-the-app)
1. [Application structure](#-7-application-structure)

## 1. Clone the repo

Clone the **edb-tickets** repo locally. In a terminal, run:

```zsh
git clone https://github.com/IBM/edb-tickets
cd edb-tickets
```

> Note: Example commands below will assume you ran the `cd edb-tickets` command to start from the base directory of your cloned repo.

## 2. Provision the "Databases for EDB" service

* If you do not have an IBM Cloud account, register for a free trial account [here](https://cloud.ibm.com/registration)
* Create a `Databases for EDB` instance from the [IBM Cloud catalog](https://cloud.ibm.com/catalog/services/databases-for-enterprisedb)
  * Verify the default region, and modify the instance name if you like.
  * Keep all other default options and values.

## 3. Add service credentials to environment file

Copy the local `env.sample` file and name it `.env`:

```bash
cp env.sample .env
```

You will need to update the `.env` file with the credentials from your EDB service. Here is an example `.env` file showing the credentials you will need to collect:

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

To find your `DB_HOST` and `DB_PORT` values, navigate to your EDB service panel and click the `Overview` tab.

![edb-overview](doc/source/images/edb-overview.png)

Copy and paste the `Certificate` into a local file, and provide the name as the `DB_CERTFILE` value.

For convenience, we're using the `admin` account as the `DB_USERNAME`. To set the `DB_PASSWORD` for the `admin` account, use the `Update Password` option located in the `Settings` tab.

![edb-admin-password](doc/source/images/edb-admin-password.png)

> NOTE: You can create additional credentials...
> * Use `Service credentials` in the left menu.
> * Click on `New credential +`.
> * Once created, use the expand icon and copy the parts you need.

For the `DB_DATABASE` value, keep the default name `edb-tickets` or choose your own name. The service is provisioned with a database named `ibmclouddb`, but we can create a new one.

## 4. Load sample data

You can create, edit, assign, and close tickets using the app, but we recommend loading some fake data to get things started. We have provided shell scripts that use `psql` to help you create a database, create tables and indexes, and load the database with a staff to assign tickets to, some fake user IDs, and a few issues so you don't have to start with an empty user interface.

1. Install `psql`

   We're using the command-line tool `psql`. `psql` is a very common tool used for EDB and PostgreSQL databases. Even if you prefer using one of the many available GUIs, it is worth getting comfortable with `psql` so that you have a tool that you can use in scripts and whenever you need to work in a terminal without a browser. Another reason we are using `psql` is because it has a handy way of loading data from a CSV file.

   **Instructions for downloading and installing `psql` are [here](https://www.postgresql.org/download/).**

1. Verify your `.env` file settings

   The scripts below will use the settings in your `.env` file. Please verify that you provided these settings as described in Step 3.

   > TIP: `psql` will prompt you for your database password (instead of reading it from the `.env`). If you would like to avoid those prompts, setup a `.pgpass` file as described [here](https://www.postgresql.org/docs/current/libpq-pgpass.html).

1. Run the shell scripts

   Our simple shell scripts will read your `.env` file and then run `psql` along with one of our SQL files. Before you run them all, consider the following:

   * If the `DB_DATABASE` that you configured already exists, then you can skip `create_database.sh`.
   * If you skipped ahead and already ran the application (i.e. npm start), then you can also skip `create_tables.sh`.
   * `load_data.sql` is the one that loads sample data into those tables in that database. 

   The scripts can be found in the `data` directory and need to be executed from that directory. Please take a look at the `*.sh`, `*.sql`, and `*.csv` files in the `data` directory to see what these scripts and SQL are really doing.

1. Run the following commands:

   ```bash
   cd data
   ./create_database.sh
   ./create_tables.sh
   ./load_data.sh
   ```

## 5. Run the application

1. Install the [Node.js](https://nodejs.org/en/) runtime.
1. Build and start the app by running the following commands:

   ```bash
   npm install
   npm run build
   npm start
   ```

1. The application will be available in your broswer at [http://localhost:8080](http://localhost:8080).

![app-home-page](doc/source/images/app-home-page.png)

When the app starts it will connect and sync to the database. If needed, you can modify the code to drop the database tables and start fresh. The code is located in **app.js** file.

```javascript
(async () => {
  // Clobber and recreate the tables for testing
  //await models.sequelize.sync({ force: true });

  // Don't clobber the tables, but alter and migrate if needed
  await models.sequelize.sync({ alter: true });
})();
```

### For UI Developers

1. Run the command shown above to start the server with the REST API and a build of the UI.
1. Run the command below to start a `development server` so you can work on the UI and see your changes.
1. The `development server` will take the next available port so it should be accessible at http://localhost:8081.
1. Keep in mind that when using this development app, it will still rely on the REST services provided by the server running on port `8080`.

```bash
npm run serve
```

## 6. Use the app

The app is a typically help desk application that tracks tickets for service requests. Users create the ticket, the ticket is assigned to a member of the support staff, and the ticket can be updated with current status as it progresses to being completed and closed.

Anyone who logs into the app is considered a valid user, and will be added to the database as such. Any valid user can add or modify tickets, but only support staff personnel can be assigned to work on a ticket.

To start, you will need to login to the app by clicking the avatar located in the top right corner of the home page. Since this data will be stored in the EDB cloud service, we suggest using an alias for username and email.

Once logged in, you will now have access to all of the menu options.

> **NOTE**: You will not be able to create a ticket until you log in.

![app-menu-options](doc/source/images/app-menu-options.png)

The `All Tickets` menu option displays all tickets in the database. Tabs are used to seperate out `Open` and `Closed` tickets.

![app-all-tickets](doc/source/images/app-all-tickets.png)

The `Support Staff` menu option displays all users who are designated as support staff. This are the only users who can be assigned a ticket.

The `New Ticket` menu option displays a form you can use to create a ticket. Here you are required to enter a `Subject` and `Description`, and select a `Category` and `Priority`. The new ticket will automatically assign you as the `created by` user.

To assign a support staff member to work on the ticket, `Edit` the ticket by clicking the `pencil` icon shown in the `Actions` column for the ticket in the `All Tickets` panel.

![app-edit-ticket](doc/source/images/app-edit-ticket.png)

From the `Edit Ticket` panel you can also change the current status, and other ticket details.

To delete a ticket, click the `trashcan` icon shown in the `Actions` column for the ticket in the `All Tickets` panel.

## 7. Application structure

### Database support

Each of the database tables in `EDB` will be descibed by their respective files found in the `/models` directory. The files specify the field names and any relationships that exist between tables.

Files located in the `/controllers` directory define what access the server has to the database tables, and how to perform that access.

Here is an entity-relationship diagram of the tables in our `EDB` database. A ticket is linked to a user (who created the ticket) by `user_id`, and to an assignee by `assignee_id`. An assignee is linked to a user by `user_id`.

![db-schema](doc/source/images/db-schema.png)

NOTE: in `/controllers/ticket.js`, you will see the `Sequelize` command `Upsert` used when a ticket is added. This insures that the `created by` user exists in the user table. If they do not, the user is added at the same time as the ticket. This ensures data integrity.

### Express routing

The `Express` framework is used to define route paths in the server.

Files found in the `/routes` directory set up the REST endpoints for accessing the data in each of the `EDB` tables.

### Vue components

`Vue` components are used to build the app UI, and can be found in the `/src` directory.

The main `Vue` component is `App.vue`, which defines the page banner, the login panel, and navigation links to the sub-pages.

Each sub-panel in the app has its own `Vue` file, which is located in the `/src/pages` directory.

Re-usable sub-components can be found in the `/src/compenents` directory.

## License

This code pattern is licensed under the Apache License, Version 2. Separate third-party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1](https://developercertificate.org/) and the [Apache License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache License FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)
