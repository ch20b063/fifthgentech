import { expect } from 'chai';
import sinon from 'sinon';
import net from 'net';
import TCPHandler from '../../src/handlers/TCPHandler.js';
import CommunicationService from '../../src/services/communicationService.js';

describe('CommunicationService', () => {
    let communicationService;
    let socketStub;

    beforeEach(() => {
        socketStub = sinon.createStubInstance(net.Socket);
        sinon.stub(net, 'Socket').returns(socketStub);
        communicationService = new CommunicationService();
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should add a device and connect', async () => {
        const device = { _id: '1', name: 'Device1', ip: '127.0.0.1', port: 8080, protocol: 'tcp' };
        await communicationService.addDevice(device);
        expect(socketStub.connect.calledWith(8080, '127.0.0.1')).to.be.true;
    });

    it('should write data to a device', async () => {
        const device = { _id: '1', name: 'Device1', ip: '127.0.0.1', port: 8080, protocol: 'tcp' };
        await communicationService.addDevice(device);
        communicationService.writeData('1', 'Hello');
        expect(socketStub.write.calledWith('Hello')).to.be.true;
    });

    it('should remove a device and disconnect', async () => {
        const device = { _id: '1', name: 'Device1', ip: '127.0.0.1', port: 8080, protocol: 'tcp' };
        await communicationService.addDevice(device);
        communicationService.removeDevice('1');
        expect(socketStub.destroy.called).to.be.true;
    });
});
