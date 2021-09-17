import { injectable } from 'inversify';
import mongoose from 'mongoose';
import config from '../../config';
import { IDataSource } from '../interfaces/datasource.interface';

@injectable()
export class MongoDBDataSource implements IDataSource {
    connect = async () => {
        try {
            const connection = await mongoose.connect(config.server.dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            });
            console.log('DB connected');
            return connection;
        } catch (error) {
            console.log(error);

            throw Error('Error connecting to repository datasource');
        }
    };
    disconnect = async () => {
        try {
            await mongoose.connection.close();
        } catch (error) {}
    };
}
