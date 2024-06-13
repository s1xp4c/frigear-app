import {afterEach, beforeAll, beforeEach, describe, expect, it} from "vitest";
import {createSupabaseServiceRoleClient} from "@/utils/supabase/server";
import {SupabaseClient} from "@supabase/supabase-js";
import {ProductRepository} from "@/lib/repositories/product/product-repository";
import ProductService from "@/lib/services/product/product-service";
import SupabaseProductRepository from "@/lib/repositories/product/supabase-product-repository";
import {copycat} from "@snaplet/copycat";

describe('service/supabase-product-service', () => {
    let client: SupabaseClient;
    let repository: ProductRepository;
    let productService: ProductService;

    beforeEach(async () => {
        client = createSupabaseServiceRoleClient();
        repository = new SupabaseProductRepository(client);
        productService = new ProductService(repository);
        await productService.deleteAll();
    });

    it('should delete all products', async () => {
        await productService.deleteAll();
        const products = await productService.all();
        expect(products.length).toBe(0);
    });

    it('should create a product', async () => {
        const {id, name} = await productService.create({
            name: 'Test product',
            slug: 'test-product'
        });

        expect(id).toBeDefined();
        expect(name).toBe('Test product');
    });

    it('should throw errors on create', async () => {
        const slug = 'test';
        const firstProduct = await productService.create({
            name: 'Test product',
            slug,
        });

        await expect(productService.create({
            name: 'Test product2',
            slug,
        })).rejects.toThrow('Key (slug)=(test) already exists.');


        await productService.deleteAll();
    });

    it('should fetch products', async () => {
        await productService.create({
            name: copycat.streetName('1'),
            slug: copycat.mac('1'),
        });
        await productService.create({
            name: copycat.streetName('2'),
            slug: copycat.country('2'),
        })
        const products = await productService.all();
        expect(products.length).toBe(2);
    });

    it('should update a product', async () => {
        const {id} = await productService.create({
            name: 'Product',
            slug: 'product',
        });

        const {name} = await productService.updateById(id, {
            name: 'New name'
        });

        expect(name).toBe('New name');
    });

    it('should delete a product', async () => {
        const {id} = await productService.create({
            name: 'Product',
            slug: 'product',
        });
        await productService.deleteById(id);
    });
})