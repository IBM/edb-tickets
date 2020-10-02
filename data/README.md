# Load tickets into the database from a CSV file using `psql`

## Prerequisites

You should follow the main [../README.md](../README.md) to setup and start the app. When the app starts it will connect to the database and create the tables. The instructions below assume the tables have already been created using this method.

> TODO: Should we provide scripts for this also? It might be interesting.

## Install psql

The command-line tool `psql` is what we use to run our data loading script.

### Install it

https://cloud.ibm.com/docs/databases-for-enterprisedb?topic=databases-for-enterprisedb-connecting-psql

### On MacOS:

```bash
brew install libpq
brew link --force libpq
```

> NOTE: This broke my npm/node.  I had to brew update npm afterwards.

## Load the sample data

The UI and database are ready if you followed the above steps.  You can start entering new tickets. For some additional sample data, we have provided some old data that you can load into the database to have some history to show:

Export the same connection info that you put in .env as a convenience for the command that follows.

```bash
# . ./.env # TODO: this does not work. need exports like this...
export DB_DATABASE=edb-tickets
export DB_USERNAME=admin
export DB_HOST=AAAAAAAA-1234-5678-aaaa-945735783957983574574574308753457.databases.appdomain.cloud
export DB_PORT=32465
```

<!-- 
### Create the database (can we move this to the main README?)

> Note:  If you haven't created the database yet (then you didn't follow the instructions) you can just connect to the `postgres` database and run `CREATE DATABASE testdb1; quit;`.  Here is a script to do it.
```bash
psql -h $DB_HOST -p $DB_PORT -U $DB_USERNAME postgres -v dbname=$DB_DATABASE -f data/createdb.sql
```
> Tip: The output says `CREATE DATABASE` when it is successful.
-->

From your local repo's **edb-tickets** directory, use **psql** to run the script in [data/load.sql](load.sql) using your connection credentials.

```bash
psql -h $DB_HOST -p $DB_PORT -U $DB_USERNAME $DB_DATABASE -f data/load.sql
```

### TODO: Show what it does... yada yada

## psql tips

For an interactive session in the psql query tool, run the command without an input file (no -f).

```bash
psql -h $DB_HOST -p $DB_PORT -U $DB_USERNAME $DB_DATABASE
```

* PSQL TIP: You can store your password somewhere to avoid prompting.

* PSQL TIP: end SQL with a semi-colon for it to run in psql

* PSQL TIP: Use `exit` or `quit` to end your session.
