'use strict';

const Hapi = require('@hapi/hapi');
const Joi = require('joi');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    // Home Route
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {          
            return 'Hello World!';
        }
    });

    // Dynamic Routes

    // Route to CREATE TODO
    server.route({
        method: 'PUT',
        path: '/todos',
        handler: function (request, h) {

            /*const state = request.params.state ? request.params.state : 'All';
            
            return '${state}';*/
        }
    });

    // Route to GET 
    server.route({
        method: 'GET',
        path: '/todos',
        handler: function (request, h) {
            const query = request.query;
            
            return query;
        },
        options: {
            validate: {
                query: Joi.object({
                    filter: Joi.string().valid('ALL', 'COMPLETE', 'INCOMPLETE').default('ALL').insensitive(),
                    orderBy: Joi.string().valid('DESCRIPTION', 'DATE_ADDED').default('DATE_ADDED').insensitive(),
                })
            }
        }
    })


    // Route to DELETE 
    server.route({
        method: 'DELETE',
        path: '/todo/{id}',
        handler: (request, h) => { 
            
            
            return '';
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();