class UserRepository<T> {
    public readonly model: any;

    constructor(table: T) {
        this.model = table;
    }

    async create(data: object, transaction: object = {}): Promise<T> {
        return this.model.create(data, { ...transaction });
    }

    async update(cond: object, data: object, transaction: object = {}): Promise<T> {
        return this.model.update(data, {
            where: cond, returning: true, new: true, plain: true, ...transaction,
        });
    }

    async delete(where: object, transaction: object): Promise<void> {
        return this.model.destroy({ where }, { ...transaction });
    }
}

export default UserRepository;
