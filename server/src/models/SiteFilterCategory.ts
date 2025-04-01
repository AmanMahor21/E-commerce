import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SiteFilter } from './SiteFilter';

@Entity('site_filter_category')
export class SiteFilterCategory {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'site_filter_id' })
    public filterId: number;
    @IsNotEmpty()
    @Column({ name: 'category_id' })
    public categoryId: number;

    @ManyToOne(type => SiteFilter, filter => filter.filterCategory)
    @JoinColumn({ name: 'site_filter_id' })
    public filterDetail: SiteFilter;
}
