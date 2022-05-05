# Deployment Tracker

## Installing postgres

This project used postgres as a database by default but this can be changes via the `config.ts`. To use this project with postgres you need to have it installed locally. The easiest way to do this is via brew

run:

```shell
brew install postgresql
```

Once install is complete run:

```shell
brew services start postgresql
```

This will start the postgres service locally.

## Creating a database and tables

### Note

You may find it easier to use a table viewing GUI, personally I use [Tableplus](https://tableplus.com/)

By default postgres will create a database with the name of postgres, to log into it you can use

```shell
psql postgres
```

You can just use this default database, however, if you want to set a new one up you can run:

```sql
CREATE DATABASE <name>;
```

The name of the database is what you will set `DB_NAME` as within the .env file.

If not using a GUI you can double check this has worked by typing `\l` in the console, this should list all databases locally

```shell
  List of databases
    Name     |  Owner  | Encoding | Collate | Ctype |  Access privileges
-------------+---------+----------+---------+-------+---------------------
 <name>      | <username> | UTF8     | C       | C     |
 postgres    | <username> | UTF8     | C       | C     |
```

To change database you can run `\c <db name>` and should see the following if successful.

```shell
postgres=# \c <name>
You are now connected to database <name> as user <username>.
<name>=#
```

Two tables are needed to track deployments, one for the squads and one for the deployments themselves.
To create a table for squads you can use the following:

```sql
CREATE TABLE squads
(
  id serial PRIMARY KEY,
  name varchar(50)
);
```

For the deployments use:

```sql
CREATE TABLE deployments
(
  id serial PRIMARY KEY,
  deployment_id varchar(50),
  deployment_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  squad_id int,
  FOREIGN KEY (squad_id) REFERENCES Squads(id)
);
```

If not using a GUI you can check this has worked by using `\dt` in the console, you should get the following:

```shell
           List of relations
 Schema |    Name     | Type  |  Owner
--------+-------------+-------+---------
 public | deployments | table | <username>
 public | squads      | table | <username>
(2 rows)
```

## Seeding the squad data

This program assumes that there is squad data currently in the squads table. You can use the following sql to insert a few squads to ensure the program works.

```sql
INSERT INTO squads (name)
VALUES ('CTX');

INSERT INTO squads (name)
VALUES ('RR');

INSERT INTO squads (name)
VALUES ('CAS');
```

<hr/>

## Running the server and inserting data

In the root of the project run `yarn` to install packages. The project uses node `v17.4.0` and can be managed with `nvm`

Once complete, ensure that you have a `.env` file with all the correct env variables in the root of the project, this will be to establish a connection to the local database set up above.

To start the server run `yarn dev` the server uses `nodemon` so will automatically restart each time a file is saved. You should see the following in the console to indicate a successful start up:

```shell
Listening on port <port number>
```

There is currently only one endpoint `/deployment` this takes a post request and expects data in the following structure:

```json
{
  "data": {
    "type": "deployments", <--- not currently used
    "attributes": {
      "project_name": "CTX",
      "deployment_id": "820hf2"
    }
  }
}
```

You can use a tool like [insomnia](https://insomnia.rest/download) or [postman](https://www.postman.com/downloads/) to ensure this is working correctly.
Currently on a successful log of a deployment a response of `"Deployment logged"` is sent with a status code of `200`, errors return a `400` with ether `"Error Data was not supplied in the correct format"` or `"Error Data was not logged"`
