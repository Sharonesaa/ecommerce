import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { ProductDto } from "src/Dto/product.dto";

@Injectable()
export class ProductsService{
    constructor (
        private productsRepository: ProductsRepository,
    ){}

    getProducts(){
        return this.productsRepository.getProducts();
    }

    createProduct(createProductDto: ProductDto) {
        return this.productsRepository.createProduct(createProductDto);
      }
    
      updateProduct(id: number, updateProductDto: ProductDto) {
        return this.productsRepository.updateProduct(id, updateProductDto);
      }
    
      deleteProduct(id: number) {
        return this.productsRepository.deleteProduct(id);
      }

    getById(id: number) {
        return this.productsRepository.getById(id);
    }

    }



