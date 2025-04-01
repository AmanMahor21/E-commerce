import 'reflect-metadata';
import { Authorized, JsonController, Req, Res, Body, Put, Post, QueryParam, Get } from 'routing-controllers';
import { CustomerCartService } from '../services/CustomerCartService';
import { CustomerCart } from '../models/CustomerCart';
import { UpdateCartQuantityRequest } from '../requests/UpdateCartQuantityRequest';
import { AddproductToCart } from '../requests/AddproductToCart';
import { ProductService } from '../services/ProductService';
import { Inject, Service } from 'typedi';
import { AppDataSource } from '../database/connection';

@Service()
@JsonController('/storefront-cart')
export class CartProductController {
  // const customerCartService = Container.get(CustomerCartService);
  // constructor(
  //   @Inject() // Explicit injection
  //   private customerCartService: CustomerCartService,
  //   private productService: ProductService // // private vendorProductFavoriteService: VendorProductFavoriteService, // private vendorService: VendorService
  // ) {}
  private customerCartService: CustomerCartService;
  private productService: ProductService;

  constructor() {
    // ✅ Ensure DB is connected before using repositories
    if (!AppDataSource.isInitialized) {
      throw new Error('❌ Database connection is not initialized. Call connectMysql() first.');
    }

    // ✅ Manually create instances of services
    this.customerCartService = new CustomerCartService();
    this.productService = new ProductService();
  }

  // Add product in cart
  @Post()
  @Authorized(['customer'])
  public async addProductToCart(
    @Body({ validate: true }) addProduct: AddproductToCart,
    @Req() request: any,
    @Res() response: any
  ): Promise<any> {
    const customerId = request.body.userId;
    const isProductFound = await this.productService.findOne({
      where: { productId: addProduct.productId },
    });
    if (!isProductFound) {
      const errorResponse: any = {
        status: 0,
        message: 'product not found',
      };
      return response.status(400).send(errorResponse);
    }

    const isAlreadyInCart = await this.customerCartService.findOne({
      where: { productId: addProduct.productId, customerId },
    });
    if (isAlreadyInCart) {
      const errorResponse: any = {
        status: 0,
        message: 'Product already in the cart',
      };
      return response.status(400).send(errorResponse);
    }

    const newCustomerCart = new CustomerCart();
    newCustomerCart.productId = addProduct.productId;
    newCustomerCart.customerId = customerId;
    newCustomerCart.name = addProduct.name;
    newCustomerCart.productPrice = addProduct.productPrice;
    newCustomerCart.quantity = addProduct.quantity;
    newCustomerCart.total = addProduct.total;
    const updatedCart = await this.customerCartService.createData(newCustomerCart);
    if (!updatedCart) {
      const errorResponse: any = {
        status: 0,
        message: 'An error occurred while updating the cart',
      };
      return response.status(400).send(errorResponse);
    } else {
      const successResponse: any = {
        status: 1,
        message: 'Product added to cart successfully',
      };
      return response.status(200).send(successResponse);
    }
  }

  //Update cart quantity
  @Put()
  @Authorized(['customer'])
  public async updateCartQuantity(
    @Body({ validate: true }) updateCart: UpdateCartQuantityRequest,
    @Req() request: any,
    @Res() response: any
  ): Promise<any> {
    const customerId = request.body.userId;
    const productInCart = await this.customerCartService.findOne({
      where: { productId: updateCart.productId, customerId },
    });
    if (!productInCart) {
      const errorResponse: any = {
        status: 0,
        message: 'product not found',
      };
      return response.status(400).send(errorResponse);
    }

    if (updateCart.quantity === 0) {
      const deletedItem = await this.customerCartService.delete(productInCart.id);
      return response.status(200).send({
        status: 1,
        message: 'Product removed from the cart',
        data: deletedItem,
      });
    }

    productInCart.quantity = updateCart.quantity;
    productInCart.total = updateCart.total;
    const updatedCart = await this.customerCartService.createData(productInCart);
    if (!updatedCart) {
      const errorResponse: any = {
        status: 0,
        message: 'An error occurred while updating the cart',
      };
      return response.status(400).send(errorResponse);
    } else {
      const successResponse: any = {
        status: 1,
        message: 'Cart updated successfully',
      };
      return response.status(200).send(successResponse);
    }
  }

