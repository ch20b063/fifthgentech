import { expect } from 'chai';
import sinon from 'sinon';
import CommunicationService from '../../services/CommunicationService.js';
import TCPHandler from '../../handlers/TCPHandler.js';

describe('CommunicationService', () => {
    let communicationService;
    let tcpHandlerMock;

    beforeEach(() => {
        communicationService = new CommunicationService();
        tcpHandlerMock = sinon.createStubInstance(TCPHandler);
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should add a new device and connect to it', async () => {
        sinon.stub(TCPHandler.prototype, 'connect').resolves();

        const device = { _id: 'device1', ip: '127.0.0.1', port: 8000 };
        await communicationService.addDevice(device);

        expect(communicationService.clients[device._id]).to.be.instanceOf(TCPHandler);
        expect(communicationService.clients[device._id].ip).to.equal(device.ip);
        expect(communicationService.clients[device._id].port).to.equal(device.port);
    });

    it('should write data to the connected device', () => {
        communicationService.clients['device1'] = tcpHandlerMock;

        communicationService.writeData('device1', 'Test message');
        expect(tcpHandlerMock.write.calledOnce).to.be.true;
        expect(tcpHandlerMock.write.calledWith('Test message')).to.be.true;
    });

    it('should remove the device and disconnect from it', () => {
        communicationService.clients['device1'] = tcpHandlerMock;

        communicationService.removeDevice('device1');
        expect(tcpHandlerMock.disconnect.calledOnce).to.be.true;
        expect(communicationService.clients['device1']).to.be.undefined;
    });
});
