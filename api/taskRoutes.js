const Joi = require('joi');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const apiTasks = [
    // Home Route
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World!';
        }
    },
    // Dynamic Routes

    // Route to CREATE TODO
    {
        method: 'PUT',
        path: '/todos',
        handler: function (request, h) {

            /*const state = request.params.state ? request.params.state : 'All';
            
            return '${state}';*/
        }
    },
    // Route to GET 
    {
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
    },
    // Route to DELETE 
    {
        method: 'DELETE',
        path: '/todo/{id}',
        handler: deletePostHandler
    },
]

async function deletePostHandler(request, h) {
    const id = Number(request.params.id);

    try {
        const post = await prisma.task.delete({
            where: { task_id: id },
        })
        return h.response();
    } catch (err) {
        console.log("", err)
        return h.response(err).code(404)
    }
}

module.exports.routes = apiTasks;