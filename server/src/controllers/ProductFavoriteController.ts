import 'reflect-metadata';
import {
  Authorized,
  JsonController,
  Get,
  Req,
  Res,
  Param,
  Body,
  Post,
  Delete,
  QueryParam,
} from 'routing-controllers';
import { Service } from 'typedi';
import { ProductFavorites } from '../models/ProductFavorites';
import { ProductService } from '../services/ProductService';
import { CreateProductFavoriteRequest } from '../requests/CreateProductFavoriteRequest';
import { ProductFavoriteService } from '../services/ProductFavoriteService';
import { VendorProductFavorites } from '../models/VendorProductFavourite';
import { VendorService } from '../services/VendorService';
// import { CustomerService } from '../../core/services/CustomerService';
import { VendorProductFavoriteService } from '../services/VendorFavouriteProductService';

@Service()
@JsonController('/favorites')
export class ProductFavoriteController {
  constructor(
    private productFavoriteService: ProductFavoriteService,
    private productService: ProductService,
    private vendorProductFavoriteService: VendorProductFavoriteService,
    private vendorService: VendorService
  ) {}

  // Save a product to the user's favorite list
  @Post()
  @Authorized(['customer'])
  // @Authorized(['customer'])
  public async addProductFavoriteForUser(
    @Body({ validate: true }) productFavorite: CreateProductFavoriteRequest,
    @Req() request: any,
    @Res() response: any
  ): Promise<any> {
    const customerId = request.body.userId;
    const existingProduct = await this.productService.findOne({
      where: { productId: request.body.productId },
    });
    if (!existingProduct) {
      const errorResponse: any = {
        status: 0,
        errorCode: 'PRODUCT_NOT_FOUND',
        message: 'product id is invalid',
      };
      return response.status(400).send(errorResponse);
    }
    const alreadyFavorite = await this.productFavoriteService.findOne({
      where: { productId: request.body.productId, customerId },
    });

    if (alreadyFavorite) {
      const errorResponse: any = {
        status: 0,
        errorCode: 'ALREADY_FAVORITED',
        message: 'product already added for the user',
      };
      return response.status(409).send(errorResponse);
    }

    const newProductFavorite = new ProductFavorites();
    newProductFavorite.customerId = customerId;
    newProductFavorite.productId = existingProduct.productId;
    const productFavoriteSave = await this.productFavoriteService.create(newProductFavorite);
    if (!productFavoriteSave) {
      const errorResponse: any = {
        status: 0,
        message: 'Unbale to add the favorite product of the user',
      };
      return response.status(400).send(errorResponse);
    } else {
      const successResponse: any = {
        status: 1,
        message: 'Successfully added the product as favorite of the user',
      };
      return response.status(201).send(successResponse);
    }
  }

  // Get the saved product list from the user's favorites list
  @Get('/list')
  @Authorized(['customer'])
  public async productFavoriteListForUser(
    @Req() request: any,
    @Res() response: any,
    @QueryParam('limit') limit: number = 12,
    @QueryParam('offset') offset: number = 0
  ): Promise<any> {
    const userId = request.body.userId;
    if (!userId) {
      return response.status(400).send('user id or product id is missing');
    }
    const select = [
      'productFavorites.productFavoriteId as productFavId',
      'productFavorites.customerId as customerId',
      'vendor.companyName as companyName',
      'product.productId AS productId',
      'product.name AS name',
      'product.sku AS sku',
      'product.quantity AS quantity',
      'product.image AS image',
      'product.imagePath AS imagePath',
      'product.price AS price',
      'product.description AS description',
      'product.discount AS discount',
      'product.rating AS rating',
      // product.height AS product_height,
      // product.length AS product_length,
      // product.weight AS product_weight,
      // product.product_slug AS product_slug,
      // product.product_id AS product_product_id,
      // COUNT(OrderProduct.product_id) AS orderCount
    ];

    const relations = [
      {
        table: 'product.productFavorites',
        alias: 'productFavorites',
      },
      {
        table: 'product.vendorProducts',
        alias: 'vendorProduct',
      },
      {
        table: 'vendorProduct.vendor',
        alias: 'vendor',
      },
    ];
    const whereConditions = [];
    whereConditions.push({
      name: 'productFavorites.customerId',
      op: 'where',
      value: userId,
    });
    const sort = [];
    // sort.push({ name: 'productFavorites.createdDate', order: 'DESC' });
    const favouriteProductList: any = await this.productFavoriteService.listByQueryBuilder(
      limit,
      offset,
      select,
      whereConditions,
      relations,
      sort
    );
    if (!favouriteProductList) {
      const successResponses: any = {
        status: 0,
        message: 'No favorite products for the user',
      };
      return response.status(200).send(successResponses);
    }

    const successResponse: any = {
      status: 1,
      message: 'Successfully got the list of the favorite products of the user',
      data: favouriteProductList,
    };

    return response.status(200).send(successResponse);
  }

