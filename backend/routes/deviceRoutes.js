import express from 'express';
import Device from '../models/deviceModel.js';
// import CommunicationService from '../services/CommunicationService.js';

const router = express.Router();

router.post('/devices', async (req, res) => {
    try {
        const device = new Device(req.body);
        console.log(device);
        await device.save();
        // await CommunicationService.addDevice(device);
        res.status(201).send(device);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get('/devices', async (req, res) => {
    try {
        const devices = await Device.find();
        res.send(devices);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.put('/devices/:id', async (req, res) => {
    try {
        const device = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(device);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.delete('/devices/:id', async (req, res) => {
    try {
        const device = await Device.findByIdAndDelete(req.params.id);
        // CommunicationService.removeDevice(device._id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default router;
