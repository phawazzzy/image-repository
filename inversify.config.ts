import { Container } from 'inversify';
import TYPES from './config/types';
import { MongoDBDataSource } from './src/datasources/mongodb.datasource';
import { IDataSource } from './src/interfaces';
import { UserModel, OtpModel } from './src/models';
import { ImageRepoModel } from './src/models/repository.model';
import { CrudRepository, IModelFactory, UserRepository } from './src/repository';
import { ImageRepoRepository } from './src/repository/image-repo.repository';
import { OtpRepository } from './src/repository/otp.repository';
import { AWSFileUploader } from './src/services/awsFileuploader.service';
import { ImageRepositoryService } from './src/services/imageRepository.service';
import { OtpService } from './src/services/otp.service';
import { UserService } from './src/services/user.service';

const container = new Container();
// Datasource
container.bind<CrudRepository>(TYPES.CrudRepository).to(CrudRepository);
container.bind<IDataSource>(TYPES.IDataSource).to(MongoDBDataSource);
container.bind<MongoDBDataSource>(TYPES.MongodbClient).to(MongoDBDataSource);

// REPOSITORY
container.bind<UserRepository>(TYPES.UserRepositry).to(UserRepository);
container.bind<OtpRepository>(TYPES.OtpRepository).to(OtpRepository);
container.bind<ImageRepoRepository>(TYPES.ImageRepoRepository).to(ImageRepoRepository);

//SERVICE
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<OtpService>(TYPES.OtpService).to(OtpService);
container.bind<AWSFileUploader>(TYPES.AWSFileUploader).to(AWSFileUploader);
container.bind<ImageRepositoryService>(TYPES.ImageRepoService).to(ImageRepositoryService);

//MODELS
container.bind<IModelFactory>(TYPES.IModelFactory).to(UserModel).whenTargetNamed('userModel');
container.bind<IModelFactory>(TYPES.IModelFactory).to(OtpModel).whenTargetNamed('otpModel');
container.bind<IModelFactory>(TYPES.IModelFactory).to(ImageRepoModel).whenTargetNamed('imageRepoModel');

export { container };
