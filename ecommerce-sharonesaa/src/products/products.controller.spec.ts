import { Test, TestingModule } from "@nestjs/testing";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { Product } from "./products.entity";
import { ProductDto } from "./product.dto";
import { Category } from '../categories/categories.entity'; 
import { JwtAuthGuard } from '../guards/auth.guard';
import { JwtService } from "@nestjs/jwt";


class JwtAuthGuardMock {
    canActivate(context: any): boolean {
      return true; // Permite todas las solicitudes
    }
}

const mockJwtService = {
    // Implementa métodos necesarios para el guardia, si es necesario
};

describe('ProductsController', () => {
    let productsController: ProductsController;
    let mockProductsService: Partial<ProductsService>;

   
    const mockCategory: Category = {
    id: 'category-id',
    name: 'Sample Category',
    product: null, 
    };

    const mockProduct: Product = {
        id: '1',
        name: 'Sample Product',
        description: 'This is a sample product description',
        price: 99.99,
        imgUrl: 'http://example.com/image.jpg',
        stock: 10,
        category: mockCategory,
        orderDetails: [],              
      };

    const mockProductDto: ProductDto = {
        name: 'Sample Product',
        description: 'This is a sample product description',
        price: 99.99,
        imgUrl: 'http://example.com/image.jpg',
        stock: 10,
        
    };

    beforeEach(async () => {
        mockProductsService = {
            getProducts: jest.fn().mockResolvedValue([mockProduct]),
            getProduct: jest.fn().mockResolvedValue(mockProduct),
            updateProduct: jest.fn().mockResolvedValue({...mockProduct, ...mockProductDto}),
            loadProducts: jest.fn().mockResolvedValue({ message: 'Products loaded successfully' })
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [
                { provide: ProductsService, useValue: mockProductsService },
                { provide: JwtAuthGuard, useClass: JwtAuthGuardMock },
                { provide: JwtService, useValue: mockJwtService },
            ],
        }).compile();

        productsController = module.get<ProductsController>(ProductsController);
    });

    it('should be defined', () => {
        expect(productsController).toBeDefined();
    });

    describe('getProducts', () => {
        it('should return an array of products', async () => {
            const result = await productsController.getProducts(1, 5);
            expect(result).toEqual([mockProduct]);
        });
    });

    describe('getProduct', () => {
        it('should return a single product by id', async () => {
            const result = await productsController.getProduct({ id: '1' });
            expect(result).toEqual(mockProduct);
        });
    });

    describe('updateProduct', () => {
        it('should update a product and return the updated product id', async () => {
            const result = await productsController.updateProduct('1', mockProductDto);
            expect(result).toEqual({ id: '1' });
            expect(mockProductsService.updateProduct).toHaveBeenCalledWith('1', mockProductDto);
        });
    });

    describe('loadProducts', () => {
        it('should load products and return success message', async () => {
            const result = await productsController.loadProducts();
            expect(result).toEqual({ message: 'Products loaded successfully' });
            expect(mockProductsService.loadProducts).toHaveBeenCalled();
        });
    });
});
