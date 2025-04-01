import 'reflect-metadata';
import {
  Get,
  JsonController,
  Authorized,
  QueryParam,
  Res,
  Req,
  Param,
  //   Delete,
  //   BodyParam,
} from 'routing-controllers';
import { ProductService } from '../services/ProductService';
import { CategoryService } from '../services/CategoryService';
import { Service } from 'typedi';
// import { ProductToCategoryService } from '../../core/services/ProductToCategoryService';
// import { ProductImageService } from '../../core/services/ProductImageService';
// import { Product } from '../../core/models/ProductModel';
// import { ProductDiscount } from '../../core/models/ProductDiscount';
// import { ProductSpecial } from '../../core/models/ProductSpecial';
// import { instanceToPlain } from 'class-transformer';
// import { DeleteProductRequest } from './requests/DeleteProductRequest';
// import { AddProductRequest } from './requests/CreateProductRequest';
// import { UpdateProductRequest } from './requests/UpdateProductRequest';
// import { ProductToCategory } from '../../core/models/ProductToCategory';
// import { ProductImage } from '../../core/models/ProductImage';
// import { CategoryService } from '../../core/services/CategoryService';
// import { OrderProductService } from '../../core/services/OrderProductService';
// import { OrderService } from '../../core/services/OrderService';
// import { ProductTirePrice } from '../../core/models/ProductTirePrice';
// import { UpdateStockRequest } from './requests/UpdateStockRequest';
// import { CreateTirePriceRequest } from './requests/CreateTirePriceRequest';
// import { ProductViewLogService } from '../../core/services/ProductViewLogService';
// import { ProductDiscountService } from '../../core/services/ProductDiscountService';
// import { ProductSpecialService } from '../../core/services/ProductSpecialService';
// import moment = require('moment');
// import { CustomerService } from '../../core/services/CustomerService';
// import fs = require('fs');
// import { TaxService } from '../../core/services/TaxService';
// import { PaymentService } from '../../core/services/PaymentService';
// import { ImageService } from '../../core/services/ImageService';
// import { CategoryPathService } from '../../core/services/CategoryPathService';
// import { ProductTirePriceService } from '../../core/services/ProductTirePriceService';
// import { SkuService } from '../../core/services/SkuService';
// import { Sku } from '../../core/models/SkuModel';
// import { VendorProductService } from '../../core/services/VendorProductService';
// import { ProductVideoService } from '../../core/services/ProductVideoService';
// import { ProductVideo } from '../../core/models/ProductVideo';
// import { VendorService } from '../../core/services/VendorService';
// import { VendorPaymentService } from '../../core/services/VendorPaymentService';
// import { CustomerCartService } from '../../core/services/CustomerCartService';
// import { pluginModule } from '../../../loaders/pluginLoader';
// import {
//   productList,
//   productCreate,
//   excelExportProduct,
// } from '@spurtcommerce/product';
// import { ExportLog } from '../../core/models/ExportLog';
// import { ExportLogService } from '../../core/services/ExportLogService';

// import uncino from 'uncino';
// import { getConnection } from 'typeorm';
// import { TranslationMiddleware } from '../../core/middlewares/TranslationMiddleware';
// const hooks = uncino();

