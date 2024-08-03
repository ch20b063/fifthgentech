import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/server.js'; // Assuming app is exported from server.js

describe('API Endpoints', () => {
    before((done) => {
        mongoose.connect('mongodb://localhost:27017/devices', { useNewUrlParser: true, useUnifiedTopology: true }, done);
    });

    after((done) => {
        mongoose.connection.close(done);
    });

    it('should create a new device', (done) => {
        request(app)
            .post('/api/devices')
            .send({ name: 'Device1', ip: '127.0.0.1', port: 8080, protocol: 'tcp' })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('_id');
                expect(res.body.name).to.equal('Device1');
                done();
            });
    });

    it('should get all devices', (done) => {
        request(app)
            .get('/api/devices')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should update a device', (done) => {
        request(app)
            .post('/api/devices')
            .send({ name: 'Device2', ip: '127.0.0.1', port: 8080, protocol: 'tcp' })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                const deviceId = res.body._id;
                request(app)
                    .put(`/api/devices/${deviceId}`)
                    .send({ name: 'Updated Device2' })
                    .expect(200)
                    .end((err, res) => {
                        if (err) return done(err);
                        expect(res.body.name).to.equal('Updated Device2');
                        done();
                    });
            });
    });

    it('should delete a device', (done) => {
        request(app)
            .post('/api/devices')
            .send({ name: 'Device3', ip: '127.0.0.1', port: 8080, protocol: 'tcp' })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                const deviceId = res.body._id;
                request(app)
                    .delete(`/api/devices/${deviceId}`)
                    .expect(204, done);
            });
    });
});
