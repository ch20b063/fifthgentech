import TCPHandler from '../handlers/TCPHandler.js';

class CommunicationService {
    constructor() {
        this.clients = {};
    }

    async addDevice(device) {
        const client = new TCPHandler(device.ip, device.port);
        await client.connect();
        this.clients[device._id] = client;
    }

    writeData(deviceId, data) {
        const client = this.clients[deviceId];
        if (client) {
            client.write(data);
        }
    }

    removeDevice(deviceId) {
        const client = this.clients[deviceId];
        if (client) {
            client.disconnect();
            delete this.clients[deviceId];
        }
    }
}

const communicationService = new CommunicationService();
export default communicationService;
