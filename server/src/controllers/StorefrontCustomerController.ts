import 'reflect-metadata';
import {
  Get,
  Post,
  BodyParam,
  // Delete,
  // Put,
  Body,
  // QueryParam,
  // Param,
  JsonController,
  Authorized,
  Req,
  Res,
  Put,
  QueryParam,
  Param,
} from 'routing-controllers';
import * as jwt from 'jsonwebtoken';
import moment from 'moment';
import { Not } from 'typeorm';
import { instanceToPlain } from 'class-transformer';
// import { env } from '../../../env';
import { CustomerService } from '../services/CustomerService';
import { Customer } from '../models/Customer';
import { AccessToken } from '../models/AccessTokenModel';
import { Address } from '../models/Address';
import { AccessTokenService } from '../services/AccessTokenService';
import { CreateCustomer } from '../requests/CreateCustomerRequest';
import { MAILService } from '../auth/mail.services';
import { UpdateCustomer } from '../requests/UpdateCustomerRequest';
import { SettingService } from '../services/SettingService';
import { CustomerGroupService } from '../services/CustomerGroupService';
// import { AccessTokenRepository } from 'src/api/core/repositories/AccessTokenRepository';
// import { OrderProductService } from '../../core/services/OrderProductService';
import { EmailTemplateService } from '../services/EmailTemplateService';
// import { VendorService } from '../../core/services/VendorService';
// import { VendorProductService } from '../../core/services/VendorProductService';
// import { ProductViewLogService } from '../../core/services/ProductViewLogService';
// import { DeleteCustomerRequest } from './requests/DeleteCustomerRequest';
// import * as fs from 'fs';
// import { VendorOrdersService } from '../../core/services/VendorOrderService';
// import { LoginLogService } from '../../core/services/LoginLogService';
// import { getCustomerList } from '@spurtcommerce/customer';
// import { Not, getConnection } from 'typeorm';
// import { ExportLog } from '../../core/models/ExportLog';
// import { ExportLogService } from '../../core/services/ExportLogService';
import { ImageService } from '../services/ImageService';
// import { S3Service } from "../services/S3Service";
import { UserLogin } from '../requests/CustomerLoginRequest';
import { RegistrationOtpService } from '../services/RegistraionOtpService';
import { RegistrationOtp } from '..//models/RegistrationOtpModel';
import { UpdateCustomerEmailRequest } from '../requests/UpdateCustomerEmailRequest';
import { AddressService } from '../services/AddressService';
import { CreateAddress } from '../requests/CreateAddressRequest';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../auth/AuthService';
import axios from 'axios';
import { Inject, Service } from 'typedi';
import path from 'path';
import fs from 'fs';
import ejs from 'ejs';
import { sendEmail, transporter } from '../config/emailConfig';

@Service()
@JsonController('/storefront-customer')
export class StorefrontController {
  constructor(
    private customerService: CustomerService,
    private customerGroupService: CustomerGroupService,
    private accessTokenService: AccessTokenService,
    private authService: AuthService,
    // private orderProductService: OrderProductService,
    // private customerGroupService: CustomerGroupService,
    private settingService: SettingService,
    // private productViewLogService: ProductViewLogService,
    // private vendorService: VendorService,
    // private exportLogService: ExportLogService,
    // private vendorProductService: VendorProductService,
    // private loginLogService: LoginLogService,
    // private vendorOrdersService: VendorOrdersService,
    private addressService: AddressService,
    private emailTemplateService: EmailTemplateService,
    private imageService: ImageService,
    private registrationOtpService: RegistrationOtpService
    // private s3Service: S3Service,
  ) {}

  @Post('/send-otp')
  public async CustomerSendOtp(
    @Body({ validate: true }) authInfo: { emailId: string },
    @Res() response: any,
    @Req() request: any
  ): Promise<any> {
    const customer = await this.customerService.findOne({
      where: { email: authInfo.emailId, deleteFlag: 0 },
    });
    if (!customer) {
      const newCustomer = new Customer();
      newCustomer.email = authInfo.emailId;
      newCustomer.password = 'null';
      newCustomer.username = authInfo.emailId;
      newCustomer.isActive = 1;
      const savedCustomer = await this.customerService.create(newCustomer);
      if (!savedCustomer) {
        return response.status(400).send({
          status: 0,
          message: 'Failed to save customer',
        });
      }
    }
    const otp = await this.registrationOtpService.findOne({
      where: { emailId: authInfo.emailId, userType: 2 },
    });
    if (otp) {
      await this.registrationOtpService.delete(otp.id);
    }
    const otpCode: number = Math.floor(Math.random() * 900000) + 100000;

    const newUserOtp = new RegistrationOtp();
    newUserOtp.emailId = authInfo.emailId;
    newUserOtp.userType = 2;
    newUserOtp.otp = otpCode;
    newUserOtp.createdDate = moment().add(3, 'h').format('YYYY-MM-DD HH:mm:ss');
    const createUserOTP = await this.registrationOtpService.create(newUserOtp);

    const templatePath = path.join(__dirname, '../templates/email/loginOTP.ejs');
    const emailTemplate = fs.readFileSync(templatePath, 'utf8');

    const renderedTemplate = ejs.render(emailTemplate, { otp: otpCode });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: authInfo.emailId,
      subject: 'your OTP code',
      html: renderedTemplate,
    };

