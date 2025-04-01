import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { OrderStatus } from '../../api/core/models/OrderStatus';
define(OrderStatus, (faker: typeof Faker, settings: { role: string }) => {
    const orderStatus = new OrderStatus();
    return orderStatus;
});
