package com.example.store.product;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from your React app
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    // Constructor injection
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // GET /api/products
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // POST /api/products
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product created = productService.createProduct(product);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // GET /api/products/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        try {
            Product product = productService.getProductById(id);
            return ResponseEntity.ok(product);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // PUT /api/products/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestBody Product updatedProduct
    ) {
        try {
            Product saved = productService.updateProduct(id, updatedProduct);
            return ResponseEntity.ok(saved);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE /api/products/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProduct(id);
            return ResponseEntity.noContent().build(); // 204
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();  // 404
        }
    }
}
