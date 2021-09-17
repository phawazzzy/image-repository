import { inject, injectable, named } from 'inversify';
import TYPES from '../../config/types';
import { MongoDBDataSource } from '../datasources/mongodb.datasource';
import { UserModel } from '../models/user.model';
import { CrudRepository } from './crud.repository';

@injectable()
export class UserRepository extends CrudRepository {
    constructor(@inject(TYPES.IDataSource) dbClient: MongoDBDataSource, @inject(TYPES.IModelFactory) @named('userModel') modelFactory: UserModel) {
        super(dbClient, modelFactory);
    }
}
