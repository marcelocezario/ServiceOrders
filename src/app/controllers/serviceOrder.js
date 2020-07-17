const express = require('express');
const authMiddleware = require ('../middlewares/auth');

const ServiceOrder = require('../models/serviceorder');
const Service = require('../models/service');
const Client = require('../models/client');
const { stat } = require('fs');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const serviceOrders = await ServiceOrder.find().populate(['client', 'services']);

        return res.send({ serviceOrders });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading service orders' });
    }
});

router.get('/:serviceOrderId', async (req, res) => {
    try {
        const serviceOrder = await ServiceOrder.findById(req.params.serviceOrderId).populate(['cliente', 'services']);

        return res.send({ serviceOrder });

    } catch (err) {
        return res.status(400).send({ error: 'Error loading service order' });
    }
})

router.post('/', async (req, res) => {
    try {
        const { client, services } = req.body;

        const serviceOrder = await ServiceOrder.create({});

        await Promise.all(client.map(async client => {
            const serviceOrderClient = new Client({ ...client });

            await serviceOrderClient.save();

            serviceOrder.client = serviceOrderClient;
        }));


        await Promise.all(services.map(async service => {
            
            const serviceOrderService = new Service({
                ...service,
                finalValue: service.value * (1- service.discount),
                serviceOrder: serviceOrder._id
            });

            await serviceOrderService.save();

            serviceOrder.services.push(serviceOrderService);

        }));

        serviceOrder.amount = 0

        serviceOrder.services.forEach(service => {
            serviceOrder.amount += service.finalValue      
        });

        await serviceOrder.save();
 
        return res.send({ serviceOrder });
    } catch (err) {
        return res.status(400).send({ error: 'Error creating new service order' + err});
    }
});

router.put('/:serviceOrderId', async (req, res) => {
    try {
        const { client, services, status } = req.body;

        const oldOrder = await ServiceOrder.findById(req.params.serviceOrderId);

        if ( oldOrder.status !== "open" )
            return res.status(400).send({ error: 'Its not allowed to edit an order with ' + oldOrder.status +' status'});

        const serviceOrder = await ServiceOrder.findByIdAndUpdate(req.params.serviceOrderId, { status });

        serviceOrder.client = [];
        serviceOrder.services = [];
        await Service.deleteMany({ serviceOrder: serviceOrder._id });

        await Promise.all(client.map(async client => {
            const serviceOrderClient = new Client({ ...client });

            await serviceOrderClient.save();

            serviceOrder.client = serviceOrderClient;
        }));


        await Promise.all(services.map(async service => {
            
            const serviceOrderService = new Service({
                ...service,
                finalValue: service.value * (1- service.discount),
                serviceOrder: serviceOrder._id
            });

            await serviceOrderService.save();

            serviceOrder.services.push(serviceOrderService);

        }));

        serviceOrder.amount = 0

        serviceOrder.services.forEach(service => {
            serviceOrder.amount += service.finalValue      
        });

        await serviceOrder.save();
 
        return res.send({ serviceOrder });
    } catch (err) {
        return res.status(400).send({ error: 'Error update service order' + err});
    }
});
/*
router.delete('/:clientId', async (req, res) => {
    try {
        await Client.findByIdAndRemove(req.params.clientId);

        return res.send({ message: 'Deleting sucessfull'});
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting client' });
    }
});
*/
module.exports = app => app.use('/serviceOrders', router);