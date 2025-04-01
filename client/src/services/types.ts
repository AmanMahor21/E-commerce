// Interface for Product Highlights
interface ProductHighlight {
  data: string;
}

// Interface for Product Image
interface ProductImage {
  productId: number;
  image: string;
  containerName: string | null;
  defaultImage: number;
}

// Interface for Category
interface Category {
  createdBy: string | null;
  createdDate: string | null;
  modifiedBy: string | null;
  modifiedDate: string | null;
  categoryId: number;
  name: string;
  image: string;
  imagePath: string;
  parentInt: number;
  sortOrder: number;
  categorySlug: string;
  isActive: string;
  categoryDescription: string;
  levels: string;
}

// Interface for Vendor
interface Vendor {
  vendorName: string;
  companyName: string;
  companyLogo: string;
  companyLogoPath: string;
}

// Interface for Product Video
interface ProductVideo {
  id: number;
  productId: number;
  name: string;
  path: string;
  type: number;
}

// Main Product Interface
export interface Product {
  createdDate?: string;
  productId: number | string;
  sku?: string;
  upc?: string;
  hsn?: string;
  location?: string | null;
  quantity?: number;
  productFavId?: string | null;
  companyName?: string;
  customerId?: string | null;
  minimumQuantity?: number | null;
  subtractStock?: number | null;
  stockStatusId?: number;
  quotationAvailable?: number;
  image?: string;
  imagePath?: string | undefined;
  manufacturerId?: number | null;
  shipping?: string | null;
  serviceCharges?: string; // JSON string; consider parsing if needed
  taxType?: number;
  taxValue?: number;
  price?: string;
  priceUpdateFileLogId?: number | null;
  dateAvailable?: string;
  sortOrder?: number;
  name?: string;
  description?: string;
  amount?: number | null;
  keywords?: string;
  discount?: number | null;
  deleteFlag?: number;
  isFeatured?: number | null;
  todayDeals?: number | null;
  condition?: string | null;
  rating?: string;
  wishListStatus?: number | null;
  productSlug?: string;
  isActive?: number;
  width?: string;
  height?: string;
  length?: string;
  weight?: string;
  hasStock?: number;
  priceType?: number;
  isSimplified?: number;
  owner?: number;
  isCommon?: number;
  skuId?: number;
  hasTirePrice?: number;
  outOfStockThreshold?: number | null;
  notifyMinQuantity?: number | null;
  minQuantityAllowedCart?: number | null;
  maxQuantityAllowedCart?: number | null;
  enableBackOrders?: number | null;
  pincodeBasedDelivery?: number;
  attributeKeyword?: string | null;
  settedAsCommonOn?: string | null;
  productHighlights?: ProductHighlight[];
  totalRatingCount?: number;
  productCost?: number;
  packingCost?: number;
  shippingCost?: number;
  others?: number;
  priceWithTax?: number;
  productImage?: ProductImage[];
  Category?: Category[];
  productSpecialPrice?: any[]; // Replace `any` with proper type if structure is known
  productDiscountData?: any[]; // Replace `any` with proper type if structure is known
  productDiscount?: number;
  productTirePrices?: any[]; // Replace `any` with proper type if structure is known
  vendor?: Vendor;
  orderCount: string;
  cartQuantity?: string;
  productVideo?: ProductVideo;
}

export interface ProductRating {
  createdBy?: string;
  createdDate: string;
  modifiedBy?: string;
  modifiedDate?: string;
  ratingId: number;
  productId: number;
  customerId: number;
  firstName: string;
  lastName: string | '';
  email: string;
  rating: number;
  review: string;
  imagePath?: string;
  image?: string;
  isActive: number;
  orderProductId: number;
  video?: string;
  videoPath?: string;
}

export interface VendorList {
  vendorId: number;
  companyName: string;
  companyCity: string;
  companyState: string;
  companyDescription: string;
  productImages: ProductImage[];
  startingFrom: number;
}
export interface CreateAddress {
  name: string;
  houseNumber: string;
  landmark?: string;
  mobileNumber: string;
  isDefault?: string | number;
  villageArea: string;
  city: string;
  pincode: string;
  state: string;
  alternateNumber?: string;
  label?: string;
}

export interface GetAddress {
  addressId: string;
  name: string;
  houseNumber: string;
  landmark: string;
  mobileNumber: string;
  villageArea: string;
  isDefault: string | number;
  city: string;
  pincode: string;
  state: string;
  alternateNumber: string;
  label: string;
}

export interface LoginEmail {
  email: string;
}
export interface FavouriteProduct {
  productId: string | number;
}
export interface categoryProduct {
  product_id: string;
  sku: string;
  image: string;
  imagePath: string;
}
export interface categoryList {
  categoryId: number;
  name: string;
  parentInt: number;
  sortOrder: number;
  imagePath: string;
  image: string;
  categorySlug: string;
}
export interface AddToCart {
  // categoryId: number;
  productId: number | string;
  name?: string;
  total?: number;
  quantity?: string;
  productPrice?: string | number;
  companyName?: string;
  imagePath?: string;
  image?: string;
  productDiscount?: string;
}

export interface profile {
  fName: string;
  lName: string;
  mobile: string;
  gender: string;
}
