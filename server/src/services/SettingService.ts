import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Settings } from '../models/Setting';
import { Like, Repository, UpdateResult } from 'typeorm';
import { AppDataSource } from '../database/connection';

@Service()
export class SettingService {
  private settingsRepository: Repository<Settings>;

  constructor() {
    this.settingsRepository = AppDataSource.getRepository(Settings);
  }
  // find one condition
  public findOne(condition?: any): Promise<any> {
    return this.settingsRepository.findOne(condition ? condition : {});
  }

  // find all setting
  public findAll(condition?: any): Promise<Settings[]> {
    return this.settingsRepository.find(condition ?? {});
  }

  // setting list
  public list(limit: number, select: any = [], relation: any = [], whereConditions: any = []): Promise<any> {
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

    if (limit && limit > 0) {
      condition.take = limit;
    }
    return this.settingsRepository.find(condition);
  }

  // create setting
  public async create(settings: Settings): Promise<Settings> {
    const newSettings = await this.settingsRepository.save(settings);
    return newSettings;
  }

  // update setting
  // public update(condition: FindConditions<Settings>, settings: Settings): Promise<UpdateResult> {
  //     return this.settingsRepository.update(condition, settings);
  // }

  // delete setting
  public async delete(id: any): Promise<any> {
    const newSettings = await this.settingsRepository.delete(id);
    return newSettings;
  }
}
