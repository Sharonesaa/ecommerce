import { Injectable } from "@nestjs/common";
import { ProductDto } from "src/Dto/product.dto";

 @Injectable()
 export class ProductsRepository{
     
    private products =[
        { 
        id: 1,
        name: 'Teclado', 
        description: 'Negro', 
        price: 25000, 
        imgUrl:'teclado.jpg', 
        stock: true
        },
        { 
        id: 2, 
        name: 'Monitor', 
        description: 'Blanco', 
        price: 40000, 
        imgUrl:'monitor.jpg', 
        stock: true 
        }
    ];
    
    async getProducts(){
        return this.products;
    }

    async getById(id: number) {
        return this.products.find((product)=> product.id == id);
    }

    createProduct(createProductDto: ProductDto) {
        const newProduct = {
          id: this.products.length + 1,
          ...createProductDto
        };
        this.products.push(newProduct);
        return newProduct;
      }
    
      updateProduct(id: number, updateProductDto: ProductDto) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex > -1) {
          this.products[productIndex] = { ...this.products[productIndex], ...updateProductDto };
          return this.products[productIndex];
        }
        return null;
      }

    async deleteProduct(id: number) {
        const index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
        const deletedProduct = this.products.splice(index, 1);
        return deletedProduct[0];
        }
        return null;
    }
   
 }