  // Get the saved product ID from the user's favorites list
  @Get('/:productId')
  @Authorized(['customer'])
  public async productFavoriteIdForUser(
    @Param('productId') id: number,
    @Req() request: any,
    @Res() response: any
  ): Promise<any> {
    const customerId = request.body.userId;
    if (!customerId || !id) {
      response.status(400).send('user id or product id is missing');
    }

    const favoriteProduct = await this.productFavoriteService.findOne({
      where: { customerId, productId: id },
    });
    if (!favoriteProduct) {
      const successResponses: any = {
        status: 0,
        message: 'Enter valid Product Favorite Id for the User',
      };
      return response.status(200).send(successResponses);
    }

    const successResponse: any = {
      status: 1,
      message: 'Successfully got the Product Favorite Id',
      data: favoriteProduct,
    };

    return response.status(200).send(successResponse);
  }

  // Get the saved product IDs list from the user's favorites list
  @Get()
  @Authorized(['customer'])
  public async productFavoriteIdsListForUser(@Req() request: any, @Res() response: any): Promise<any> {
    const customerId = request.body.userId;
    if (!customerId) {
      response.status(400).send('user id or product id is missing');
    }

    const favoriteProduct = await this.productFavoriteService.find({
      where: { customerId },
    });

    if (!favoriteProduct) {
      const successResponses: any = {
        status: 0,
        message: 'No favorite products for the user',
      };
      return response.status(200).send(successResponses);
    }

    const successResponse: any = {
      status: 1,
      message: 'Successfully got the list of the favorite products of the user',
      data: favoriteProduct,
    };

    return response.status(200).send(successResponse);
  }
  // Get details of a specific saved product from the user's favorites list
  @Get('/product-detail/:productId')
  @Authorized(['customer'])
  public async productDetailForUser(
    @Param('productId') id: number,
    @QueryParam('limit') limit: number,
    @QueryParam('offset') offset: number,
    @Req() request: any,
    @Res() response: any
  ): Promise<any> {
    const customerId = request.body.userId;
    if (!customerId || !id) {
      response.status(400).send('user id or product id is missing');
    }
    const select = [
      'productFavorites.productFavoriteId as productFavoriteId',
      'productFavorites.customerId as customerId',
      'product.productId AS productId',
      'product.sku AS product_sku',
      'product.quantity AS product_quantity',
      'product.image AS product_image',
      'product.price AS product_price',
      'product.description AS product_description',
      'product.keywords AS product_keywords',
      'product.discount AS product_discount',
      'product.rating AS product_rating',
      'product.is_active AS product_is_active',
      'product.width AS product_width',
      // product.height AS product_height,
      // product.length AS product_length,
      // product.weight AS product_weight,
      // product.product_slug AS product_slug,
      // product.product_id AS product_product_id,
      // COUNT(OrderProduct.product_id) AS orderCount
    ];

    const relations = [
      {
        table: 'product.productFavorites',
        alias: 'productFavorites',
      },
    ];
    const whereConditions = [];
    whereConditions.push({
      name: 'productFavorites.productId',
      op: 'where',
      value: id,
    });
    whereConditions.push({
      name: 'productFavorites.customerId',
      op: 'and',
      value: customerId,
    });

    const sort = [];
    const favouriteProductList: any = await this.productFavoriteService.listByQueryBuilder(
      limit,
      offset,
      select,
      whereConditions,
      relations,
      sort
    );
    if (!favouriteProductList) {
      const successResponses: any = {
        status: 0,
        message: 'Enter valid Product Favorite Id for the User',
      };
      return response.status(200).send(successResponses);
    }
    const successResponse: any = {
      status: 1,
      message: 'Successfully got the Product Favorite Id',
      data: favouriteProductList,
    };

    return response.status(200).send(successResponse);
  }
  // Delete a specific favorite product
  @Delete('/:productFavoriteId')
  @Authorized(['customer'])
  public async deleteProductFavoriteIdForUser(
    @Param('productFavoriteId') id: number,
    @Req() request: any,
    @Res() response: any
  ): Promise<any> {
    const customerId = request.body.userId;
    if (!customerId || !id) {
      response.status(400).send('user id or product id is missing');
    }

    const favoriteProduct = await this.productFavoriteService.findOne({
      where: { customerId, productFavoriteId: id },
    });

    if (!favoriteProduct) {
      const successResponses: any = {
        status: 0,
        message: 'Enter valid Product Favorite Id for the User',
      };
      return response.status(200).send(successResponses);
    }
    const deleteFavoriteProduct = await this.productFavoriteService.delete(favoriteProduct.productFavoriteId);
    if (!deleteFavoriteProduct) {
      const successResponses: any = {
        status: 0,
        message: 'Enter valid Product Favorite Id for the User',
      };
      return response.status(200).send(successResponses);
    }

    const successResponse: any = {
      status: 1,
      message: 'Successfully got the Product Favorite Id',
      data: deleteFavoriteProduct,
    };

    return response.status(200).send(successResponse);
  }

