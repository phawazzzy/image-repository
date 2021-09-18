import { inject, injectable, named } from 'inversify';
import { CrudRepository } from '.';
import TYPES from '../../config/types';
import { MongoDBDataSource } from '../datasources/mongodb.datasource';
import { ImageRepoModel } from '../models/repository.model';

@injectable()
export class ImageRepoRepository extends CrudRepository {
    constructor(@inject(TYPES.IDataSource) dbClient: MongoDBDataSource, @inject(TYPES.IModelFactory) @named('imageRepoModel') modelFactory: ImageRepoModel) {
        super(dbClient, modelFactory);
    }
}
