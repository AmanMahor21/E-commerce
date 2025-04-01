import 'reflect-metadata';
import { Service } from 'typedi';
import { CustomerCart } from '../models/CustomerCart';
import { DeleteResult, In, Like, Repository } from 'typeorm';
import { AppDataSource } from '../database/connection';

@Service()
export class CustomerCartService {
  private customerCartRepository: Repository<CustomerCart>;
  constructor() {
    this.customerCartRepository = AppDataSource.getRepository(CustomerCart); // ✅ Use AppDataSource directly
  }

  public async createData(checkoutdata: any): Promise<CustomerCart> {
    return this.customerCartRepository.save(checkoutdata);
  }

  public find(order: any): Promise<CustomerCart[]> {
    return this.customerCartRepository.find(order);
  }

  public findById(id: number): Promise<any> {
    return this.customerCartRepository.find({
      select: ['name', 'quantity', 'productPrice', 'total'],
    });
  }

  public async update(cartId: number[], customerId: number): Promise<void> {
    await this.customerCartRepository.update({ id: In(cartId) }, { customerId });
  }

  public async list(
    limit: number,
    offset: number,
    select: any[],
    relation: any = [],
    whereConditions: any = [],
    selectFields: any = [],
    count: number | boolean
  ): Promise<any> {
    // const condition: any = {};
    const query: any = this.customerCartRepository.createQueryBuilder('CustomerCart');

    if (select && select.length > 0) {
      query.select(select);
    }
    // condition.where = {};

    if (relation && relation.length > 0) {
      relation.forEach((ele: any) => {
        query.leftJoin(ele.table, ele.alias, ele.condition);
      });
    }
    if (selectFields && selectFields.length > 0) {
      selectFields.forEach((ele: any) => {
        query.addSelect(ele.value, ele.alias);
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

    // if (search && search.length > 0) {
    //   search.forEach((table: any) => {
    //     const operator: string = table.op;
    //     if (operator === 'where' && table.value !== '') {
    //       condition.where[table.name] = table.value;
    //     } else if (operator === 'like' && table.value !== '') {
    //       condition.where[table.name] = Like('%' + table.value + '%');
    //     }
    //   });
    // }
    if (limit && limit > 0) {
      query.limit(limit);
      query.offset(offset);
    }
    query.order = {
      createdDate: 'DESC',
    };
    query.groupBy('CustomerCart.productId');
    if (count) {
      // return this.customerCartRepository.count(condition);
    } else {
      // return this.customerCartRepository.find(condition);
      // console.log(query.getQuery(), 'query');

      return await query.getRawMany();
    }
  }
  // public async list(
  //   limit: number,
  //   offset: number,
  //   select: string[],
  //   whereConditions: any[] = [],
  //   count: boolean
  // ): Promise<any> {
  //   const queryBuilder = this.customerCartRepository
  //     .createQueryBuilder('CustomerCart')
  //     .leftJoin('CustomerCart.product', 'product')
  //     .leftJoin('product.vendorProducts', 'vendorProduct')
  //     .leftJoin('vendorProduct.vendor', 'vendor')
  //     .leftJoin(
  //       'product.productDiscount',
  //       'productDiscount'
  //       // 'productDiscount.priority = 1 AND productDiscount.date_start <= CURRENT_DATE AND productDiscount.date_end >= CURRENT_DATE'
  //     );

  //   // Dynamically apply select fields
  //   if (select.length > 0) {
  //     queryBuilder.select(select);
  //   }

  //   // Apply WHERE conditions dynamically
  //   whereConditions.forEach((condition: any) => {
  //     console.log(condition, 'cnonnnn');
  //     if (condition.op === 'where') {
  //       // queryBuilder.andWhere(`${condition.name} = :value`, { value: condition.value });
  //       queryBuilder.andWhere('CustomerCart.customer_id = :customerId', { customerId: 373 });
  //     }
  //   });

  //   // Apply GROUP BY (for aggregations)
  //   queryBuilder.groupBy('CustomerCart.customerId');

  //   // Apply pagination
  //   queryBuilder.offset(offset);
  //   queryBuilder.limit(limit);
  //   console.log(queryBuilder.getQuery(), 'query');
  //   console.log(await queryBuilder.getRawMany(), 'lllllllllllll');

  //   // Return count if requested
  //   if (count) {
  //     return queryBuilder.getCount();
  //   } else {
  //     return await queryBuilder.getRawMany();
  //   }
  // }

  // findOne cart

  public findOne(productData: any): Promise<any> {
    return this.customerCartRepository.findOne(productData);
  }

  // delete cart
  public async delete(id: any): Promise<DeleteResult> {
    const newProduct = await this.customerCartRepository.delete(id);
    return newProduct;
  }

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
  // ): Promise<CustomerCart[] | number> {
  //   const query: any = await getConnection().getRepository(CustomerCart).createQueryBuilder();
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
  //       } else if (joinTb.op === 'inner-cond') {
  //         query.innerJoin(joinTb.tableName, joinTb.aliasName, joinTb.cond);
  //       } else {
  //         query.innerJoin(joinTb.tableName, joinTb.aliasName);
  //       }
  //     });
  //   }
  //   // Where
  //   if (whereConditions && whereConditions.length > 0) {
  //     whereConditions.forEach((item: any) => {
  //       if (item.op === 'where' && item.sign === undefined) {
  //         query.where(item.name + ' = ' + item.value);
  //       } else if (item.op === 'and' && item.sign === undefined) {
  //         query.andWhere(item.name + ' = ' + item.value);
  //       } else if (item.op === 'and' && item.sign !== undefined) {
  //         query.andWhere(" '" + item.name + "'" + ' ' + item.sign + " '" + item.value + "'");
  //       } else if (item.op === 'raw' && item.sign !== undefined) {
  //         query.andWhere(item.name + ' ' + item.sign + " '" + item.value + "'");
  //       } else if (item.op === 'or' && item.sign === undefined) {
  //         query.orWhere(item.name + ' = ' + item.value);
  //       } else if (item.op === 'IN' && item.sign === undefined) {
  //         query.andWhere(item.name + ' IN (' + item.value + ')');
  //       } else if (item.op === 'IS NULL' && item.sign === undefined) {
  //         query.orWhere(item.name + 'IS NULL' + item.value);
  //       } else if (item.op === 'AND NULL' && item.sign === undefined) {
  //         query.andWhere(item.name + ' IS NULL' + item.value);
  //       } else if (item.op === 'where' && item.sign === 'like') {
  //         query.andWhere('LOWER(' + item.name + ")LIKE '%" + item.value + "%'");
  //       } else if (item.op === 'where' && item.sign === 'not like') {
  //         query.andWhere('LOWER(' + item.name + ")NOT LIKE '%" + item.value + "%'");
  //       }
  //     });
  //   }
  //   // Keyword Search
  //   if (searchConditions && searchConditions.length > 0) {
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
  //       } else if (table.op === 'NOT' && table.name && table.name instanceof Array && table.name.length > 0) {
  //         query.andWhere(
  //           new Brackets((qb) => {
  //             const namesArray = table.name;
  //             namesArray.forEach((name: string, index: number) => {
  //               if (index === 0) {
  //                 qb.andWhere('LOWER(' + name + ')' + 'NOT LIKE ' + "'%" + table.value + "%'");
  //                 return;
  //               }
  //               qb.orWhere('LOWER(' + name + ')' + ' NOT LIKE ' + "'%" + table.value + "%'");
  //             });
  //           })
  //         );
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
}
