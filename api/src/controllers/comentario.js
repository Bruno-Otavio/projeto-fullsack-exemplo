const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const { os, colaborador, comentario, data }  = req.body;
        const coment = await prisma.comentario.create({
            data: {
                os: os,
                colaborador: colaborador,
                comentario: comentario,
                data: data,
            }
        });
        return res.status(201).json(coment);
    } catch (error) {
        return res.status(400).message({ message: error.message });
    }
}

const read = async (req, res) => {
    if (req.params.id !== undefined) {
        const comentario = await prisma.comentario.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });
        res.status(200).json(comentario);
    } else {
        const comentarios = await prisma.comentario.findMany();
        res.status(400).json(comentarios);
    }
}

const update = async (req, res) => {
    try {
        const { id, os, colaborador, comentario, data }  = req.body;
        const coment = await prisma.comentario.update({
            where: {
                id: id,
            },
            data: {
                os: os,
                colaborador: colaborador,
                comentario: comentario,
                data: data,
            }
        });
        return res.status(202).json(coment);
    } catch (error) {
        return res.status(404).json({ message: "comentario não encontrado" })
    }
}

const del = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const comentario = await prisma.comentario.delete({
            where: {
                id: id,
            },
        });
        return res.status(204).json(comentario);
    } catch (error) {
        return res.status(404).json({ message: "comentario não encontrado" });
    }
}

module.exports = {
    create,
    read,
    update,
    del
};