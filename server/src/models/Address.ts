import {
  Column,
  Entity,
  BeforeInsert,
  BeforeUpdate,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { IsNotEmpty } from 'class-validator';
import { Zone } from './Zone';
@Entity('address')
export class Address extends BaseModel {
  @IsNotEmpty()
  @PrimaryGeneratedColumn({ name: 'address_id' })
  public addressId: number;

  @IsNotEmpty()
  @Column({ name: 'name' })
  public name: string;

  @IsNotEmpty()
  @Column({ name: 'house_number' })
  public houseNumber: number;

  @IsNotEmpty()
  @Column({ name: 'landmark' })
  public landmark: string;

  @IsNotEmpty()
  @Column({ name: 'mobile_number' })
  public mobileNumber: number;

  @IsNotEmpty()
  @Column({ name: 'village_area' })
  public villageArea: string;

  @IsNotEmpty()
  @Column({ name: 'city' })
  public city: string;

  @Column({ name: 'pincode' })
  public pincode: number;

  @IsNotEmpty()
  @Column({ name: 'state' })
  public state: string;

  @Column({ name: 'alternate_number' })
  public alternateNumber: number;

  @IsNotEmpty()
  @Column({ name: 'label' })
  public label: string;

  @IsNotEmpty()
  @Column({ name: 'customer_id' })
  public customerId: number;

  @Column({ name: 'country_id' })
  public countryId: number;

  @Column({ name: 'zone_id' })
  public zoneId: number;

  @Column({ name: 'first_name' })
  public firstName: string;

  @Column({ name: 'last_name' })
  public lastName: string;

  @Column({ name: 'company' })
  public company: string;
  @IsNotEmpty()
  @Column({ name: 'address_1' })
  public address1: string;

  @Column({ name: 'address_2' })
  public address2: string;

  @Column({ name: 'postcode' })
  public postcode: number;

  @Column({ name: 'email_id' })
  public emailId: string;

  @Column({ name: 'phone_no' })
  public phoneNo: number;
  @IsNotEmpty()
  @Column({ name: 'address_type' })
  public addressType: number;

  @Column({ name: 'is_active' })
  public isActive: number;

  @Column({ name: 'is_default' })
  public isDefault: number;

  @ManyToOne((type) => Zone, (zone) => zone.address)
  @JoinColumn({ name: 'zone_id' })
  public zone: Zone[];

  @BeforeInsert()
  public async createDetails(): Promise<void> {
    this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
  }
  @BeforeUpdate()
  public async updateDetails(): Promise<void> {
    this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
  }
}
