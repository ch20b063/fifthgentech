import { expect } from 'chai';
import sinon from 'sinon';
import net from 'net';
import TCPHandler from '../../handlers/TCPHandler.js';

describe('TCPHandler', () => {
    let tcpHandler;
    const ip = '127.0.0.1';
    const port = 8000;

    beforeEach(() => {
        tcpHandler = new TCPHandler(ip, port);
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should connect to the server', async () => {
        const connectStub = sinon.stub(tcpHandler.client, 'connect').callsFake((port, ip, callback) => {
            callback();
        });

        await tcpHandler.connect();
        expect(connectStub.calledOnce).to.be.true;
        expect(connectStub.calledWith(port, ip)).to.be.true;
    });

    it('should handle connection errors', async () => {
        const connectStub = sinon.stub(tcpHandler.client, 'connect').callsFake(() => {
            tcpHandler.client.emit('error', new Error('Connection failed'));
        });

        try {
            await tcpHandler.connect();
        } catch (error) {
            expect(error.message).to.equal('Connection failed');
        }

        expect(connectStub.calledOnce).to.be.true;
    });

    it('should write data to the server', () => {
        const writeStub = sinon.stub(tcpHandler.client, 'write');
        const data = 'Hello, device';

        tcpHandler.write(data);
        expect(writeStub.calledOnce).to.be.true;
        expect(writeStub.calledWith(data)).to.be.true;
    });

    it('should receive data from the server', (done) => {
        const data = 'Server response';

        tcpHandler.read((receivedData) => {
            expect(receivedData.toString()).to.equal(data);
            done();
        });

        tcpHandler.client.emit('data', Buffer.from(data));
    });

    it('should disconnect from the server', () => {
        const destroyStub = sinon.stub(tcpHandler.client, 'destroy');

        tcpHandler.disconnect();
        expect(destroyStub.calledOnce).to.be.true;
    });
});
