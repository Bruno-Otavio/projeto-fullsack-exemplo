const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const colaboradores = require('../docs/data/colaboradores.json');
const os = require("../docs/data/oss.json");
const comentarios = require("../docs/data/colaboradores.json");

async function main() {
    for (const c in colaboradores) {
        await prisma.colaborador.create({
            data: c,
        });
        console.log('Created colaborador')
    }

    for (const o in os) {
        await prisma.os.create({
            data: o,
        });
        console.log('Created os')
    }

    for (const c in comentarios) {
        await prisma.comentario.create({
            data: c,
        });
        console.log('Created comentario')
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
        console.log("Completed Seeding");
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit();
    });
