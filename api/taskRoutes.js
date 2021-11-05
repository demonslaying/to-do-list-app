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
    // Route to CREATE
    {
        method: 'PUT',
        path: '/todos',
        handler: createTaskHandler
    },
    // Route to GET 
    {
        method: 'GET',
        path: '/todos',
        handler: function (request, h) {

            return request.query;
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
        handler: deleteTaskHandler
    },
]

async function createTaskHandler(request, h) {
    const payload = request.payload;

    const createTask = await prisma.task.create({
        data: {
            description: payload.description,
        },
    })

    return h.response(createTask);
}

async function deleteTaskHandler(request, h) {
    const id = Number(request.params.id);

    try {
        const task = await prisma.task.delete({
            where: { task_id: id },
        })
        return h.response();
    } catch (err) {
        console.log("", err);
        return h.response(err).code(404);
    }
}

module.exports.routes = apiTasks;