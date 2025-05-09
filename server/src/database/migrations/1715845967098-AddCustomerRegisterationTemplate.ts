import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

export class AddCustomerRegisterationTemplate1715845967098 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const exist = await queryRunner.hasTable('email_template');
        if (exist) {
            const templateStyle = `<td
            style="padding: 40px 0; border-width: 1px 0 1px 0; border-color:#D8DEE3; border-style: solid;">
            <h1
                style="font-size: 24px; line-height: 29px; font-weight: 600;margin: 0 0 12px 0;color:#1F2328;">
                Hi {name},</h1>
            <p
                style="font-size: 16px; line-height: 24px;color: #1F2328;font-weight: normal;margin: 0 0 24px 0;">
                We are thrilled to welcome you to {appName}! Thank you for registering as a customer and joining our community.
                <br /> Your registration has been successfully completed, and you are now all set to explore and enjoy the various features and offerings we provide.
            </p>
            <p
                style="font-size: 14px;line-height: 17px;color: #1F2328; margin: 0 0 5px 0;  font-weight: normal;">
                Regards,
            </p>
            <h3
                style="font-size: 14px;line-height: 17px;color: #1F2328; margin: 0 0 5px 0;  font-weight: 600;"> {4} Team
            </h3>
            <div>
                <a href="{storeUrl}"
                    style="font-size: 14px;line-height: 17px;color: #1F2328; margin: 0 0 0 0;  font-weight: normal; text-decoration: none;"> {5}
                </a>
            </div>
        </td>`;
            const changeMailSeed = [{
                emailTemplateId: undefined,
                title: 'customer_register',
                subject: 'Customer Account Registration',
                dynamicField: '{name}, {appName}, {storeUrl}',
                content: templateStyle,
                isActive: 1,
            },
            ];
            await getRepository('email_template').save(changeMailSeed);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
