import * as express from 'express';
import jwt from 'jsonwebtoken';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from '../models/User';
import { Customer } from '../models/Customer';
// import { Logger, LoggerInterface } from '../decorators/Logger';
import { Vendor } from '../models/Vendor';
import { AccessToken } from '../models/AccessTokenModel';
import { UserGroup } from '../models/UserGroup';
import { Repository } from 'typeorm';
import { AppDataSource } from '../database/connection';

@Service()
export class AuthService {
  private userRepository: Repository<User>;
  private customerRepository: Repository<Customer>;
  private vendorRepository: Repository<Vendor>;
  private userGroupRepository: Repository<UserGroup>;
  private accessTokenRepository: Repository<AccessToken>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.customerRepository = AppDataSource.getRepository(Customer);
    this.vendorRepository = AppDataSource.getRepository(Vendor);
    this.userGroupRepository = AppDataSource.getRepository(UserGroup);
    this.accessTokenRepository = AppDataSource.getRepository(AccessToken);
  }

  public async parseBasicAuthFromRequest(req: express.Request): Promise<any> {
    const authorization = req.header('authorization');
    if (authorization && authorization.split(' ')[0] === 'Bearer') {
      // this.log.info('Credentials provided by the client');
      if (!authorization) {
        return undefined;
      }
      const UserId = await this.decryptToken(authorization.split(' ')[1]);
      console.log(JSON.stringify(UserId) + 'UserId:');
      return UserId;
    }
    // this.log.info('No credentials provided by the client');
    return undefined;
  }

  public async decryptToken(encryptString: string): Promise<any> {
    const Crypto = require('crypto-js');
    const bytes = Crypto.AES.decrypt(encryptString, process.env.CRYPTO_SECRET);
    const originalEncryptedString = bytes.toString(Crypto.enc.Utf8);

    // if (originalEncryptedString) {
    //   const checkTokenRevoke: any = await this.accessTokenRepository.findOne({
    //     where: {
    //       token: originalEncryptedString,
    //     },
    //   });
    //   console.log(checkTokenRevoke, ':checkTokenRevoke');
    //   if (!checkTokenRevoke) {
    //     // this.log.warn('Invalid token');
    //     return false;
    //   }
    // }

    return new Promise<any>((subresolve, subreject) => {
      jwt.verify(originalEncryptedString, process.env.JWT_SECRET, (err, decoded: any) => {
        console.log(decoded, 'deccc');
        if (err) {
          return subresolve(undefined);
        }
        return subresolve({ id: decoded.id, role: decoded.role });
      });
    });
  }

  public async cookieTokenExist(token: string): Promise<any> {
    const Crypto = require('crypto-js');
    const bytes = Crypto.AES.decrypt(token, process.env.CRYPTO_SECRET);
    const originalEncryptedString = bytes.toString(Crypto.enc.Utf8);
    const checkTokenRevoke: any = await this.accessTokenRepository.findOne({
      where: {
        token: originalEncryptedString,
      },
    });
    if (!checkTokenRevoke) {
      // this.log.warn('Invalid token');
      return false;
    }
    return checkTokenRevoke;
  }

  public async validateUser(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        userId,
        deleteFlag: 0,
        isActive: 1,
      },
    });
    if (user) {
      return user;
    }
    return undefined;
  }

  public async validateCustomer(userId: number): Promise<any> {
    const customer = await this.customerRepository.findOne({
      where: {
        id: userId,
        isActive: 1,
        deleteFlag: 0,
      },
    });
    if (customer) {
      return customer;
    }
    return undefined;
  }

  public async validateVendor(userId: number): Promise<any> {
    const vendors = await this.vendorRepository.findOne({
      where: {
        vendorId: userId,
      },
      relations: ['customer'],
    });
    if (vendors) {
      if (vendors.isActive === 1 && vendors.isDelete === 0 && vendors.approvalFlag === 1) {
        return vendors;
      }
    }
    return undefined;
  }

  public async validateUnapprovedVendor(userId: number): Promise<any> {
    const vendors = await this.vendorRepository.findOne({
      where: {
        vendorId: userId,
      },
      relations: ['customer'],
    });
    if (vendors) {
      if (vendors.isActive === 1 && vendors.isDelete === 0) {
        return vendors;
      }
    }
    return undefined;
  }

  public async checkTokenExist(req: express.Request): Promise<number> {
    const authorization = req.header('authorization');
    if (authorization && authorization.split(' ')[0] === 'Bearer') {
      // this.log.info('Credentials provided by the client');
      if (!authorization) {
        return undefined;
      }
      const token = authorization.split(' ')[1];
      const Crypto = require('crypto-js');
      const bytes = Crypto.AES.decrypt(token, process.env.CRYPTO_SECRET);
      const originalEncryptedString = bytes.toString(Crypto.enc.Utf8);
      const checkTokenRevoke: any = await this.accessTokenRepository.findOne({
        where: {
          token: originalEncryptedString,
        },
      });
      return checkTokenRevoke;
    }
    // this.log.info('No credentials provided by the client');
    return undefined;
  }

  public async validateUserGroup(userGroupId: number): Promise<any> {
    const group = await this.userGroupRepository.findOne({
      where: {
        groupId: userGroupId,
      },
    });
    if (group) {
      return group;
    }
    return undefined;
  }
}
