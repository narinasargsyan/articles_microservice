 class ArticleRepository {
     public readonly model: any;

    constructor(model: any) {
        this.model = model;
    }

     async findAll(where?: object, order: object = {}, options: object = {}) {
         return this.model.findAll({ where, ...order, ...options });
     }

    async findOne(where: object, options: object = {}) {
        return this.model.findOne({ where, ...options } );
    }

    async create(data: object) {
        return this.model.create(data);
    }

    async update(cond: object, data: object) {
        return this.model.update(data, {
            where: cond, returning: true, new: true, plain: true,
        });
    }

    async delete(where: object) {
        return this.model.destroy({ where });
    }
}

export default ArticleRepository;
