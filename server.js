// Import dependencies
const express = require( 'express' );
const routes = require( './controllers' );
const sequelize = require( './config/connection' );
const path = require( 'path' );
const helpers = require('./utils/helpers');

const exphbs = require( 'express-handlebars' );
const hbs = exphbs.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to the back-end and store the session
const session = require( 'express-session' );
const SequelizeStore = require( 'connect-session-sequelize' )( session.Store );
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use( express.json());
app.use( express.urlencoded({ extended: true }));
app.use( express.static( path.join( __dirname, 'public' )));
app.engine( 'handlebars', hbs.engine );
app.set( 'view engine', 'handlebars' );
app.use( session( sess ));

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