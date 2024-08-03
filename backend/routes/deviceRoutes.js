import express from 'express';
import Device from '../models/deviceModel.js';
import communicationService from '../services/communicationService.js';

const router = express.Router();

router.post('/devices', async (req, res) => {
    const device = new Device(req.body);
    await device.save();
    await communicationService.addDevice(device);
    res.status(201).send(device);
});

router.get('/devices', async (req, res) => {
    const devices = await Device.find();
    res.send(devices);
});

router.put('/devices/:id', async (req, res) => {
    const device = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(device);
});

router.delete('/devices/:id', async (req, res) => {
    const device = await Device.findByIdAndDelete(req.params.id);
    communicationService.removeDevice(device._id);
    res.status(204).send();
});

export default router;
