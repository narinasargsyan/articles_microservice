class ArticleRepository<T> {
    public readonly model: any;

    constructor(model: any) {
        this.model = model;
    }

    async findAll(where: object, order: object = {}, options: object = {}): Promise<T> {
        return this.model.findAll({ where, ...order, ...options });
    }

    async findOne(where: object, options: object = {}): Promise<T> {
        return this.model.findOne({ where, ...options } );
    }

    async create(data: object): Promise<T> {
        return this.model.create(data);
    }

    async update(cond: object, data: object): Promise<T> {
        return this.model.update(data, {
            where: cond, returning: true, new: true, plain: true,
        });
    }

    async delete(where: object): Promise<void> {
        return this.model.destroy({ where });
    }
}

export default ArticleRepository;


