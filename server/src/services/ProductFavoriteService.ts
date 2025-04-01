import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { ProductFavorites } from '../models/ProductFavorites';
import { getConnection, Repository } from 'typeorm';
import { Product } from '../models/ProductModel';
import { AppDataSource } from '../database/connection';
// import { VendorProductFavoritesRepository } from '../repositories/VendorProductFavouriteRepository';
// import { VendorProductFavorites } from '../models/VendorProductFavourite';

@Service()
export class ProductFavoriteService {
  private productFavoriteRepository: Repository<ProductFavorites>;

  constructor() {
    this.productFavoriteRepository = AppDataSource.getRepository(ProductFavorites);
  }

  public find(productFavorites: any): Promise<any> {
    return this.productFavoriteRepository.find(productFavorites);
  }

  public findOne(productFavorites: any): Promise<any> {
    return this.productFavoriteRepository.findOne(productFavorites);
  }

  public async create(productFavorites: any): Promise<ProductFavorites[]> {
    return this.productFavoriteRepository.save(productFavorites);
  }

  public async delete(id: number): Promise<any> {
    return this.productFavoriteRepository.delete(id);
  }
  public async listByQueryBuilder(
    limit: number,
    offset: number,
    select: any,
    whereConditions: any,
    relations: any,
    sort: any
  ): Promise<Product[] | any> {
    const query = AppDataSource.getRepository(Product).createQueryBuilder('product');

    if (select && select.length > 0) {
      query.select(select);
    }
    if (relations && relations.length > 0) {
      relations.forEach((ele: any) => {
        query.leftJoin(ele.table, ele.alias);
      });
    }
    if (whereConditions && whereConditions.length > 0) {
      whereConditions.forEach((ele: any) => {
        if (ele.op === 'where' && ele.sign === undefined) {
          query.where(`${ele.name} = ${ele.value}`);
        } else if (ele.op === 'and' && ele.sign === undefined) {
          query.andWhere(`${ele.name} = ${ele.value}`);
        } else if (ele.op === 'and' && ele.sign !== undefined) {
          query.andWhere(`${ele.name} ${ele.sign} ${ele.value}`);
        }
      });
    }
    if (sort && sort.length > 0) {
      sort.forEach((ele: any) => {
        // query.orderBy(`${ele.name}`, `${ele.order}`);
        query.addOrderBy(`product.${ele.name}`, ele.order.toUpperCase() as 'ASC' | 'DESC');
      });
    }
    if (limit && limit > 0) {
      query.limit(limit);
      query.offset(offset);
    }
    // console.log(query.getQuery(), 'query');

    return await query.getRawMany();
  }
}
