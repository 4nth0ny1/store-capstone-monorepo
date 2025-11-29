package com.example.store.inventory;

import com.example.store.store.Store;
import com.example.store.product.Product;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many inventory rows belong to ONE store
    @ManyToOne
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;

    // Many inventory rows belong to ONE product
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    // Quantity of that product in that store
    private int quantity;

    public Inventory() {}

    public Inventory(Store store, Product product, int quantity) {
        this.store = store;
        this.product = product;
        this.quantity = quantity;
    }

    public Long getId() {
        return id;
    }

    public Store getStore() {
        return store;
    }

    public Product getProduct() {
        return product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