// @UseBefore(TranslationMiddleware)
@Service()
@JsonController('/storefront-product')
export class StorefrontProductController {
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  // Product List API
  @Get()
  @Authorized('customer')
  public async ProductList(
    @QueryParam('limit') limit: number,
    @QueryParam('offset') offset: number,
    @QueryParam('keyword') keyword: string,
    @QueryParam('popularity') popularity: string,
    @QueryParam('rating') rating: number,
    @QueryParam('bestDeal') bestDeal: number,
    @QueryParam('status') status: string,
    @QueryParam('lowestPrice') lowestPrice: string,
    @QueryParam('freeDelivery') freeDelivery: string,
    @QueryParam('count') count: number | boolean,

    @Res() response: any,
    @Req() request: any
  ): Promise<any> {
    const select = [
      'product.product_id AS productId',
      'product.name AS name',
      'rating',
      'description',
      'product.product_slug AS productSlug',
      'keywords',
      'width',
      'height',
      'length',
      'weight',
      'product.image AS image',
      'product.image_path As imagePath',
      'product.is_active AS isActive',
      'product.price AS price',
    ];
    const search = [];
    if (keyword && keyword !== 'null' && keyword.trim() !== '') {
      search.push({
        name: ['product.name', 'product.description', 'product.keywords'],
        value: keyword,
      });
    }

    const fetchedProducts: any = await this.productService.productListByQuery(
      limit,
      offset,
      select,
      search,
      rating,
      popularity,
      bestDeal,
      lowestPrice,
      freeDelivery
    );
    if (fetchedProducts.length > 0) {
      const successResponse: any = {
        status: 1,
        message: 'Successfully got all product list',
        data: fetchedProducts,
      };
      return response.status(200).send(successResponse);
    } else {
      const errorResponse: any = {
        status: 1,
        message: 'Unable to get product List',
      };
      return response.status(400).send(errorResponse);
    }
  }

  // Get single product API
  @Get('/product-detail/:id')
  @Authorized('customer')
  public async getProduct(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {
    console.log(request.body.userId, 'kkkkkk');
    const userId = request.body.userId;
    const select = [
      'product.product_id AS productId',
      'product.name AS name',
      'rating',
      'description',
      'product.product_slug AS productSlug',
      'keywords',
      'width',
      'height',
      'length',
      'weight',
      'product.image AS image',
      'product.image_path As imagePath',
      'product.is_active AS isActive',
      'product.price AS price',
    ];
    const filter = { product_id: id };

    const whereConditions = [];
    whereConditions.push({
      name: 'product.product_id',
      op: 'where',
      value: id,
    });

    const relations = [
      {
        table: 'product.cart',
        alias: 'CustomerCart',
      },
    ];
    const popularity: boolean = true;
    // if (keyword && keyword !== 'null' && keyword.trim() !== '') {
    //   search.push({
    //     name: ['product.name', 'product.description', 'product.keywords'],
    //     value: keyword,
    //   });
    // }

    const fetchedProducts: any = await this.productService.customProduct(
      select,
      popularity,
      whereConditions,
      relations,
      userId
    );
    if (fetchedProducts.length > 0) {
      const successResponse: any = {
        status: 1,
        message: 'Successfully got all product list',
        data: fetchedProducts,
      };
      return response.status(200).send(successResponse);
    } else {
      const errorResponse: any = {
        status: 1,
        message: 'Unable to get product List',
      };
      return response.status(400).send(errorResponse);
    }
  }
  @Get('/category')
  @Authorized(['customer'])
  public async getCategory(
    @Req() request: any,
    @Res() response: any,
    @QueryParam('limit') limit: number = 12,
    @QueryParam('offset') offset: number = 0
  ): Promise<any> {
    const userId = request.body.userId;
    if (!userId) {
      return response.status(400).send('user id or product id is missing');
    }
    const select = ['categoryId', 'name', 'parentInt', 'sortOrder', 'imagePath', 'image', 'categorySlug'];

    const relation = [];
    const whereConditions = [];
    whereConditions.push({
      name: 'isActive',
      op: 'where',
      value: 1,
    });
    const sortOrder = 1;
    const search = [];
    const count = 0;
    const favouriteProductList: any = await this.categoryService.list(
      limit,
      offset,
      select,
      search,
      whereConditions,
      relation,
      sortOrder,
      count
    );
    if (!favouriteProductList) {
      const successResponses: any = {
        status: 0,
        message: 'Failed to get all category list',
      };
      return response.status(200).send(successResponses);
    }

    const successResponse: any = {
      status: 1,
      message: 'Successfully got all active category list',
      data: favouriteProductList,
    };

    return response.status(200).send(successResponse);
  }
}
