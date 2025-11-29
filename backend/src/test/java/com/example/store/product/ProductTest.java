package com.example.store.product;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class ProductTest {

    @Test
    void canSetAndGetNameAndPrice() {
        // Arrange
        Product product = new Product();

        // Act
        product.setName("Test Product");
        product.setPrice(9.99);

        // Assert
        assertThat(product.getName()).isEqualTo("Test Product");
        assertThat(product.getPrice()).isEqualTo(9.99);
    }
}
