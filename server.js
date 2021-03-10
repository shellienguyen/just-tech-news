const express = require( 'express' );
const routes = require( './routes' );
const sequelize = require( './config/connection' );

const app = express();
const PORT = process.env.PORT || 3002;

app.use( express.json());
app.use( express.urlencoded({ extended: true }));

// turn on routes
app.use( routes );

// turn on connection to db and server
// the sync part means that Sequelize is taking the models and connecting
// them to the associated database tables.  If it doesn't find a table, it'll
// create one.
// If force is set to true, it will drop and re-create all the the database
// tables on startup.
sequelize.sync({ force: false }).then(() => {
  app.listen( PORT, () => console.log( 'Now listening' ));
});