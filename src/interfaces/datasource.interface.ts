export interface IDataSource {
    connect: () => Promise<any>;
    disconnect: () => Promise<any>;
}
