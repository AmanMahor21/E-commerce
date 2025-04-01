import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Address } from '../models/Address';
import { getConnection, Repository } from 'typeorm';
import { AppDataSource } from '../database/connection';

@Service()
export class AddressService {
  private addressRepository: Repository<Address>;

  constructor() {
    this.addressRepository = AppDataSource.getRepository(Address); // ✅ Use AppDataSource directly
  }
  // constructor(@InjectRepository(Address) private addressRepository: Repository<Address>) {}

  // // create address
  public async create(address: Address): Promise<any> {
    return this.addressRepository.save(address);
  }

  // find Condition
  public findOne(address: any): Promise<any> {
    return this.addressRepository.findOne(address);
  }
  // update address
  public update(id: number, address: Address): Promise<any> {
    address.addressId = id;
    return this.addressRepository.save(address);
  }

  // address List

  public async list(
    limit: number,
    offset: number,
    select: any = [],
    relations: any = [],
    whereConditions: any = [],
    count: number | boolean
  ): Promise<Address[] | any> {
    const query: any = await AppDataSource.getRepository(Address).createQueryBuilder('address');
    if (select && select.length > 0) {
      query.select(select);
    }

    console.log(relations, 'ree');
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
    //   if (sort && sort.length > 0) {
    //     sort.forEach((ele: any) => {
    //       query.orderBy(`${ele.name}`, `${ele.order}`);
    //     });
    //   }
    if (limit && limit > 0) {
      query.limit(limit);
      query.offset(offset);
    }

    return await query.getRawMany();
    // const condition: any = {};
    // condition.where = {};

    // if (select && select.length > 0) {
    //     condition.select = select;
    // }

    // if (relations && relations.length > 0) {
    //     condition.relations = relations;
    // }

    // if (whereConditions && whereConditions.length > 0) {
    //     whereConditions.forEach((item: any) => {
    //         condition.where[item.name] = item.value;
    //     });
    // }

    // condition.order = {
    //     createdDate: 'DESC',
    // };

    // if (limit && limit > 0) {
    //     condition.take = limit;
    //     condition.skip = offset;
    // }
    // if (count) {
    //     return this.addressRepository.count(condition);
    // } else {
    //     return this.addressRepository.find(condition);
    // }
  }

  // delete address
  public async delete(id: number): Promise<any> {
    await this.addressRepository.delete(id);
    return 1;
  }

  // find Customer addresses
  public find(address: any): Promise<any> {
    return this.addressRepository.find(address);
  }
}
