const Joi = require('joi');
const { PrismaClient } = require('@prisma/client');
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
        handler: getTasksHandler,
        options: {
            validate: {
                query: Joi.object({
                    filter: Joi.string().valid('ALL', 'COMPLETE', 'INCOMPLETE').default('ALL').insensitive(),
                    orderBy: Joi.string().valid('DESCRIPTION', 'DATE_ADDED').default('DATE_ADDED').insensitive(),
                })
            }
        }
    },
    // Route to PATCH
    {
        method: 'PATCH',
        path: '/todo/{id}',
        handler: editTaskHandler,
        options: {
            validate: {
                payload: Joi.object({
                    description: Joi.string().required()
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

async function getTasksHandler(request, h) {

    if (request.query.filter == 'ALL') {
        try {
            if (request.query.orderBy == 'DESCRIPTION') {
                const tasks = await prisma.task.findMany({
                    orderBy: {
                        description: 'asc'
                    }
                })
                return h.response(tasks);
            }
            else {
                const tasks = await prisma.task.findMany({
                    orderBy: {
                        dateAdded: 'asc'
                    }
                })
                return h.response(tasks);
            }
        } catch (err) {
            console.log(err)
        }
    }
    else {
        try {
            if (request.query.orderBy == 'DESCRIPTION') {
                const tasks = await prisma.task.findMany({
                    where: {
                        state: request.query.filter
                    },
                    orderBy: {
                        description: 'asc'
                    }
                })
                return h.response(tasks);
            }
            else {
                const tasks = await prisma.task.findMany({
                    where: {
                        state: request.query.filter
                    }
                })
                return h.response(tasks);
            }
        } catch (err) {
            console.log(err)
        }
    }
}

async function editTaskHandler(request, h) {
    const id = Number(request.params.id);
    const findUnique = await prisma.task.findUnique({
        where: {
            task_id: id
        }
    })

    if (!findUnique) {
        return h.response("Invalid task").code(404);
    }

    const payload = request.payload;

    try {
        const finishedTask = await prisma.task.findFirst({
            where: {
                task_id: id,
                state: 'COMPLETE'
            }
        })

        if (finishedTask) {
            return h.response("Not possible to update a finished task!").code(400);

        }

        const editTask = await prisma.task.update({
            where: {
                task_id: id
            },
            data: {
                state: 'COMPLETE',
                description: payload.description
            }
        })
        return h.response(editTask);
    } catch (err) {
        console.log(err);
        return h.response(err).code(400);
    }
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