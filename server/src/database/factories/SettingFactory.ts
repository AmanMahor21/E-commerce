import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Settings } from '../../api/core/models/Setting';
define(Settings, (faker: typeof Faker, settings: { role: string }) => {
    const setiings = new Settings();
    return setiings;
});
