import { Op, WhereOptions } from 'sequelize';

interface ArticleQueryParams {
    userId?: number;
    id?: number;
    text?: string;
}

export function buildWhereObject({ userId, id, text }: ArticleQueryParams): WhereOptions {
    const where: WhereOptions = {};

    if (userId) {
        where.userId = userId;
    }

    if (id) {
        where.id = id;
    }

    if (text) {
        where.text = {
            [Op.iLike]: `%${text}%`,
        };
    }

    return where;
}

