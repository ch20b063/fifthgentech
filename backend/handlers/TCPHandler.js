import net from 'net';

class TCPHandler {
    constructor(ip, port) {
        this.ip = ip;
        this.port = port;
        this.client = new net.Socket();
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.client.connect(this.port, this.ip, () => {
                resolve();
            });

            this.client.on('error', (err) => {
                reject(err);
            });
        });
    }

    write(data) {
        this.client.write(data);
    }

    read(callback) {
        this.client.on('data', (data) => {
            callback(data);
        });
    }

    disconnect() {
        this.client.destroy();
    }
}

export default TCPHandler;
