// The router instance in this file collects everything for us and
// package them up for server.js to use.

const router = require( 'express' ).Router();
const apiRoutes = require( './api' );

router.use( '/api', apiRoutes );

router.use(( req, res ) => {
  res.status( 404 ).end();
});

module.exports = router;