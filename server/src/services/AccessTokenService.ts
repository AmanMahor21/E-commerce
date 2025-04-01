import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
// import { AccessTokenRepository } from '../repositories/AccessTokenRepository';
import { AccessToken } from '../models/AccessTokenModel';
import { Repository } from 'typeorm';
import { AppDataSource } from '../database/connection';

@Service()
export class AccessTokenService {
  private accessTokenRepository = AppDataSource.getRepository(AccessToken);
  // constructor(@InjectRepository(AccessToken) private accessTokenRepository: Repository<AccessToken>) {}

  public findOne(accessToken: any): Promise<any> {
    return this.accessTokenRepository.findOne(accessToken);
  }
  // delete token
  public async delete(id: any): Promise<any> {
    await this.accessTokenRepository.delete(id);
    return;
  }
  // create token
  public async create(accessToken: any): Promise<AccessToken> {
    return this.accessTokenRepository.save(accessToken);
  }
}