  // @Get()
  // @Authorized(['customer'])
  // public async getCartProducts(
  //   @Req() request: any,
  //   @Res() response: any,
  //   @QueryParam('limit') limit: number = 12,
  //   @QueryParam('offset') offset: number = 0
  // ): Promise<any> {
  //   const userId = request.body.userId;
  //   console.log(userId, 'iddddddddddddddddddddd');
  //   if (!userId) {
  //     return response.status(400).send('user id or product id is missing');
  //   }
  //   const select = ['name', 'productId', 'productPrice', 'total', 'quantity'];

  //   const relation = [];
  //   // const relations = [
  //   //   {
  //   //     table: 'product.productFavorites',
  //   //     alias: 'productFavorites',
  //   //   },
  //   //   {
  //   //     table: 'product.vendorProducts',
  //   //     alias: 'vendorProduct',
  //   //   },
  //   //   {
  //   //     table: 'vendorProduct.vendor',
  //   //     alias: 'vendor',
  //   //   },
  //   // ];
  //   const whereConditions = [];
  //   whereConditions.push({
  //     name: 'customerId',
  //     op: 'where',
  //     value: userId,
  //   });
  //   //  const sortOrder = 1;
  //   const search = [];
  //   const count = 0;
  //   // sort.push({ name: 'productFavorites.createdDate', order: 'DESC' });
  //   const favouriteProductList: any = await this.customerCartService.list(
  //     limit,
  //     offset,
  //     select,
  //     relation,
  //     whereConditions,
  //   );
  //   if (!favouriteProductList) {
  //     const successResponses: any = {
  //       status: 0,
  //       message: 'No favorite products for the user',
  //     };
  //     return response.status(200).send(successResponses);
  //   }

  //   const successResponse: any = {
  //     status: 1,
  //     message: 'Successfully got the list of the favorite products of the user',
  //     data: favouriteProductList,
  //   };

  //   return response.status(200).send(successResponse);
  // }
  // get all cart's product
  @Get()
  @Authorized(['customer'])
  public async getCartProducts(
    @Req() request: any,
    @Res() response: any,
    @QueryParam('limit') limit: number = 12,
    @QueryParam('offset') offset: number = 0
  ): Promise<any> {
    // const userId = 373;

    const userId = request.body.userId;
    console.log(userId, 'userrrrrrrrrr');
    if (!userId) {
      return response.status(400).send('user id or product id is missing');
    }
    const select = [
      'MAX(product.image) AS image',
      'MAX(product.imagePath) AS imagePath',
      'MAX(vendor.companyName) AS companyName',
      'MAX(CustomerCart.name) AS name',
      'MAX(CustomerCart.productId) AS productId',
      'MAX(CustomerCart.productPrice) AS productPrice',
      'MAX(CustomerCart.total) AS total',
      'MAX(CustomerCart.quantity) AS quantity',
      'SUM(CustomerCart.total) AS subtotal',
      // 'COUNT(productDiscount.product_id) AS discountCount',
    ];

    const selectFields = [{ value: 'MIN(productDiscount.price)', alias: 'productDiscount' }];
    const whereConditions = [];
    whereConditions.push({
      name: 'CustomerCart.customerId',
      op: 'where',
      value: userId,
    });

    const relation = [
      {
        table: 'CustomerCart.product',
        alias: 'product',
      },
      {
        table: 'product.vendorProducts',
        alias: 'vendorProduct',
      },
      {
        table: 'vendorProduct.vendor',
        alias: 'vendor',
      },
      {
        table: 'product.productDiscount',
        alias: 'productDiscount',
        condition:
          'productDiscount.priority = 1 AND productDiscount.date_start <= CURRENT_DATE AND productDiscount.date_end >= CURRENT_DATE',
      },
    ];
    const count = 0;
    const favouriteProductList: any = await this.customerCartService.list(
      limit,
      offset,
      select,
      relation,
      whereConditions,
      selectFields,
      count
    );
    if (!favouriteProductList) {
      const successResponses: any = {
        status: 0,
        message: 'No products found in cart',
      };
      return response.status(200).send(successResponses);
    }

    const successResponse: any = {
      status: 1,
      message: 'Successfully retrieved the list of products in the cart',
      data: favouriteProductList,
    };

    return response.status(200).send(successResponse);
  }
}
