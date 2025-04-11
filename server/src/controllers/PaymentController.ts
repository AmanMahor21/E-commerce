import 'reflect-metadata';
import {
  JsonController,
  Authorized,
  Res,
  Post,
  Body,
  //   BodyParam,
  Req,
} from 'routing-controllers';
// import { PaymentService } from '../../core/services/PaymentService';
// import { PaymentItemsService } from '../../core/services/PaymentItemsService';
// import { PaymentArchiveService } from '../../core/services/PaymentArchiveService';
// import { PaymentItemsArchiveService } from '../../core/services/PaymentItemsArchiveService';
// import { PaymentArchive } from '../../core/models/PaymentArchive';
// import { PaymentItemsArchive } from '../../core/models/PaymentItemsArchive';
// import * as fs from 'fs';
// import moment from 'moment';
// import { ExportLog } from '../../core/models/ExportLog';
// import { ExportLogService } from '../../core/services/ExportLogService';
import { CreatePayment } from '../requests/CreatePayment';
import { OrderPay } from '../requests/OrderPayRequest';
import { SendOtp } from '../requests/CardOtpSendRequest';
@JsonController('/payment')
export class StorefrontPaymentController {
  //   constructor() {}
  // private exportLogService: ExportLogService // private paymentItemsArchiveService: PaymentItemsArchiveService, // private paymentArchiveService: PaymentArchiveService, // private paymentItemsService: PaymentItemsService, // private paymentService: PaymentService,
  // Payment List API

  @Post('/payment-initiate')
  @Authorized(['customer'])
  public async paymentInitiate(
    @Body({ validate: true }) paymentData: CreatePayment,
    @Res() response: any,
    @Req() request: any
  ): Promise<any> {
    const customerId = request.body.userId;
    const orderId = `CF${Date.now()}`;
    const amount = paymentData.amount;
    const upiID = paymentData.upiID;
    const expiryTime = new Date(Date.now() + 30 * 60 * 1000).toISOString();

    const requestData = {
      order_amount: amount,
      order_currency: 'INR',
      // order_id: 'devstudio_933600s',
      order_id: orderId,
      order_meta: {
        return_url: 'http://localhost:3000/Profile',
        notify_url: 'http://localhost:8000/api/webhook-client',
      },
      order_expiry_time: expiryTime,
      payment_link: true,
      customer_details: {
        customer_id: String(customerId),
        customer_email: 'testpayment12@gmail.com',
        customer_phone: '9898989898',
        customer_name: 'Isshan',
      },
      payment_method: {
        upi: {
          channel: 'collect',
          upi_id: upiID,
        },
      },
    };

    // Headers for authentication
    const headers = {
      'x-api-version': '2023-08-01',
      'x-client-id': process.env.CASHFREE_CLIENT_ID as string,
      'x-client-secret': process.env.CASHFREE_CLIENT_SECRET as string,
      'Content-Type': 'application/json',
    };
    // const cashfreeResponse = await fetch('https://api.cashfree.com/pg/orders', {
    const cashfreeResponse = await fetch('https://sandbox.cashfree.com/pg/orders', {
      method: 'POST',
      headers,
      body: JSON.stringify(requestData),
    });

    const responseData = await cashfreeResponse.json();
    console.log(responseData, 'response response');
    if (responseData.payment_session_id) {
      return response.status(200).send({
        success: true,
        message: 'Payment initiated successfully',
        data: responseData,
      });
    } else {
      return response.status(400).send({
        success: false,
        message: 'error in Payment process',
        data: responseData,
      });
    }
  }

  @Post('/order-pay')
  @Authorized(['customer'])
  public async orderPay(
    @Body({ validate: true }) orderData: OrderPay,
    @Res() response: any,
    @Req() request: any
  ): Promise<any> {
    console.log(process.env.CASHFREE_CLIENT_ID as string, process.env.CASHFREE_CLIENT_SECRET as string);

    let requestData;
    if (orderData.paymentMethod === 'upi') {
      requestData = {
        payment_session_id: orderData.sessionId,
        // payment_method: 'upi',
        payment_method: {
          upi: {
            // channel: 'collect',
            // upi_id: 'testsuccess@gocash',
            channel: 'link',
            // upi_id: ' 7694995805@airtel',
          },
        },
      };
    }
    if (orderData.paymentMethod === 'card') {
      requestData = {
        payment_session_id: orderData.sessionId,
        // payment_method: 'upi',
        payment_method: {
          card: {
            channel: 'post',
            card_cvv: orderData.cvv,
            card_expiry_mm: orderData.expiryMonth,
            card_expiry_yy: orderData.expiryYear,
            card_number: orderData.cardNumber,
            // upi_id: ' 7694995805@airtel',
          },
        },
      };
    }
    // Headers for authentication
    const headers = {
      // 'x-api-version': '2022-09-01',
      'x-api-version': '2023-08-01',
      'x-client-id': process.env.CASHFREE_CLIENT_ID as string,
      'x-client-secret': process.env.CASHFREE_CLIENT_SECRET as string,
      'Content-Type': 'application/json',
    };
    const cashfreeResponse = await fetch(
      // 'https://api.cashfree.com/pg/orders/sessions',
      'https://sandbox.cashfree.com/pg/orders/sessions ',
      // `https://sandbox.cashfree.com/pg/orders/pay`,
      // `https://sandbox.cashfree.com/pg/orders/CF1738904225280/payments`,

      {
        method: 'POST',
        headers,
        body: JSON.stringify(requestData),
      }
    );

    const responseData = await cashfreeResponse.json();
    if (responseData) {
      return response.status(200).send({
        success: true,
        message: 'Payment initiated successfully',
        data: responseData,
      });
    } else {
      return response.status(400).send({
        success: false,
        message: 'error in Payment process',
        data: responseData,
      });
    }
  }

  @Post('/send-otp')
  @Authorized(['customer'])
  public async sendOtp(
    @Body({ validate: true }) otpData: SendOtp,
    @Res() response: any,
    @Req() request: any
  ): Promise<any> {
    console.log(process.env.CASHFREE_CLIENT_ID as string, process.env.CASHFREE_CLIENT_SECRET as string);

    const requestData = {
      // otp: otpData.otp,
      otp: '111000',
      action: otpData.action,
    };

    // Headers for authentication
    const headers = {
      // 'x-api-version': '2022-09-01',
      'x-api-version': '2023-08-01',
      'x-client-id': process.env.CASHFREE_CLIENT_ID as string,
      'x-client-secret': process.env.CASHFREE_CLIENT_SECRET as string,
      'Content-Type': 'application/json',
    };
    const cashfreeResponse = await fetch(
      // 'https://api.cashfree.com/pg/orders/sessions',
      // 'https://sandbox.cashfree.com/pg/orders/sessions ',
      `https://sandbox.cashfree.com/pg/orders/pay/authenticate/${otpData.paymentId}`,
      // `https://sandbox.cashfree.com/pg/orders/CF1738904225280/payments`,

      {
        method: 'POST',
        headers,
        body: JSON.stringify(requestData),
      }
    );

    const responseData = await cashfreeResponse.json();
    if (responseData) {
      return response.status(200).send({
        success: true,
        message: 'Payment initiated successfully',
        data: responseData,
      });
    } else {
      return response.status(400).send({
        success: false,
        message: 'error in Payment process',
        data: responseData,
      });
    }
  }
}