    const sendMail = await transporter.sendMail(mailOptions);
    if (sendMail.messageId) {
      return response.status(200).send({
        status: 1,
        message: 'OTP sent successfully!',
        data: sendMail,
      });
    } else {
      return response.status(200).send({
        status: 0,
        message: 'Failed to sent OTP!',
      });
    }
  }

  @Post('/verify-otp')
  public async verifyOtp(
    @Body({ validate: true }) authInfo: { mail: string; otp: number },
    @Res() response: any,
    @Req() request: any
  ): Promise<any> {
    const customer = await this.customerService.findOne({
      where: { email: authInfo.mail, deleteFlag: 0 },
    });
    console.log(customer, 'cutoreeee');
    if (!customer) {
      return response.status(400).send({
        status: 0,
        message: 'Customer email not found',
      });
    }
    const otp = await this.registrationOtpService.findOne({
      where: { emailId: authInfo.mail, userType: 2 },
    });

    if (otp) {
      if (otp.otp == authInfo.otp) {
        const accessToken = jwt.sign({ id: customer.id, role: 'customer' }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_ACCESS_TOKEN_TIME,
        });
        const refreshToken = jwt.sign({ id: customer.id, role: 'customer' }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_REFRESH_TOKEN_TIME,
        });
        const newToken = new AccessToken();
        newToken.userId = customer.id;
        newToken.token = refreshToken;
        newToken.userType = 'customer';
        await this.accessTokenService.create(newToken);
        const Crypto = require('crypto-js');
        const encryptedAccessToken = Crypto.AES.encrypt(accessToken, process.env.CRYPTO_SECRET).toString();
        const encryptedRefershToken = Crypto.AES.encrypt(refreshToken, process.env.CRYPTO_SECRET).toString();
        // const uniqueCookieName = '_x' + Math.random().toString(36).substring(2, 5);
        console.log('i m m running', encryptedAccessToken);
        response.cookie('_Tt', encryptedAccessToken, {
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
          maxAge: 60 * 24 * 60 * 60 * 1000,
        });
        response.cookie('_Trt', encryptedRefershToken, {
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
          maxAge: 180 * 24 * 60 * 60 * 1000,
        });
        await this.registrationOtpService.delete(otp.id);
        return response.status(200).send({
          status: 1,
          message: 'OTP is verified',
          alreadyCustomer: !customer.firstName ? customer : '',
          data: customer,
        });
      } else {
        return response.status(200).send({
          status: 0,
          message: 'Failed to verify OTP',
        });
      }
    }
  }

  @Put('/complete-profile')
  @Authorized(['customer'])
  public async completeProfile(
    @Body({ validate: true }) userInfo: { fName: string; lName: string; mobile?: string; gender: string },
    @Res() response: any,
    @Req() request: any
  ): Promise<any> {
    const userId = request.body.userId;
    const customer = await this.customerService.find({
      where: { id: userId },
    });
    if (!customer) {
      return response.status(400).send({
        status: 0,
        message: 'Customer not found',
      });
    }
    const updateData: Record<string, any> = {
      id: userId,
      firstName: userInfo.fName,
      lastName: userInfo.lName,
      gender: userInfo.gender,
    };
    if (userInfo.mobile) {
      updateData.mobileNumber = userInfo.mobile;
    }
    const savedCustomer = await this.customerService.create(updateData);

    if (savedCustomer) {
      return response.status(200).send({
        status: 1,
        message: 'Customer saved successfully',
        data: savedCustomer,
      });
    } else {
      return response.status(400).send({
        status: 0,
        message: ' Failed to save customer',
      });
    }
  }

  // @Put('/update-email')
  // @Authorized(['customer'])
  // public async updateCustomerEmail(
  //   @BodyParam('emailId') updateCustomerEmailId: UpdateCustomerEmailRequest,
  //   @Res() response: any,
  //   @Req() request: any
  // ): Promise<void> {
  //   const id = request.body.userId;

  //   const customer = await this.customerService.findOne({
  //     where: {
  //       id,
  //     },
  //   });

  //   if (!customer) {
  //     const errorResponse: any = {
  //       status: 0,
  //       message: 'Invalid customer id',
  //     };
  //     return response.status(400).send(errorResponse);
  //   }
  //   const emailRegistered = await this.customerService.findOne({
  //     where: { email: request.body.email, deleteFlag: 0 },
  //   });

  //   if (emailRegistered) {
  //     const successResponse: any = {
  //       status: 1,
  //       message: 'A buyer is already registered with this email Id',
  //     };
  //     return response.status(400).send(successResponse);
  //   }

  //   const otpMailCheck = await this.registrationOtpService.findOne({
  //     where: { emailId: request.body.email, isActive: 1, isDelete: 0 },
  //   });

  //   const checkOtp = await this.registrationOtpService.findOne({
  //     where: {
  //       emailId: request.body.email,
  //       userType: 2,
  //       otp: request.body.otp,
  //       isActive: 1,
  //       isDelete: 0,
  //     },
  //   });

  //   if (!otpMailCheck || !checkOtp) {
  //     return response.status(400).send({
  //       status: 0,
  //       message: 'Please enter a valid OTP',
  //     });
  //   }

  //   if (
  //     moment(checkOtp.createdDate).format('YYYY-MM-DD HH:mm:ss') <
  //     moment().format('YYYY-MM-DD HH:mm:ss')
  //   ) {
  //     return response.status(400).send({
  //       status: 0,
  //       message: 'Your OTP Got Expired',
  //     });
  //   }

  //   customer.email = request.body.email;

  //   const emailUpdate = await this.customerService.update(id, customer);

  //   await this.registrationOtpService.delete(checkOtp.id);

  //   if (+customer.mailStatus === 1) {
  //     const emailContent = await this.emailTemplateService.findOne(41);
  //     const logo = await this.settingService.findOne();
  //     const message = emailContent.content
  //       .replace('{name}', customer.username)
  //       .replace('{xxxxxx}', request.body.email);
  //     // const redirectUrl = env.storeRedirectUrl;
  //     const mailContents: any = {};
  //     mailContents.logo = logo;
  //     mailContents.emailContent = message;
  //     // mailContents.redirectUrl = redirectUrl;
  //     mailContents.productDetailData = '';
  //     MAILService.sendMail(mailContents, customer.email, emailContent.subject, false, false, '');
  //     const successResponse: any = {
  //       status: 1,
  //       message: 'Successfully updated buyer with new email sent',
  //       data: emailUpdate,
  //     };
  //     return response.status(200).send(successResponse);
  //   } else {
  //     const successResponse: any = {
  //       status: 1,
  //       message: 'Successfully updated buyer email',
  //       data: emailUpdate,
  //     };
  //     return response.status(200).send(successResponse);
  //   }
  // }

  // // Create Customer API
  // /**
  //  * @api {post} /api/admin-customer Add Customer API
  //  * @apiGroup Customer
  //  * @apiHeader {String} Authorization
  //  * @apiParam (Request body) {Number} customerGroupId Customer customerGroupId
  //  * @apiParam (Request body) {String{..32}} username Customer username
  //  * @apiParam (Request body) {String{..96}} email Customer email
  //  * @apiParam (Request body) {Number{6..15}} mobileNumber Customer mobileNumber
  //  * @apiParam (Request body) {String{8..128}} password Customer password
  //  * @apiParam (Request body) {String{8..128}} confirmPassword Customer confirmPassword
  //  * @apiParam (Request body) {String} avatar Customer avatar
  //  * @apiParam (Request body) {Number} mailStatus Customer mailStatus should be 1 or 0
  //  * @apiParam (Request body) {Number} status Customer status
  //  * @apiParamExample {json} Input
  //  * {
  //  *      "customerGroupId" : "",
  //  *      "userName" : "",
  //  *      "email" : "",
  //  *      "mobileNumber" : "",
  //  *      "password" : "",
  //  *      "confirmPassword" : "",
  //  *      "avatar" : "",
  //  *      "mailStatus" : "",
  //  *      "status" : "",
  //  * }
  //  * @apiSuccessExample {json} Success
  //  * HTTP/1.1 200 OK
  //  * {
  //  *      "message": "Customer Created successfully",
  //  *      "status": "1",
  //  *      "data": {
  //  *              "customerGroupId": "",
  //  *              "firstName": "",
  //  *              "username": "",
  //  *              "email": "",
  //  *              "mobileNumber": "",
  //  *              "password": "",
  //  *              "mailStatus": "",
  //  *              "deleteFlag": "",
  //  *              "isActive": "",
  //  *              "createdDate": "",
  //  *              "id": ""
  //  *              }
  //  * }
  //  * @apiSampleRequest /api/admin-customer
  //  * @apiErrorExample {json} Customer error
  //  * HTTP/1.1 500 Internal Server Error
  //  */
  // @Post('/signup')
  // public async addCustomer(
  //   @Body({ validate: true }) authData: { email: string },
  //   @Res() response: any
  // ): Promise<any> {
  //   const newCustomer = new Customer();
  //   const emailRegistered = await this.customerService.findOne({
  //     where: { email: authData.email, deleteFlag: 0 },
  //   });
  //   if (emailRegistered) {
  //     const successResponse: any = {
  //       status: 1,
  //       message: 'A buyer is already registered with this email Id',
  //     };
  //     return response.status(400).send(successResponse);
  //   }

  //   const otpMailCheck = await this.registrationOtpService.findOne({
  //     where: { emailId: customerParam.email, isActive: 1, isDelete: 0 },
  //   });

  //   const checkOtp = await this.registrationOtpService.findOne({
  //     where: {
  //       emailId: customerParam.email,
  //       userType: 2,
  //       otp: customerParam.otp,
  //       isActive: 1,
  //       isDelete: 0,
  //     },
  //   });

  //   if (!otpMailCheck || !checkOtp) {
  //     return response.status(400).send({
  //       status: 0,
  //       message: 'Please enter a valid OTP',
  //     });
  //   }

  //   if (moment(checkOtp.createdDate).format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss')) {
  //     return response.status(400).send({
  //       status: 0,
  //       message: 'Your OTP Got Expired',
  //     });
  //   }

  //   const usernameRegistered = await this.customerService.findOne({
  //     where: { username: customerParam.username, deleteFlag: 0 },
  //   });
  //   if (usernameRegistered) {
  //     const successResponse: any = {
  //       status: 1,
  //       message: 'A buyer is already registered with the username',
  //     };
  //     return response.status(400).send(successResponse);
  //   }

  //   if (customerParam.password === customerParam.confirmPassword) {
  //     const password = await Customer.hashPassword(customerParam.password);
  //     newCustomer.customerGroupId = 1;
  //     newCustomer.firstName = customerParam.firstName;
  //     newCustomer.lastName = customerParam.lastName;
  //     const emailId = customerParam.email;
  //     newCustomer.username = customerParam.username;
  //     newCustomer.email = emailId;
  //     newCustomer.mobileNumber = customerParam.mobileNumber;
  //     newCustomer.password = password;
  //     newCustomer.mailStatus = customerParam.mailStatus;
  //     newCustomer.deleteFlag = 0;
  //     newCustomer.isActive = customerParam.status;
  //     newCustomer.siteId = customerParam.siteId;
  //     const customerSave = await this.customerService.create(newCustomer);

  //     // delete OTP
  //     await this.registrationOtpService.delete(checkOtp.id);

  //     if (customerSave) {
  //       if (+customerParam.mailStatus === 1) {
  //         const emailContent = await this.emailTemplateService.findOne(4);
  //         const logo = await this.settingService.findOne();
  //         const message = emailContent.content
  //           .replace('{name}', customerParam.username)
  //           .replace('{username}', customerParam.email)
  //           .replace('{storeName}', logo.siteName)
  //           .replace('{password}', customerParam.password)
  //           .replace('{storeName}', logo.siteName);
  //         // const redirectUrl = env.storeRedirectUrl;
  //         const mailContents: any = {};
  //         mailContents.logo = logo;
  //         mailContents.emailContent = message;
  //         // mailContents.redirectUrl = redirectUrl;
  //         mailContents.productDetailData = '';
  //         MAILService.sendMail(mailContents, customerParam.email, emailContent.subject, false, false, '');
  //         const successResponse: any = {
  //           status: 1,
  //           message: 'Successfully created new buyer with email Id and password and email sent',
  //           data: customerSave,
  //         };
  //         return response.status(200).send(successResponse);
  //       } else {
  //         const successResponse: any = {
  //           status: 1,
  //           message: 'Buyer created successfully',
  //           data: customerSave,
  //         };
  //         return response.status(200).send(successResponse);
  //       }
  //     }
  //   } else {
  //     const errorResponse: any = {
  //       status: 0,
  //       message: 'Password does not match',
  //     };
  //     return response.status(400).send(errorResponse);
  //   }
  // }

  // // Update Customer API
  // @Put()
  // @Authorized([
  //   'customer',
  //   // 'edit-customer'
  // ])
  // public async updateCustomer(
  //   @Body({ validate: true }) customerParam: UpdateCustomer,
  //   @Req() request: any,
  //   @Res() response: any
  // ): Promise<any> {
  //   const id = request.body.userId;

  //   const customer = await this.customerService.findOne({
  //     where: {
  //       id,
  //     },
  //   });

  //   if (!customer) {
  //     const errorResponse: any = {
  //       status: 0,
  //       message: 'Invalid customer id',
  //     };
  //     return response.status(400).send(errorResponse);
  //   }
  //   const reqParamKeys = Object.keys(customerParam);

  //   for (const key of reqParamKeys) {
  //     if (key === 'email') {
  //       const customerEmailId = await this.customerService.findOne({
  //         where: {
  //           email: customerParam[key],
  //           deleteFlag: 0,
  //           id: Not(id),
  //         },
  //       });

  //       if (customerEmailId !== undefined) {
  //         const errorResponses = {
  //           status: 0,
  //           message: 'MailId is already registered',
  //         };
  //         return response.status(400).send(errorResponses);
  //       }
  //     } else if (key === 'username') {
  //       const customerUsername = await this.customerService.findOne({
  //         where: {
  //           username: customerParam[key],
  //           deleteFlag: 0,
  //           id: Not(id),
  //         },
  //       });

  //       if (customerUsername !== undefined) {
  //         const errorResponses = {
  //           status: 0,
  //           message: 'Username is already registered',
  //         };
  //         return response.status(400).send(errorResponses);
  //       }
  //       customer.username = customerParam[key];
  //     } else if (key === 'avatar') {
  //       const avatar = customerParam.avatar;
  //       if (avatar) {
  //         const type = avatar.split(';')[0].split('/')[1];
  //         // const availableTypes = env.availImageTypes.split(',');
  //         if (!availableTypes.includes(type)) {
  //           const errorTypeResponse: any = {
  //             status: 0,
  //             // message: 'Only ' + env.availImageTypes + ' types are allowed',
  //           };
  //           return response.status(400).send(errorTypeResponse);
  //         }
  //         const name = 'Img_' + Date.now() + '.' + type;
  //         const path = 'storefront/avatar/';
  //         const base64Data = Buffer.from(avatar.replace(/^data:image\/\w+;base64,/, ''), 'base64');

  //         if (env.imageserver === 's3') {
  //           await this.s3Service.imageUpload(path + name, base64Data, type);
  //         } else {
  //           await this.imageService.imageUpload(path + name, base64Data);
  //         }

  //         customer.avatar = name;
  //         customer.avatarPath = path;
  //       }
  //     } else if (
  //       key === 'customerGroupId' ||
  //       key === 'firstName' ||
  //       key === 'lastName' ||
  //       key === 'email' ||
  //       key === 'mobileNumber' ||
  //       key === 'mailStatus' ||
  //       key === 'siteId'
  //     ) {
  //       customer[key] = customerParam[key];
  //     } else if (key === 'status') {
  //       customer.isActive = customerParam[key];
  //     }
  //   }

  //   const customerSave = await this.customerService.update(id, customer);
  //   if (customerSave) {
  //     const successResponse: any = {
  //       status: 1,
  //       message: 'Buyer updated successfully',
  //       data: customerSave,
  //     };
  //     return response.status(200).send(successResponse);
  //   }
  // }

  // // Get Customer Detail API
  // /**
  //  * @api {get} /api/admin-customer/customer-detail/:id Customer Details API
  //  * @apiGroup Customer
  //  * @apiHeader {String} Authorization
  //  * @apiSuccessExample {json} Success
  //  * HTTP/1.1 200 OK
  //  * {
  //  *      "status": "1"
  //  *      "message": "Successfully get customer Details",
  //  *      "data":{
  //  *           "id": "",
  //  *           "firstName": "",
  //  *           "email": "",
  //  *           "mobileNumber": "",
  //  *           "address": "",
  //  *           "avatar": "",
  //  *           "avatarPath": "",
  //  *           "customerGroupId": "",
  //  *           "lastLogin": "",
  //  *           "mailStatus": "",
  //  *           "isActive": "",
  //  *           "siteId": "",
  //  *           "customerGroupName": ""
  //  *      }
  //  *      }
  //  * @apiSampleRequest /api/admin-customer/customer-detail/:id
  //  * @apiErrorExample {json} customer error
  //  * HTTP/1.1 500 Internal Server Error
  //  */
  // @Get('/me')
  // @Authorized('customer')
  // public async customerDetails(@Req() request: any, @Res() response: any): Promise<any> {
  //   const userId = request.body.userId;
  //   const customer = await this.customerService.findOne({
  //     select: [
  //       'id',
  //       'firstName',
  //       'email',
  //       'mobileNumber',
  //       'address',
  //       'lastLogin',
  //       'isActive',
  //       'mailStatus',
  //       'customerGroupId',
  //       'avatar',
  //       'avatarPath',
  //       'siteId',
  //       'createdDate',
  //       'modifiedDate',
  //     ],
  //     where: { id: userId },
  //   });
  //   if (!customer) {
  //     const errorResponse: any = {
  //       status: 0,
  //       message: 'invalid buyerId',
  //     };
  //     return response.status(400).send(errorResponse);
  //   }
  //   const groupName = await this.customerGroupService.findOne({
  //     where: {
  //       id: customer.customerGroupId,
  //     },
  //   });
  //   customer.customerGroupName = groupName && groupName.name !== undefined ? groupName.name : '';
  //   const successResponse: any = {
  //     status: 1,
  //     message: 'successfully got buyer details',
  //     data: customer,
  //   };
  //   return response.status(200).send(successResponse);
  // }

  // Login API
  @Post('/login')
  public async login(
    @Body({ validate: true }) loginParam: UserLogin,

    @Req() request: any,
    @Res() response: any
  ): Promise<any> {
    const customer = await this.customerService.findOne({
      where: {
        username: request.body.username,
      },
    });
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    if (customer) {
      if (await Customer.comparePassword(customer, loginParam.password)) {
        // create a token
        const token = jwt.sign(
          { id: customer.id, role: 'customer' },
          process.env.JWT_SECRET
          //   {
          //     expiresIn: env.jwtExpiryTime.toString(),
          //   }
        );
        // if (user.usergroup.isActive === 0) {
        // 	const errorResponse: any = {
        // 		status: 0,
        // 		message: 'Role is InActive',
        // 	};
        // 	return response.status(400).send(errorResponse);
        // }
        // let permission: any = {};
        // if (user.userGroupId !== 1) {
        // 	const userDetail = await this.userService.findOne({
        // 		where: { userId: user.userId },
        // 	});
        // 	if (userDetail.permission) {
        // 		permission = JSON.parse(userDetail.permission);
        // 	} else {
        // 		const roleDetail = await this.userGroupService.findOne({
        // 			where: { groupId: user.userGroupId },
        // 		});
        // 		permission = roleDetail.permission
        // 			? JSON.parse(roleDetail.permission)
        // 			: {};
        // 	}
        // }
        if (token) {
          const newToken = new AccessToken();
          newToken.userId = customer.id;
          newToken.token = token;
          newToken.userType = 'customer';
          await this.accessTokenService.create(newToken);
          const Crypto = require('crypto-js');
          const ciphertextToken = Crypto.AES.encrypt(token, process.env.CRYPTO_SECRET).toString();
          const successResponse: any = {
            status: 1,
            message: 'Logged in successfully',
            data: {
              token: ciphertextToken,
              user: instanceToPlain(customer),
              // permission,
            },
          };
          return response.status(200).send(successResponse);
        }
      } else {
        const errorResponse: any = {
          status: 0,
          message: 'Login Information provided is invalid',
        };
        return response.status(400).send(errorResponse);
      }
    } else {
      const errorResponse: any = {
        status: 0,
        message: 'Login Information provided is invalid',
      };
      return response.status(400).send(errorResponse);
    }
  }

  @Post('/logout')
  public async logout(
    // @Body({ validate: true }) loginParam: UserLogin,
    @Req() request: any,
    @Res() response: any
  ): Promise<any> {
    const { _Tt, _Trt } = request.cookies;
    console.log(_Tt, _Trt, 'kkkkkk');
    if (!_Tt || !_Trt) {
      return response.status(400).send({ error: 'Cookie not found' });
    }
    response.clearCookie('_Tt');
    response.clearCookie('_Trt');
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    if (_Tt) {
      const succesRes = {
        status: 1,
        message: ' User successfully logout',
      };
      return response.status(200).send(succesRes);
    } else {
      const errorResponse: any = {
        status: 0,
        message: 'User failed to logout',
      };
      return response.status(400).send(errorResponse);
    }
  }

  @Post('/google/auth')
  public async googleAuth(
    @Body({ validate: true }) body: { code: string },
    @Req() request: any,
    @Res() response: any
  ): Promise<any> {
    if (!body.code) {
      return response.status(400).send({ message: 'Authorization code is required' });
    }

    const exchangeCode = await axios.post(
      'https://oauth2.googleapis.com/token',
      new URLSearchParams({
        code: body.code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.FRONTEND_URL,
        grant_type: 'authorization_code',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (exchangeCode.status !== 200 && exchangeCode.statusText !== 'OK') {
      return response.status(500).send(`Google OAuth request failed: ${exchangeCode.statusText}`);
    }

    const tokenData = await exchangeCode.data;
    if (!tokenData) {
      return response.status(500).send({ message: 'Google authentication failed' });
    }

    const userInfo = jwtDecode(tokenData.id_token) as any;
    const customer = await this.customerService.findOne({
      where: {
        email: userInfo.email,
      },
    });

    if (!customer && userInfo?.sub) {
      const newCustomer = new Customer();
      newCustomer.firstName = userInfo.given_name;
      newCustomer.lastName = userInfo.family_name;
      newCustomer.username = userInfo.email;
      newCustomer.password = 'null';
      newCustomer.email = userInfo.email;
      newCustomer.oauthData = userInfo.sub;
      newCustomer.isActive = 1;
      newCustomer.avatar = userInfo.picture;
      newCustomer.avatarPath = 'customer/';
      await this.customerService.create(newCustomer);
    } else if (!customer.oauthData) {
      customer.oauthData = userInfo.sub;
      await this.customerService.update(customer.id, customer);
    }

    const accessToken = jwt.sign({ id: customer.id, role: 'customer' }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_TIME,
    });
    const refreshToken = jwt.sign({ id: customer.id, role: 'customer' }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_REFRESH_TOKEN_TIME,
    });
    if (refreshToken) {
      const newToken = new AccessToken();
      newToken.userId = customer.id;
      newToken.token = refreshToken;
      newToken.userType = 'customer';
      await this.accessTokenService.create(newToken);
      const Crypto = require('crypto-js');
      const encryptedAccessToken = Crypto.AES.encrypt(accessToken, process.env.CRYPTO_SECRET).toString();
      const encryptedRefershToken = Crypto.AES.encrypt(refreshToken, process.env.CRYPTO_SECRET).toString();
      // const uniqueCookieName = '_x' + Math.random().toString(36).substring(2, 5);
      console.log('i m m running', encryptedAccessToken);
      response.cookie('_Tt', encryptedAccessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 60 * 24 * 60 * 60 * 1000,
      });
      response.cookie('_Trt', encryptedRefershToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 180 * 24 * 60 * 60 * 1000,
      });
      const successResponse: any = {
        status: 1,
        message: 'Logged in successfully',
        data: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      };
      return response.status(200).send(successResponse);
    }
  }

  @Get('/refresh-token')
  @Authorized(['customer'])
  public async refreshToken(
    @Res()
    response: any,
    @Req() request: any
  ): Promise<any> {
    const customerId = request.body.userId;
    const accessToken = request.cookies._Tt;
    const refreshToken = request.cookies._Trt;
    if (!accessToken && !refreshToken) {
      return response.status(500).send(`Please login again, session expired`);
    }
    if (!refreshToken) {
      return response.status(500).send(`Token not found,Please login again`);
    }
    const tokenExist = await this.authService.cookieTokenExist(refreshToken);
    if (!tokenExist) {
      return response.status(500).send(`Refresh token does not exist`);
    }
    jwt.verify(tokenExist.token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return response.status(401).send('Token has expired, please login again.');
        }
        return response.status(403).send('Invalid token.');
      }

      const issuedAt = decoded.iat;
      const Crypto = require('crypto-js');
      const currentTime = Math.floor(Date.now() / 1000);

      if (currentTime - issuedAt > 7 * 24 * 60 * 60) {
        const newRefreshToken = jwt.sign({ id: customerId, role: 'customer' }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_REFRESH_TOKEN_TIME,
        });
        const encryptedRefreshToken = Crypto.AES.encrypt(
          newRefreshToken,
          process.env.CRYPTO_SECRET
        ).toString();

        response.cookie('_Trt', encryptedRefreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
          maxAge: 180 * 24 * 60 * 60 * 1000,
        });
        const newToken = new AccessToken();
        newToken.userId = customerId;
        newToken.token = newRefreshToken;
        newToken.userType = 'customer';
        await this.accessTokenService.create(newToken);
      }
      const newAccessToken = jwt.sign({ id: customerId, role: 'customer' }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_TIME,
      });
      console.log(newAccessToken, 'mmmmm');
      const encryptedAccessToken = Crypto.AES.encrypt(newAccessToken, process.env.CRYPTO_SECRET).toString();

      response.cookie('_Tt', encryptedAccessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 3 * 60 * 1000, // 15 minutes
      });

      await this.accessTokenService.delete(tokenExist.id);
    });
    const successResponse: any = {
      status: 1,
      message: 'New access token is generated',
    };
    return response.status(200).send(successResponse);
  }

  // Create Address
  /**
   *
   * @api {post} /api/address Add Customer Address API
   * @apiGroup Address
   * @apiParam (Request body) {Number} customerId customerId
   * @apiParam (Request body) {String{..128}} address1 address1
   * @apiParam (Request body) {String{..128}} [address2] address2
   * @apiParam (Request body) {String{..128}} city city
   * @apiParam (Request body) {String} state state
   * @apiParam (Request body) {Number{..10}} postcode postcode
   * @apiParam (Request body) {Number} addressType addressType
   * @apiParam (Request body) {Number} countryId countryId
   * @apiParam (Request body) {String{..32}} [company] company
   * @apiHeader {String} Authorization
   * @apiParamExample {json} Input
   * {
   *      "customerId" : "",
   *      "address1" : "",
   *      "address2" : "",
   *      "city" : "",
   *      "state" : "",
   *      "postcode" : "",
   *      "addressType" : "",
   *      "countryId" : "",
   *      "company" : "",
   * }
   * @apiSuccessExample {json} Success
   * HTTP/1.1 200 OK
   * {
   *      "message": "New Address is created successfully",
   *      "status": "1",
   *      "data": "{
   *                "createdBy": 1,
   *                "createdDate": "2024-08-05T07:24:42.000Z",
   *                "modifiedBy": 1,
   *                "modifiedDate": "2024-09-05T07:24:42.000Z",
   *                "addressId": 207,
   *                "customerId": 153,
   *                "countryId": 99,
   *                "zoneId": 76,
   *                "firstName": "Balabathra",
   *                "lastName": "Sankar",
   *                "company": "",
   *                "address1": "24, Gandhi Street",
   *                "address2": "Ruby Aoppartment",
   *                "postcode": "600046",
   *                "city": "Chennai",
   *                "state": "",
   *                "emailId": "",
   *                "phoneNo": "9898765476",
   *                "addressType": 0,
   *                "isActive": 1,
   *                "landmark": "",
   *                "isDefault": 1
   *              }"
   * }
   * @apiSampleRequest /api/address
   * @apiErrorExample {json} addAddress error
   * HTTP/1.1 500 Internal Server Error
   */
  @Post('/create-address')
  @Authorized(['customer'])
  public async createAddress(
    @Body({ validate: true }) addressParam: CreateAddress,
    @Res() response: any,
    @Req() request: any
  ): Promise<any> {
    const customerId = request.body.userId;
    const newAddress = new Address();
    newAddress.customerId = customerId;
    newAddress.isDefault = addressParam.isDefault;
    newAddress.name = addressParam.name;
    newAddress.houseNumber = addressParam.houseNumber;
    newAddress.landmark = addressParam.landmark;
    newAddress.mobileNumber = addressParam.mobileNumber;
    newAddress.villageArea = addressParam.villageArea;
    newAddress.city = addressParam.city;
    newAddress.pincode = addressParam.pincode;
    newAddress.state = addressParam.state;
    newAddress.alternateNumber = addressParam.alternateNumber;
    newAddress.label = addressParam.label;

    const addressSave = await this.addressService.create(newAddress);
    if (addressSave) {
      const successResponse: any = {
        status: 1,
        message: 'Address added sucessfully',
        data: addressSave,
      };
      return response.status(200).send(successResponse);
    } else {
      const errorResponse: any = {
        status: 0,
        message: 'Unable to create address,try again',
      };
      return response.status(400).send(errorResponse);
    }
  }

  // Update Address
  /**
   * @api {put} /api/address/:id Update Address API
   * @apiGroup Address
   * @apiHeader {String} Authorization
   * @apiParam (Request body) {String} customerId customerId
   * @apiParam (Request body) {String{..128}} address1 address1
   * @apiParam (Request body) {String{..128}} [address2] address2
   * @apiParam (Request body) {String{..128}} city city
   * @apiParam (Request body) {String{..128}} state state
   * @apiParam (Request body) {Number{..10}} postcode postcode
   * @apiParam (Request body) {Number} addressType addressType
   * @apiParam (Request body) {Number} countryId countryId
   * @apiParam (Request body) {String{..32}} [company] company
   * @apiHeader {String} Authorization
   * @apiParamExample {json} Input
   * {
   *      "customerId" : "",
   *      "address1" : "",
   *      "address2" : "",
   *      "city" : "",
   *      "state" : "",
   *      "postcode" : "",
   *      "addressType" : "",
   * }
   * @apiSuccessExample {json} Success
   * HTTP/1.1 200 OK
   * {
   *      "message": "Successfully updated address.",
   *      "status": "1",
   *      "data": "{
   *                "createdBy": 1,
   *                "createdDate": "2024-08-05T07:24:42.000Z",
   *                "modifiedBy": 1,
   *                "modifiedDate": "2024-09-05T07:24:42.000Z",
   *                "addressId": 207,
   *                "customerId": 153,
   *                "countryId": 99,
   *                "zoneId": 76,
   *                "firstName": "Balabathra",
   *                "lastName": "Sankar",
   *                "company": "",
   *                "address1": "24, Gandhi Street",
   *                "address2": "Ruby Aoppartment",
   *                "postcode": "600046",
   *                "city": "Chennai",
   *                "state": "",
   *                "emailId": "",
   *                "phoneNo": "9898765476",
   *                "addressType": 0,
   *                "isActive": 1,
   *                "landmark": "",
   *                "isDefault": 1
   *              }"
   * }
   * @apiSampleRequest /api/address/:id
   * @apiErrorExample {json} Address error
   * HTTP/1.1 500 Internal Server Error
   */
  @Put('/update-address/:id')
  @Authorized(['customer'])
  public async updateAddress(
    @Body({ validate: true }) addressParam: CreateAddress,
    @Param('id') id: number,
    @Res() response: any,
    @Req() request: any
  ): Promise<any> {
    const address: any = await this.addressService.findOne({
      where: {
        addressId: id,
      },
    });
    if (!address) {
      const errorResponse: any = {
        status: 0,
        message: 'Unable to edit address,try again',
      };
      return response.status(400).send(errorResponse);
    }
    address.customerId = addressParam.customerId;
    address.isDefault = addressParam.isDefault;
    address.name = addressParam.name;
    address.houseNumber = addressParam.houseNumber;
    address.landmark = addressParam.landmark;
    address.mobileNumber = addressParam.mobileNumber;
    address.villageArea = addressParam.villageArea;
    address.city = addressParam.city;
    address.pincode = addressParam.pincode;
    address.state = addressParam.state;
    address.alternateNumber = addressParam.alternateNumber;
    address.label = addressParam.label;

    const addressSave = await this.addressService.update(id, address);
    if (addressSave) {
      const responseData = {
        customerId: addressSave.customerId,
        isDefault: addressSave.isDefault,
        name: addressSave.name,
        houseNumber: addressSave.houseNumber,
        landmark: addressSave.landmark,
        mobileNumber: addressSave.mobileNumber,
        villageArea: addressSave.villageArea,
        city: addressSave.city,
        pincode: addressSave.pincode,
        state: addressSave.state,
        alternateNumber: addressParam.alternateNumber,
        label: addressParam.label,
      };
      const successResponse: any = {
        status: 1,
        message: 'Successfully updated address',
        data: responseData,
      };
      return response.status(200).send(successResponse);
    } else {
      const errorResponse: any = {
        status: 1,
        message: 'Unable to update the address',
      };
      return response.status(400).send(errorResponse);
    }
  }
  //   Get Customer Address API
  /**
   * @api {get} /api/address/:id Get Customer Address  API
   * @apiGroup Address
   * @apiHeader {String} Authorization
   * @apiParam (Request body) {Number} limit limit
   * @apiParam (Request body) {Number} offset offset
   * @apiParam (Request body) {String} count count
   * @apiParamExample {json} Input
   * {
   *      "customerId" : "",
   * }
   * @apiSuccessExample {json} Success
   * HTTP/1.1 200 OK
   * {
   *      "status": "1"
   *      "message": "Successfully get customer address list",
   *      "data":"[{
   *                "createdBy": "",
   *                "createdDate": "2024-03-19T09:48:17.000Z",
   *                "modifiedBy": "",
   *                "modifiedDate": "2024-03-19T09:48:28.000Z",
   *                "addressId": 1,
   *                "customerId": 1,
   *                "countryId": 99,
   *                "zoneId": 76,
   *                "firstName": "",
   *                "lastName": "",
   *                "company": "Aditya",
   *                "address1": "tambaram",
   *                "address2": "chennai",
   *                "postcode": "636111",
   *                "city": "chrompet",
   *                "state": "",
   *                "emailId": "",
   *                "phoneNo": "",
   *                "addressType": 0,
   *                "isActive": "",
   *                "landmark": "",
   *                "isDefault": 0,
   *                "zone": {
   *                  "createdBy": "",
   *                  "createdDate": "2019-06-14T01:35:20.000Z",
   *                  "modifiedBy": "",
   *                  "modifiedDate": "",
   *                  "zoneId": 76,
   *                  "countryId": 99,
   *                  "code": "TN",
   *                  "name": "Tamil Nadu",
   *                  "isActive": 1
   *                }
   *              }]"
   * }
   * @apiSampleRequest /api/address/:id
   * @apiErrorExample {json} Address error
   * HTTP/1.1 500 Internal Server Error
   */
  @Get('/get-address/')
  @Authorized(['customer'])
  public async getAddress(
    @QueryParam('limit') limit: number,
    @QueryParam('offset') offset: number,
    @QueryParam('count') count: number | boolean,
    // @Param('id') id: number,
    @Req() request: any,
    @Res() response: any
  ): Promise<any> {
    const id = request.body.userId;

    const select = [
      'address.address_id AS addressId',
      'address.name AS name',
      'address.house_number AS houseNumber',
      'address.landmark As landmark',
      'address.mobile_number AS mobileNumber',
      'address.village_area AS villageArea',
      'address.city AS city',
      'address.pincode AS pincode',
      'address.state AS state',
      'address.alternate_number AS alternateNumber',
      'address.label AS label',
      'address.isDefault AS isDefault',
    ];
    const WhereConditions = [
      {
        name: 'address.customerId',
        op: 'where',
        value: id,
      },
    ];
    // const relations = ['zone'];
    const customerAddress = await this.addressService.list(limit, offset, select, [], WhereConditions, count);
    const successResponse: any = {
      status: 1,
      message: 'Successfully got the customer address',
      data: customerAddress,
    };
    return response.status(200).send(successResponse);
  }
}
