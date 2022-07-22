export interface IWriter<T> {
    create(item: Omit<T, "id">): Promise<T>;
    createMany(item: Omit<T, "id">[]): Promise<T[]>;
    update(id: string, item: Partial<T>): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}
export interface IReader<T> {
    find(item: Partial<T>): Promise<T[]>;
    findOne(id: string | Partial<T>): Promise<T>;
    exist(id: string | Partial<T>): Promise<boolean>;
}

export interface IBaseRepository<T> extends IWriter<T>, IReader<T> {}
