import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Category } from '../models/CategoryModel';
import { Like, Repository } from 'typeorm/index';
import { AppDataSource } from '../database/connection';
@Service()
export class CategoryService {
  private categoryRepository: Repository<Category>;

  constructor() {
    this.categoryRepository = AppDataSource.getRepository(Category);
  }
  // create Category
  public async create(category: any): Promise<Category> {
    return this.categoryRepository.save(category);
  }
  // findone category
  public findOne(category: any): Promise<any> {
    return this.categoryRepository.findOne(category);
  }
  // delete Category
  public async delete(id: number): Promise<any> {
    await this.categoryRepository.delete(id);
    return;
  }
  // categoryList
  public async list(
    limit: any,
    offset: any,
    select: any = [],
    search: any = [],
    whereConditions: any = [],
    relation: any[] = [],
    sortOrder: number,
    count: number | boolean
  ): Promise<any> {
    const queryBuilder = AppDataSource.getRepository(Category).createQueryBuilder('category');

    // SELECT columns
    if (select.length > 0) {
      queryBuilder.select(select);
    }

    // JOIN relations
    // relation.forEach((rel) => {
    //   qb.leftJoinAndSelect(`${alias}.${rel}`, rel);
    // });

    // WHERE conditions
    if (whereConditions && whereConditions.length > 0) {
      whereConditions.forEach((ele: any) => {
        if (ele.op === 'where' && ele.sign === undefined) {
          queryBuilder.where(`${ele.name} = ${ele.value}`);
        } else if (ele.op === 'and' && ele.sign === undefined) {
          queryBuilder.andWhere(`${ele.name} = ${ele.value}`);
        } else if (ele.op === 'and' && ele.sign !== undefined) {
          queryBuilder.andWhere(`${ele.name} ${ele.sign} ${ele.value}`);
        }
      });
    }
    // SEARCH conditions
    if (search && search.length > 0) {
      search.forEach((condition: any) => {
        if (Array.isArray(condition.name) && condition.value && condition.value !== null) {
          const columnCondition = condition.name.map((col: any) => `${col} LIKE :keyword`).join(' OR ');
          queryBuilder.andWhere(`(${columnCondition})`, {
            keyword: `%${condition.value}%`,
          });
        }
      });
    }

    // SORTING
    // qb.orderBy(`${alias}.sortOrder`, sortOrder === 2 ? 'DESC' : 'ASC').addOrderBy(
    //   `${alias}.createdDate`,
    //   'DESC'
    // );

    // PAGINATION
    if (limit && limit > 0) {
      queryBuilder.take(limit);
      queryBuilder.skip(offset);
    }

    // COUNT or FETCH
    if (count) {
      return queryBuilder.getCount();
    } else {
      return await queryBuilder.getRawMany();
    }
  }
  // public list(
  //   limit: any,
  //   offset: any,
  //   select: any = [],
  //   search: any = [],
  //   whereConditions: any = [],
  //   relation: any[] = [],
  //   sortOrder: number,
  //   count: number | boolean
  // ): Promise<any> {
  //   const condition: any = {};

  //   if (select && select.length > 0) {
  //     condition.select = select;
  //   }
  //   condition.where = {};
  //   if (whereConditions && whereConditions.length > 0) {
  //     whereConditions.forEach((item: any) => {
  //       condition.where[item.name] = item.value;
  //     });
  //   }

  //   if (relation?.length) {
  //     condition.relations = [...relation];
  //   }

  //   if (search && search.length > 0) {
  //     search.forEach((table: any) => {
  //       const operator: string = table.op;
  //       if (operator === 'where' && table.value !== undefined) {
  //         condition.where[table.name] = table.value;
  //       } else if (operator === 'like' && table.value !== undefined) {
  //         condition.where[table.name] = Like('%' + table.value + '%');
  //       }
  //     });
  //   }

  //   if (limit && limit > 0) {
  //     condition.take = limit;
  //     condition.skip = offset;
  //   }

  //   condition.order = { sortOrder: sortOrder === 2 ? 'DESC' : 'ASC', createdDate: 'DESC' };
  //   if (count) {
  //     return this.categoryRepository.count(condition);
  //   }
  //   return this.categoryRepository.find(condition);
  // }
  // find category
  public find(category: any): Promise<any> {
    return this.categoryRepository.find(category);
  }

  // public async slugData(data: string): Promise<any> {
  //     return await this.categoryRepository.categorySlug(data);
  // }

  public findAll(): Promise<any> {
    return this.categoryRepository.find();
  }

  // public async slug(data: string): Promise<any> {
  //     return await this.categoryRepository.categorySlugData(data);
  // }

  // public async categoryCount(limit: number, offset: number, keyword: string, sortOrder: number, status: string): Promise<any> {
  //     return await this.categoryRepository.categoryCount(limit, offset, keyword, sortOrder, status);
  // }

  // public async checkSlug(slug: string, id: number, count: number = 0): Promise<number> {
  //     if (count > 0) {
  //         slug = slug + count;
  //     }
  //     return await this.categoryRepository.checkSlugData(slug, id);
  // }

  // public async findCategory(categoryName: string, parentId: number): Promise<any> {
  //     return await this.categoryRepository.findCategory(categoryName, parentId);
  // }
}
