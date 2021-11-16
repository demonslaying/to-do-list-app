'use strict';

const { routes } = require('./api/taskRoutes.js')
const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 4000,
        host: 'localhost',
        routes: {
            cors: true
        }
    });

    routes.forEach(route => {
        server.route(route)
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
