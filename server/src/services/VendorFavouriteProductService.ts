import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { ProductFavorites } from '../models/ProductFavorites';
// import { ProductFavoritesRepository } from '../repositories/ProductFavoriteRepository';
import { getConnection, Repository } from 'typeorm';
import { Product } from '../models/ProductModel';
import { VendorProductFavorites } from '../models/VendorProductFavourite';
import { AppDataSource } from '../database/connection';

@Service()
export class VendorProductFavoriteService {
  private vendorProductFavoritesRepository: Repository<VendorProductFavorites>;

  constructor() {
    this.vendorProductFavoritesRepository = AppDataSource.getRepository(VendorProductFavorites);
  }

  public find(productFavorites: any): Promise<any> {
    return this.vendorProductFavoritesRepository.find(productFavorites);
  }

  public findOne(productFavorites: any): Promise<any> {
    return this.vendorProductFavoritesRepository.findOne(productFavorites);
  }
  public async create(productFavorites: any): Promise<ProductFavorites[]> {
    return this.vendorProductFavoritesRepository.save(productFavorites);
  }

  public async delete(id: number): Promise<any> {
    return this.vendorProductFavoritesRepository.delete(id);
  }
  public async listByQueryBuilder(
    limit: number,
    offset: number,
    select: any,
    whereConditions: any,
    relations: any,
    sort: any
  ): Promise<Product[] | any> {
    const query: any = await getConnection().getRepository(Product).createQueryBuilder('product');

    if (select && select.length > 0) {
      query.select(select);
    }
    if (relations && relations.length > 0) {
      relations.forEach((ele: any) => {
        query.innerJoin(ele.table, ele.alias);
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
        query.orderBy(`${ele.name}`, `${ele.order}`);
      });
    }
    if (limit && limit > 0) {
      query.limit(limit);
      query.offset(offset);
    }

    return await query.getRawMany();
  }
}
