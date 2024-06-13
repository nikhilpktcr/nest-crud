import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductService {
  private products: Product[] = [];
  insertProduct(title: string, description: string, price: number) {
    const proId = (Math.floor(Math.random() * 10000) * 100).toString();
    const newProduct = new Product(proId, title, description, price);
    this.products.push(newProduct);
    return proId;
  }
  fetchAllProducts() {
    return [...this.products];
  }

  private findProduct(id: string): [Product, number] {
    const resultIndex = this.products.findIndex((product) => product.id === id);
    const result = this.products[resultIndex];
    if (!result) {
      throw new NotFoundException('product not found');
    }
    return [result, resultIndex];
  }

  fetchProduct(proId: string) {
    const result = this.findProduct(proId);
    return { ...result };
  }

  updateProduct(
    proId: string,
    proTitle: string,
    proDesc: string,
    proPrice: number,
  ) {
    const [product, index] = this.findProduct(proId);
    const updateProduct = { ...product };
    if (updateProduct.title) updateProduct.title = proTitle;
    if (updateProduct.description) updateProduct.description = proDesc;
    if (updateProduct.title) updateProduct.price = proPrice;
    this.products[index] = updateProduct;
  }
  deleteProduct(proId: string) {
    const index = this.findProduct(proId)[1];
    this.products.splice(index, 1);
  }
}
