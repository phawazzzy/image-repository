import { inject, injectable, named } from 'inversify';
import TYPES from '../../config/types';
import { MongoDBDataSource } from '../datasources/mongodb.datasource';
import { OtpModel } from '../models';
import { CrudRepository } from './crud.repository';
import mongoose from 'mongoose';

@injectable()
export class OtpRepository extends CrudRepository {
    constructor(@inject(TYPES.IDataSource) dbClient: MongoDBDataSource, @inject(TYPES.IModelFactory) @named('otpModel') modelFactory: OtpModel) {
        super(dbClient, modelFactory);
    }

    async findLastRecord(filter: mongoose.FilterQuery<any>) {
        try {
            const res = await (await this.modelObject()).findOne(filter).limit(1).sort({ $natural: -1 });
            return res;
        } catch (error) {
            throw Error('Error');
        }
    }
}
