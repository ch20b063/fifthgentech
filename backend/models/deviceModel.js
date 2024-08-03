import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
    name: String,
    ip: String,
    port: Number,
    protocol: String,
});

const Device = mongoose.model('Device', deviceSchema);
export default Device;