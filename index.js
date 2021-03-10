// require your server and launch it here
const server = require('./api/server');

server.listen(1234, () => {{
    console.log('\n*** Server Running on http://localhost:1234 ***\n');
}})