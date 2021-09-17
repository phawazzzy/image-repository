import mongoose, { Model } from 'mongoose';
import { IDataSource } from '../interfaces';
import TYPES from '../../config/types';
import { inject, injectable } from 'inversify';

export interface IModelFactory {
    model: () => Model<any, any, any>;
}

@injectable()
export class CrudRepository {
    constructor(@inject(TYPES.IDataSource) private dbClient: IDataSource, @inject(TYPES.IModelFactory) private modelFactory: IModelFactory) {}

    async create(data: Object) {
        try {
            const res = await this.modelFactory.model().create(data);
            return res;
        } catch (error: any) {
            throw Error(error.message);
        }
    }

    async findOne(data: mongoose.FilterQuery<any>) {
        try {
            if (mongoose.connection.readyState === 0) {
                await this.dbClient.connect();
                const res = await this.modelFactory.model().findOne(data);
                return res;
            } else {
                const res = await this.modelFactory.model().findOne(data);
                return res;
            }
        } catch (error) {
            console.log({ error });

            throw Error('Error finding one record');
        }
    }

    async findById(id: string) {
        try {
            const res = await this.modelFactory.model().findById(id);
            return res;
        } catch (error) {
            throw Error('Error finding by Id');
        }
    }

    async findWithLimit(data: mongoose.FilterQuery<any>, limit: number) {
        try {
            const res = await this.modelFactory.model().find(data).limit(limit).sort({ createdAt: -1 });
            return res;
        } catch (error) {
            throw Error('Error finding by Id');
        }
    }

    async findWithLimitAndSkip(data: mongoose.FilterQuery<any>, limit: number, page = 1) {
        try {
            const skip = limit * (page - 1);
            const res = await this.modelFactory.model().find(data).skip(skip).limit(limit).sort({ createdAt: -1 });
            return res;
        } catch (error) {
            throw Error('Error finding by Id');
        }
    }

    async findAll(data?: mongoose.FilterQuery<any>) {
        try {
            const res = await this.modelFactory.model().find(data!);
            return res;
        } catch (error) {
            console.log(error);

            throw Error('Error finding all records');
        }
    }

    async updateOne(filter: mongoose.FilterQuery<any>, data: Object) {
        try {
            if (mongoose.connection.readyState === 0) {
                await this.dbClient.connect();
                const res = await this.modelFactory.model().updateOne(filter, data);
                return res;
            } else {
                const res = await this.modelFactory.model().updateOne(filter, data);
                return res;
            }
        } catch (error: any) {
            throw Error(error.message);
        }
    }

    async updateMany(filter: mongoose.FilterQuery<any>, data: Object) {
        try {
            const res = await this.modelFactory.model().updateMany(filter, data);
            return res;
        } catch (error: any) {
            throw Error(error.message);
        }
    }

    async deleteOne(data: mongoose.FilterQuery<any>) {
        try {
            const res = await this.modelFactory.model().deleteOne(data);

            return res;
        } catch (error) {
            throw Error('Error');
        }
    }

    async deleteMany(data: mongoose.FilterQuery<any>) {
        try {
            const res = await this.modelFactory.model().deleteMany(data);

            return res;
        } catch (error) {
            throw Error('Error');
        }
    }

    modelObject() {
        return this.modelFactory.model();
    }

    dataBaseClient() {
        return this.dbClient;
    }
}
