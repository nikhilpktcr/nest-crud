import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  addProducts(
    @Body('title') proTitle: string,
    @Body('description') proDesc: string,
    @Body('price') proPrice: number,
  ): any {
    const generatedId = this.productService.insertProduct(
      proTitle,
      proDesc,
      proPrice,
    );
    return { id: generatedId };
  }

  @Get()
  getAllProducts() {
    const result = this.productService.fetchAllProducts();
    return result;
  }

  @Get(':id')
  getProduct(@Param('id') proId: string) {
    const result = this.productService.fetchProduct(proId);
    return result;
  }

  @Patch(':id')
  patchProduct(
    @Param('id') proId: string,
    @Body('title') proTitle: string,
    @Body('description') proDesc: string,
    @Body('price') proPrice: number,
  ) {
    this.productService.updateProduct(proId, proTitle, proDesc, proPrice);
    return true;
  }

  @Delete(':id')
  deleteProduct(@Param('id') proId: string) {
    this.productService.deleteProduct(proId);
    return true;
  }
}
