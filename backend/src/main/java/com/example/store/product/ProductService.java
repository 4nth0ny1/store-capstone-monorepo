package com.example.store.product;

import java.util.List;

import com.example.store.product.Product;

public interface ProductService {
    List<Product> getAllProducts();
    Product createProduct(Product product);

    Product getProductById(Long id);
    Product updateProduct(Long id, Product updatedProduct);
    void deleteProduct(Long id);
}
