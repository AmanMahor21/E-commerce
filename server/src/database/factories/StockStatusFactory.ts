import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { StockStatus } from '../../api/core/models/stockStatus';
define(StockStatus, (faker: typeof Faker, settings: { role: string }) => {
    const stockStatus = new StockStatus();
    return stockStatus;
});
