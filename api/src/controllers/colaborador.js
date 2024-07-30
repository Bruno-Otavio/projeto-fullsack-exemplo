const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { matricula, pin } = req.body;
    const colaborador = await prisma.colaborador.findFirst({
        where: {
            matricula: matricula,
            pin: pin,
        },
    });
    if (colaborador) {
        const token = jwt.sign({ matricula: colaborador.matricula }, process.env.KEY, {
           // Expira em uma hora
           expiresIn: 3600 
        });
        colaborador.token = token;
        return res.json({ colaborador });
    } else {
        return res.status(401).json({ message: 'Matrícula ou pin inválidos'});
    }
}

const read = async (req, res) => {
    if (req.query.matricula) {
        const colaborador = await prisma.colaborador.findUnique({
            where: {
                matricula: req.query.matricula
            },
        });
        return res.json(colaborador);
    } else {
        const colaboradores = await prisma.colaborador.findMany();
        return res.json(colaboradores);
    }
}

module.exports = {
    login,
    read
};
