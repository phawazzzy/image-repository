import 'reflect-metadata';
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { InversifyExpressServer } from 'inversify-express-utils';
import config from '../config';
import { container } from '../inversify.config';
import logging from '../config/logging';
import { MongoDBDataSource } from './datasources/mongodb.datasource';
import './ioc';

const NAMESPACE = 'Server';
const port = config.server.port;

const server = new InversifyExpressServer(container);
server.setConfig((app) => {
    app.use(
        express.urlencoded({
            extended: true
        })
    );

    app.use(express.json());
    app.use(cors());
});

const app: Application = server.build();

app.use((req: Request, res: Response, next) => {
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.headers['x-forwarded-for'] || req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.headers['x-forwarded-for'] || req.socket.remoteAddress}]`);
    });

    next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    return next();
});

app.get('/', (_: Request, res: Response) => {
    res.send(`Online on ${new Date()}`);
});

app.use((_: Request, res: Response, __: NextFunction) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

new MongoDBDataSource()
    .connect()
    .then((_) => {
        app.listen(port, () => logging.info(NAMESPACE, `Server is running..  ${config.server.hostname}:${config.server.port}`));
    })
    .catch((err) => {
        logging.info(NAMESPACE, `Error connecting to the DB`);
    });