  // Save a product to the vendor's favorite list
  @Post('/vendor/save-product')
  @Authorized(['customer'])
  public async addProductFavoriteForVendor(
    @Body({ validate: true }) productFavorite: CreateProductFavoriteRequest,
    @Req() request: any,
    @Res() response: any
  ): Promise<any> {
    const id = request.body.userId;
    const existingProduct = await this.productService.findOne({
      where: { productId: productFavorite.productId },
    });
    if (!existingProduct) {
      const errorResponse: any = {
        status: 0,
        message: 'product id is invalid',
      };
      return response.status(400).send(errorResponse);
    }
    const findVendor = await this.vendorService.findOne({
      where: { customerId: id },
    });
    if (!findVendor) {
      const errorResponse: any = {
        status: 0,
        message: 'Unbale to find vendor',
      };
      return response.status(200).send(errorResponse);
    }

    const alreadyFavorite = await this.vendorProductFavoriteService.findOne({
      where: { productId: productFavorite.productId, vendorId: findVendor.vendorId },
    });

    if (alreadyFavorite) {
      const errorResponse: any = {
        status: 0,
        message: 'product already added for the user',
      };
      return response.status(200).send(errorResponse);
    }

    const newVendorProductFavorites = new VendorProductFavorites();
    newVendorProductFavorites.vendorId = findVendor.vendorId;
    newVendorProductFavorites.productId = existingProduct.productId;
    const productFavoriteSave = await this.vendorProductFavoriteService.create(newVendorProductFavorites);
    if (!productFavoriteSave) {
      const errorResponse: any = {
        status: 0,
        message: 'Unbale to add the favorite product of the user',
      };
      return response.status(400).send(errorResponse);
    } else {
      const successResponse: any = {
        status: 1,
        message: 'Successfully added the product as favorite of the user',
      };
      return response.status(200).send(successResponse);
    }
  }

