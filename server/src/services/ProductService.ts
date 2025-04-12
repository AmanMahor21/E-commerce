import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Product } from '../models/ProductModel';
import { Brackets, Like, Repository, getConnection } from 'typeorm';
import { AppDataSource } from '../database/connection';
import { ProductRating } from '../models/ProductRating';
// import { pluginModule } from '../../../../src/loaders/pluginLoader';

// import uncino from 'uncino';
// import { join } from 'path';
// const hooks = uncino();

@Service()
export class ProductService {
  private productRepository: Repository<Product>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
  }

  // new product list

  public async productListByQuery(
    limit: number,
    offset: number,
    select: any = [],
    search: any = [],
    rating: number,
    popularity: string,
    bestDeal: number,
    lowestPrice: string,
    highestPrice: string,
    freeDelivery: string,
    sortBy: string
  ): Promise<any> {
    // const queryBuilder = this.productRepository.createQueryBuilder('product');
    // const queryBuilder: any = await getConnection().getRepository(Product).createQueryBuilder('product');
    const queryBuilder = AppDataSource.getRepository(Product).createQueryBuilder('product');

    if (select && select.length > 0) {
      queryBuilder.select(select.map((field: string) => field));
    }
    queryBuilder
      .leftJoin('product.vendorProducts', 'vendorProduct')
      .leftJoin('vendorProduct.vendor', 'vendor')
      .addSelect('ANY_VALUE(vendor.companyName)', 'companyName');

    // Join and aggregate for popularity
    if (sortBy == 'popularity') {
      queryBuilder
        .leftJoin('product.orderProduct', 'OrderProduct')
        .addSelect('COUNT(OrderProduct.product_id)', 'orderCount')
        .groupBy('product.product_id');
      // .having('COUNT(OrderProduct.product_id) > 0');
    }

    // Handle search conditions
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

    const sortOptions = {
      lowToHigh: { name: 'product.price', order: 'ASC' },
      highToLow: { name: 'product.price', order: 'DESC' },
      popularity: { name: 'orderCount', order: 'DESC' },
    };

    const sortCondition = sortOptions[sortBy];
    // Filter by rating
    if (sortCondition !== undefined || null) {
      queryBuilder.addOrderBy(sortCondition.name, sortCondition.order);
    }
    if (rating && rating > 0) {
      queryBuilder.andWhere('product.rating >= :rating', { rating });
    }
    // filter by bestdeal
    if (bestDeal && bestDeal !== null) {
      queryBuilder.andWhere('product.discount >= :bestDeal', { bestDeal });
    }
    if (freeDelivery === 'true') {
      queryBuilder.andWhere('JSON_EXTRACT(product.serviceCharges, "$.shippingCost") = :freeOfCost', {
        freeOfCost: 0,
      });
    }
    // filter by price
    if (lowestPrice === 'true') {
      queryBuilder.addOrderBy(`product.price`, 'ASC');
    }
    if (highestPrice === 'true') {
      queryBuilder.addOrderBy(`product.price`, 'DESC');
    }
    // filter by popularity
    if (popularity === 'true') {
      queryBuilder.addOrderBy('orderCount', 'DESC');
    }

    queryBuilder.skip(offset);
    queryBuilder.limit(limit);

    const products = await queryBuilder.getRawMany();
    return products;
  }

  public async customProduct(
    select: any = [],
    popularity: boolean,
    whereConditions: any = [],
    relations: any = [],
    userId: number
  ): Promise<any> {
    const queryBuilder = AppDataSource.getRepository(Product).createQueryBuilder('product');

    if (select && select.length > 0) {
      queryBuilder.select(select.map((field: string) => field));
    }
    queryBuilder
      .leftJoin('product.vendorProducts', 'vendorProduct')
      .leftJoin('vendorProduct.vendor', 'vendor')
      .addSelect('ANY_VALUE(vendor.companyName)', 'companyName');
    // .addSelect('MAX(CustomerCart.id)', 'cartQuantity');

    if (userId) {
      queryBuilder
        .leftJoin('product.cart', 'CustomerCart', `CustomerCart.customerId = ${userId}`)
        .addSelect('MIN(CustomerCart.quantity)', 'cartQuantity');
    }
    // Join and aggregate for popularity
    if (popularity) {
      queryBuilder
        .leftJoin('product.orderProduct', 'OrderProduct')
        .addSelect('COUNT(OrderProduct.product_id)', 'orderCount')
        .groupBy('product.product_id');
      // .having('COUNT(OrderProduct.product_id) > 0');
    }

    // if (relations && relations.length > 0) {
    //   relations.forEach((ele: any) => {
    //     queryBuilder.leftJoin(ele.table, ele.alias, ele.condition);
    //   });
    // }

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
    const products = await queryBuilder.getRawMany();
    return products;
  }

  public async getRating(
    select: any = [],
    whereConditions: any = [],
    // relations: any = [],
    userId: number
  ): Promise<any> {
    const queryBuilder = AppDataSource.getRepository(ProductRating).createQueryBuilder('rating');

    if (select && select.length > 0) {
      queryBuilder.select(select);
      // queryBuilder.select(select.map((field: string) => field));
      // queryBuilder.select(select.map((field: string) => `rating.${field}`));
    }

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
    const products = await queryBuilder.getRawMany();
    return products;
  }

  // find product as per offset and limit
  public find(product: any): Promise<any> {
    return this.productRepository.find(product);
  }

  // find all product list
  public findAll(): Promise<any> {
    return this.productRepository.find();
  }

  // find one product
  public async findOne(findCondition: any): Promise<any> {
    return await this.productRepository.findOne(findCondition);
  }

  // product list
  public list(
    limit: number,
    offset: number,
    select: any = [],
    relation: any = [],
    whereConditions: any = [],
    search: any = [],
    price: number,
    count: number | boolean
  ): Promise<any> {
    const condition: any = {};

    if (select && select.length > 0) {
      condition.select = select;
    }

    if (relation && relation.length > 0) {
      condition.relations = relation;
    }

    condition.where = {};

    if (whereConditions && whereConditions.length > 0) {
      whereConditions.forEach((item: any) => {
        const operator: string = item.op;
        if (operator === 'where' && item.value !== '') {
          condition.where[item.name] = item.value;
        } else if (operator === 'like' && item.value !== '') {
          condition.where[item.name] = Like('%' + item.value + '%');
        }
      });
    }

    if (search && search.length > 0) {
      search.forEach((item: any) => {
        const operator: string = item.op;
        if (operator === 'like' && item.value !== '') {
          condition.where[item.name] = Like('%' + item.value + '%');
        }
      });
    }
    if (price && price === 1) {
      condition.order = {
        price: 'ASC',
        createdDate: 'DESC',
      };
    } else if (price && price === 2) {
      condition.order = {
        price: 'DESC',
        createdDate: 'DESC',
      };
    } else {
      condition.order = {
        createdDate: 'DESC',
      };
    }

    if (limit && limit > 0) {
      condition.take = limit;
      condition.skip = offset;
    }
    if (count) {
      return this.productRepository.count(condition);
    }
    return this.productRepository.find(condition);
  }

  // // create product
  // public async create(product: Product): Promise<Product> {
  //   const newProduct = await this.productRepository.save(product);
  //   return newProduct;
  // }

  // // Bulk Create
  // public async bulkCreate(productData: Product[]): Promise<any> {
  //   const newProducts = await this.productRepository.save(productData);
  //   return newProducts;
  // }

  // // update product
  // public update(id: any, product: Partial<Product>): Promise<Product> {
  //   this.log.info('Update a product');
  //   product.productId = id;
  //   return this.productRepository.save(product);
  // }

  // // delete product
  // public async delete(id: number): Promise<any> {
  //   this.log.info('Delete a product');
  //   const newProduct = await this.productRepository.delete(id);
  //   return newProduct;
  // }

  // // query builder product list
  // public async productList(
  //   limit: number,
  //   offset: number,
  //   select: any = [],
  //   searchConditions: any = [],
  //   whereConditions: any = [],
  //   categoryId: any = [],
  //   priceFrom: string,
  //   priceTo: string,
  //   price: number,
  //   count: number | boolean
  // ): Promise<any> {
  //   return await this.productRepository.productList(
  //     limit,
  //     offset,
  //     select,
  //     searchConditions,
  //     whereConditions,
  //     categoryId,
  //     priceFrom,
  //     priceTo,
  //     price,
  //     count
  //   );
  // }

  // // Recent selling product
  // public async recentProductSelling(limit: number): Promise<any> {
  //   return await this.productRepository.recentProductSelling(limit);
  // }

  // // Maximum Product price
  // public async productMaxPrice(maximum: any): Promise<any> {
  //   return await this.productRepository.productMaxPrice(maximum);
  // }

  // public async slugData(data: string): Promise<any> {
  //   return await this.productRepository.productSlug(data);
  // }

  // public async slug(data: string): Promise<any> {
  //   return await this.productRepository.productSlugData(data);
  // }

  // public async findSkuName(productId: number, skuName: string, flag: number): Promise<any> {
  //   return await this.productRepository.findSkuName(productId, skuName, flag);
  // }

  // public async validateSkuNameForVendor(
  //   productId: number,
  //   vendorId: number,
  //   skuName: string
  // ): Promise<any> {
  //   return await this.productRepository.validateSkuNameForVendor(productId, vendorId, skuName);
  // }

  // public async findProducts(productId: any): Promise<any> {
  //   return await this.productRepository.findProducts(productId);
  // }

  // public async listByQueryBuilder(
  //   limit: number,
  //   offset: number,
  //   select: any = [],
  //   whereConditions: any = [],
  //   searchConditions: any = [],
  //   relations: any = [],
  //   groupBy: any = [],
  //   sort: any = [],
  //   count: boolean = false,
  //   rawQuery: boolean = false
  // ): Promise<Product[] | any> {
  //   hooks.removeHook('variant-filter', 'variantFilter-namespace');
  //   const query: any = await getConnection().getRepository(Product).createQueryBuilder();
  //   // Select
  //   if (select && select.length > 0) {
  //     query.select(select);
  //   }
  //   // Join
  //   if (relations && relations.length > 0) {
  //     relations.forEach((joinTb: any) => {
  //       if (joinTb.op === 'left') {
  //         query.leftJoin(joinTb.tableName, joinTb.aliasName);
  //       } else if (joinTb.op === 'leftCond') {
  //         query.leftJoin(joinTb.tableName, joinTb.aliasName, joinTb.cond);
  //       } else if (joinTb.op === 'inner-select') {
  //         query.innerJoinAndSelect(joinTb.tableName, joinTb.aliasName);
  //       } else if (joinTb.op === 'left-select') {
  //         query.leftJoinAndSelect(joinTb.tableName, joinTb.aliasName);
  //       } else if (joinTb.op === 'left-select-cond') {
  //         query.leftJoinAndSelect(joinTb.tableName, joinTb.aliasName, joinTb.cond);
  //       } else {
  //         query.innerJoin(joinTb.tableName, joinTb.aliasName);
  //       }
  //     });
  //   }
  //   // Where
  //   if (whereConditions && whereConditions.length > 0) {
  //     const variant = whereConditions.find(
  //       (condition: { sign: string }) =>
  //         condition.sign === 'variant' && pluginModule.includes('ProductVariants')
  //     );
  //     let variantSql;
  //     if (variant) {
  //       await hooks.addHook('variant-filter', 'variantFilter-namespace', async () => {
  //         const VariantFilter =
  //           await require('../../../../add-ons/ProductVariants/VariantFilterProcess');
  //         return await VariantFilter.variantProcess(variant.value);
  //       });
  //       variantSql = await hooks.runHook('variant-filter');
  //     }
  //     whereConditions.forEach((item: any) => {
  //       if (item.op === 'where' && item.sign === undefined) {
  //         query.where(item.name + ' = ' + item.value);
  //       } else if (item.op === 'and' && item.sign === undefined) {
  //         query.andWhere(item.name + ' = ' + item.value);
  //       } else if (item.op === 'and' && item.sign !== undefined) {
  //         query.andWhere(" '" + item.name + "'" + ' ' + item.sign + " '" + item.value + "'");
  //       } else if (item.op === 'raw' && item.sign !== undefined) {
  //         query.andWhere(item.name + ' ' + item.sign + " '" + item.value + "'");
  //       } else if (item.op === 'rawnumber' && item.sign !== undefined) {
  //         query.andWhere(item.name + ' ' + item.sign + ' ' + item.value + '');
  //       } else if (item.op === 'rawnumberor' && item.sign !== undefined) {
  //         query.orWhere(item.name + ' ' + item.sign + ' ' + item.value + '');
  //       } else if (item.op === 'or' && item.sign === undefined) {
  //         query.orWhere(item.name + ' = ' + item.value);
  //       } else if (item.op === 'IN' && item.sign === undefined) {
  //         query.andWhere(item.name + ' IN (' + item.value + ')');
  //       } else if (item.op === 'like' && item.sign === undefined) {
  //         query.andWhere(item.name + ' like ' + " '" + item.value + "'");
  //       } else if (item.op === 'IS NULL' && item.sign === undefined) {
  //         query.andWhere(item.name + ' IS NULL ' + item.value);
  //       } else if (variant) {
  //         query.andWhere(item.name + ' IN (' + variantSql + ') ');
  //       }
  //     });
  //   }
  //   // Keyword Search
  //   if (searchConditions && searchConditions.length > 0) {
  //     console.log('searchConditions:', searchConditions);
  //     searchConditions.forEach((table: any) => {
  //       if (
  //         table.op === undefined &&
  //         table.name &&
  //         table.name instanceof Array &&
  //         table.name.length > 0 &&
  //         table.value &&
  //         table.value instanceof Array &&
  //         table.value.length > 0
  //       ) {
  //         const namesArray = table.name;
  //         namesArray.forEach((name: string, index: number) => {
  //           query.andWhere(
  //             new Brackets((qb) => {
  //               const valuesArray = table.value;
  //               valuesArray.forEach((value: string | number, subIndex: number) => {
  //                 if (subIndex === 0) {
  //                   qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + "'%" + value + "%'");
  //                   return;
  //                 }
  //                 qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + "'%" + value + "%'");
  //               });
  //             })
  //           );
  //         });
  //       } else if (
  //         table.op === undefined &&
  //         table.name &&
  //         table.name instanceof Array &&
  //         table.name.length > 0
  //       ) {
  //         query.andWhere(
  //           new Brackets((qb) => {
  //             const namesArray = table.name;
  //             namesArray.forEach((name: string, index: number) => {
  //               if (index === 0) {
  //                 qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + "'%" + table.value + "%'");
  //                 return;
  //               }
  //               qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + "'%" + table.value + "%'");
  //             });
  //           })
  //         );
  //       } else if (
  //         table.op === undefined &&
  //         table.value &&
  //         table.value instanceof Array &&
  //         table.value.length > 0
  //       ) {
  //         query.andWhere(
  //           new Brackets((qb) => {
  //             const valuesArray = table.value;
  //             valuesArray.forEach((value: string | number, index: number) => {
  //               if (index === 0) {
  //                 qb.andWhere('LOWER(' + table.name + ')' + ' LIKE ' + "'%" + value + "%'");
  //                 return;
  //               }
  //               qb.orWhere('LOWER(' + table.name + ')' + ' LIKE ' + "'%" + value + "%'");
  //             });
  //           })
  //         );
  //       } else if (
  //         table.op === 'attribute' &&
  //         table.op !== undefined &&
  //         table.name &&
  //         table.name instanceof Array &&
  //         table.name.length > 0 &&
  //         table.value &&
  //         table.value instanceof Array &&
  //         table.value.length > 0 &&
  //         pluginModule.includes('ProductAttribute')
  //       ) {
  //         const namesArray = table.name;
  //         namesArray.forEach((name: string, index: number) => {
  //           query.andWhere(
  //             new Brackets((qb) => {
  //               const valuesArray = table.value;
  //               valuesArray.forEach((value: any, subIndex: number) => {
  //                 if (subIndex === 0) {
  //                   qb.andWhere(
  //                     'LOWER(' +
  //                       name +
  //                       ')' +
  //                       ' LIKE ' +
  //                       "'%" +
  //                       this.addSlashes(
  //                         value.name.toLowerCase().trim() + '-' + value.value.toLowerCase().trim()
  //                       ) +
  //                       "%'"
  //                   );
  //                   return;
  //                 }
  //                 qb.orWhere(
  //                   'LOWER(' +
  //                     name +
  //                     ')' +
  //                     ' LIKE ' +
  //                     "'%" +
  //                     this.addSlashes(
  //                       value.name.toLowerCase().trim() + '-' + value.value.toLowerCase().trim()
  //                     ) +
  //                     "%'"
  //                 );
  //               });
  //             })
  //           );
  //         });
  //       }
  //     });
  //   }

  //   // GroupBy
  //   if (groupBy && groupBy.length > 0) {
  //     let i = 0;
  //     groupBy.forEach((item: any) => {
  //       if (i === 0) {
  //         query.groupBy(item.name);
  //       } else {
  //         query.addGroupBy(item.name);
  //       }
  //       i++;
  //     });
  //   }
  //   // orderBy
  //   if (sort && sort.length > 0) {
  //     sort.forEach((item: any) => {
  //       query.orderBy('' + item.name + '', '' + item.order + '');
  //     });
  //   }
  //   // Limit & Offset
  //   if (limit && limit > 0) {
  //     query.limit(limit);
  //     query.offset(offset);
  //   }
  //   if (!count) {
  //     if (rawQuery) {
  //       return query.getRawMany();
  //     }
  //     return query.getMany();
  //   } else {
  //     return query.getCount();
  //   }
  // }

  // public addSlashes(str: string): string {
  //   return (str + '').replace(/'/g, "''");
  // }

  // public async checkSlug(slug: string, id: number, count: number = 0): Promise<number> {
  //   if (count > 0) {
  //     slug = slug + count;
  //   }
  //   return await this.productRepository.checkSlugData(slug, id);
  // }
}
