const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    // ... you will write your Prisma Client queries here

    const tasks = [
        { state: 'INCOMPLETE', description: 'Buy milk at the store.' },
        { state: 'INCOMPLETE', description: 'Buy bread at the store.' },
    ]

    for (const task in tasks) {
        await prisma.task.create({
            data: tasks[task]
        })
    }

    /*tasks.forEach(task => {
        await prisma.task.create({
            data: task
        })
    });*/

    const allTasks = await prisma.task.findMany();

    console.dir(allTasks, { depth: null })
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        // Close database connections
        await prisma.$disconnect()
    })