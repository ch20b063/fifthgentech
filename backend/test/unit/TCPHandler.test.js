import { expect } from 'chai';
import sinon from 'sinon';
import net from 'net';
import TCPHandler from '../../src/handlers/TCPHandler.js';

describe('TCPHandler', () => {
    let tcpHandler;
    let socketStub;

    beforeEach(() => {
        socketStub = sinon.createStubInstance(net.Socket);
        sinon.stub(net, 'Socket').returns(socketStub);
        tcpHandler = new TCPHandler('127.0.0.1', 8080);
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should connect to the server', async () => {
        socketStub.connect.yields();
        await tcpHandler.connect();
        expect(socketStub.connect.calledWith(8080, '127.0.0.1')).to.be.true;
    });

    it('should write data to the server', () => {
        const data = 'Hello';
        tcpHandler.write(data);
        expect(socketStub.write.calledWith(data)).to.be.true;
    });

    it('should read data from the server', (done) => {
        const data = Buffer.from('Hello');
        tcpHandler.read((receivedData) => {
            expect(receivedData).to.equal(data);
            done();
        });
        socketStub.emit('data', data);
    });

    it('should disconnect from the server', () => {
        tcpHandler.disconnect();
        expect(socketStub.destroy.called).to.be.true;
    });
});
