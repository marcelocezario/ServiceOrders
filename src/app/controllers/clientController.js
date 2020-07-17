const express = require('express');
const authMiddleware = require ('../middlewares/auth');

const Client = require('../models/client');
const { Router } = require('express');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const clients = await Client.find();

        return res.send({ clients });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading clients' });
    }
});

router.get('/:clientId', async (req, res) => {
    try {
        const client = await Client.findById(req.params.clientId).populate(['user', 'tasks']);

        return res.send({ client });

    } catch (err) {
        return res.status(400).send({ error: 'Error loading client' });
    }
})

router.post('/', async (req, res) => {
    try {
        const { name, adress, phone, email } = req.body;

        const client = await Client.create({ name, adress, phone, email });

        await client.save();

        return res.send({ client});
    } catch (err) {
        return res.status(400).send({ error: 'Error creating new client'});
    }
});

router.put('/:clientId', async (req, res) => {
    try {
        const { name, adress, phone, email } = req.body;

        const client = await Client.findByIdAndUpdate(req.params.clientId, {
            name,
            adress,
            phone,
            email,
        }, { new: true });

        await client.save();

        return res.send({ client });
    } catch (err) {
        return res.status(400).send({ error: 'Error editing client'});
    }
});

router.delete('/:clientId', async (req, res) => {
    try {
        await Client.findByIdAndRemove(req.params.clientId);

        return res.send({ message: 'Deleting sucessfull'});
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting client' });
    }
});

module.exports = app => app.use('/clients', router);