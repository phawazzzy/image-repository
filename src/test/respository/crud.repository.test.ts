import 'reflect-metadata';
import { expect } from 'chai';
import 'mocha';
import dotenv from 'dotenv';
import { CrudRepository } from '../../repository';
import { MongoDBDataSource } from '../../datasources/mongodb.datasource';
import { ObjectId } from 'mongodb';
import { UserModel } from '../../models';
dotenv.config();

const randomEmail = () => {
    return 'email' + new Date().toString() + Math.random();
};
describe('Crud Repository', () => {
    let crudRepo: CrudRepository;
    beforeEach(() => {
        const userModel = new UserModel();
        const mongoDbDataSource = new MongoDBDataSource();
        crudRepo = new CrudRepository(mongoDbDataSource, userModel);
    });

    describe('Create', () => {
        it('creates record', async () => {
            // const crudRepo = new CrudRepository();
            try {
                await crudRepo.create({ firstName: 'Hello', email: randomEmail(), password: 'hash', createdAt: new Date(), updatedAt: new Date() });
                expect(1).to.eq(1);
            } catch (error) {
                expect(1).to.eq(2);
            }
        });

        it('throws error for incomplete fields', async () => {
            // const crudRepo = new CrudRepository();
            try {
                const response = await crudRepo.create({ email: randomEmail(), createdAt: new Date(), updatedAt: new Date() });

                const id = response['_id'];
                await crudRepo.findById(id);

                expect(1).to.eq(2);
            } catch (error) {
                expect(1).to.eq(1);
            }
        });
    });

    describe('FindyById', () => {
        it('fetches record', async () => {
            // const crudRepo = new CrudRepository();
            try {
                const response = await crudRepo.create({ firstName: 'Hello', email: randomEmail(), password: 'hash', createdAt: new Date(), updatedAt: new Date() });

                const id = response['_id'];
                await crudRepo.findById(id);

                expect(1).to.eq(1);
            } catch (error) {
                console.log(error);

                expect(1).to.eq(2);
            }
        });

        it('tests findById throws error', async () => {
            // const crudRepo = new CrudRepository();
            try {
                const id = 'response';
                await crudRepo.findById(id);

                expect(1).to.eq(3);
            } catch (error) {
                expect(1).to.eq(1);
            }
        });
    });

    describe('FindOne', () => {
        it('fetches record', async () => {
            // const crudRepo = new CrudRepository();
            try {
                const response = await crudRepo.create({ firstName: 'Hello', email: randomEmail(), password: 'hash', createdAt: new Date(), updatedAt: new Date() });

                const id = response['_id'];
                await crudRepo.findOne({ _id: id });

                expect(1).to.eq(1);
            } catch (error) {
                console.log(error);

                expect(1).to.eq(2);
            }
        });

        it('throws error for wrong value', async () => {
            // const crudRepo = new CrudRepository();
            try {
                const id = new ObjectId().toHexString();
                await crudRepo.findOne({ _id: id });
                expect(1).to.eq(2);
            } catch (error) {
                expect(1).to.eq(1);
            }
        });
    });

    describe('FindAll', () => {
        it('fetches all record', async () => {
            // const crudRepo = new CrudRepository();
            try {
                await crudRepo.findAll({ email: 'email' });

                expect(1).to.eq(1);
            } catch (error) {
                expect(1).to.eq(2);
            }
        });

        it('tests findall throws error', async () => {
            // const crudRepo = new CrudRepository();
            try {
                await crudRepo.findAll({ pen: 'pen' });

                expect(1).to.eq(1);
            } catch (error) {
                expect(1).to.eq(2);
            }
        });
    });

    describe('UpdateOne', () => {
        it('updates record', async () => {
            // const crudRepo = new CrudRepository();
            try {
                const response = await crudRepo.create({ firstName: 'Hello', email: randomEmail(), password: 'hash', createdAt: new Date(), updatedAt: new Date() });

                const id = response['_id'];
                await crudRepo.updateOne({ _id: id }, { email: randomEmail() });

                expect(1).to.eq(1);
            } catch (error) {
                expect(1).to.eq(2);
            }
        });

        it('throws error for wrong value', async () => {
            // const crudRepo = new CrudRepository();
            try {
                const id = new ObjectId().toHexString();
                await crudRepo.updateOne({ _id: id }, { email: 'email@email.com' });
                expect(1).to.eq(2);
            } catch (error) {
                expect(1).to.eq(1);
            }
        });
    });

    describe('UpdateMany', () => {
        it('updates many', async () => {
            // const crudRepo = new CrudRepository();
            try {
                const response = await crudRepo.create({ firstName: 'Hello', email: randomEmail(), password: 'hash', createdAt: new Date(), updatedAt: new Date() });

                const id = response['_id'];
                await crudRepo.updateMany({ _id: id }, { email: randomEmail() });

                expect(1).to.eq(1);
            } catch (error) {
                console.log(error);

                expect(1).to.eq(2);
            }
        });

        it('throws error for wrong value', async () => {
            // const crudRepo = new CrudRepository();
            try {
                const id = new ObjectId().toHexString();
                await crudRepo.updateMany({ _id: id }, { email: 'email@email.com' });
                expect(1).to.eq(2);
            } catch (error) {
                expect(1).to.eq(1);
            }
        });
    });

    describe('DeleteOne', () => {
        it('deletes record', async () => {
            // const crudRepo = new CrudRepository();
            try {
                const response = await crudRepo.create({ firstName: 'Hello', email: randomEmail(), password: 'hash', createdAt: new Date(), updatedAt: new Date() });

                const id = response['_id'];
                await crudRepo.deleteOne({ _id: id });

                expect(1).to.eq(1);
            } catch (error) {
                expect(1).to.eq(2);
            }
        });

        it('throws error for wrong value', async () => {
            // const crudRepo = new CrudRepository();
            try {
                const id = new ObjectId().toHexString();
                await crudRepo.deleteOne({ _id: id });
                expect(1).to.eq(2);
            } catch (error) {
                expect(1).to.eq(1);
            }
        });
    });

    describe('DeletMany', () => {
        it('deletes many', async () => {
            // const crudRepo = new CrudRepository();
            try {
                const response = await crudRepo.create({ firstName: 'Hello', email: randomEmail(), password: 'hash', createdAt: new Date(), updatedAt: new Date() });

                const id = response['_id'];
                await crudRepo.deleteMany({ _id: id });

                expect(1).to.eq(1);
            } catch (error) {
                expect(1).to.eq(2);
            }
        });

        it('throws error for wrong value', async () => {
            // const crudRepo = new CrudRepository();
            try {
                const id = new ObjectId().toHexString();
                await crudRepo.deleteMany({ _id: id });
                expect(1).to.eq(2);
            } catch (error) {
                expect(1).to.eq(1);
            }
        });
    });
});