  // Get the saved product list from the vendor's favorites list
  @Get('/vendor/list')
  @Authorized(['customer'])
  public async productFavoriteListForVendor(
    @Req() request: any,
    @Res() response: any,
    @QueryParam('limit') limit: number = 12,
    @QueryParam('offset') offset: number = 0
  ): Promise<any> {
    const customerId = request.body.userId;
    if (!customerId) {
      return response.status(400).send('user id or product id is missing');
    }
    const findVendor = await this.vendorService.findOne({
      where: { customerId },
    });
    if (!findVendor) {
      const errorResponse: any = {
        status: 0,
        message: 'Unbale to find vendor',
      };
      return response.status(200).send(errorResponse);
    }
    // const select = [
    //   'vendorProductFavorites.product_favorite_id as product_Favorite_Id',
    //   'vendorProductFavorites.vendor_id as vendor_id',
    //   'product.productId AS produc_id',
    //   'product.sku AS product_sku',
    //   'product.quantity AS product_quantity',
    //   'product.image AS product_image',
    //   'product.price AS product_price',
    //   'product.description AS product_description',
    //   'product.keywords AS product_keywords',
    //   'product.discount AS product_discount',
    //   'product.rating AS product_rating',
    //   'product.is_active AS product_is_active',
    //   'product.width AS product_width',
    //   // product.height AS product_height,
    //   // product.length AS product_length,
    //   // product.weight AS product_weight,
    //   // product.product_slug AS product_slug,
    //   // product.product_id AS product_product_id,
    //   // COUNT(OrderProduct.product_id) AS orderCount
    // ];
    const favouriteProductList = await this.vendorService.findSelected({
      vendorId: findVendor.vendorId,
    });
    // const relations = [];
    // relations.push({
    //   table: 'product.vendorProductFavorites',
    //   alias: 'vendorProductFavorites',
    // });

    // const whereConditions = [];
    // whereConditions.push({
    //   name: 'vendorProductFavorites.vendor_id',
    //   op: 'where',
    //   value: findVendor.vendorId,
    // });

    // const sort = [];
    // sort.push({ name: 'vendorProductFavorites.createdDate', order: 'DESC' });

    // const favouriteProductList: any = await this.vendorProductFavoriteService.listByQueryBuilder(
    //   limit,
    //   offset,
    //   select,
    //   whereConditions,
    //   relations,
    //   sort
    // );

    if (!favouriteProductList) {
      const successResponses: any = {
        status: 0,
        message: 'No favorite products for the vendor',
      };
      return response.status(200).send(successResponses);
    }

    const successResponse: any = {
      status: 1,
      message: 'Successfully got the list of the favorite products of the vendor',
      data: favouriteProductList,
    };

    return response.status(200).send(successResponse);
  }

  // Delete a specific favorite product from vendor list
  @Delete('/vendor/:productFavoriteId')
  @Authorized(['customer'])
  public async deleteProductFavoriteIdForVendor(
    @Param('productFavoriteId') id: number,
    @Req() request: any,
    @Res() response: any
  ): Promise<any> {
    const customerId = request.body.userId;
    if (!customerId || !id) {
      response.status(400).send('user id or product id is missing');
    }

    const findVendor = await this.vendorService.findOne({
      where: { customerId },
    });
    if (!findVendor) {
      const errorResponse: any = {
        status: 0,
        message: 'Unbale to find vendor',
      };
      return response.status(200).send(errorResponse);
    }
    const favoriteProduct = await this.vendorProductFavoriteService.findOne({
      where: { vendorId: findVendor.vendorId, productFavoriteId: id },
    });

    if (!favoriteProduct) {
      const successResponses: any = {
        status: 0,
        message: 'Enter valid Product Favorite Id for the User',
      };
      return response.status(200).send(successResponses);
    }

    const deleteFavoriteProduct = await this.vendorProductFavoriteService.delete(favoriteProduct);

    if (!deleteFavoriteProduct) {
      const successResponses: any = {
        status: 0,
        message: 'Enter valid Product Favorite Id for the User',
      };
      return response.status(200).send(successResponses);
    }

    const successResponse: any = {
      status: 1,
      message: 'Successfully deleted Favorite Product',
      data: deleteFavoriteProduct,
    };

    return response.status(200).send(successResponse);
  }
}
