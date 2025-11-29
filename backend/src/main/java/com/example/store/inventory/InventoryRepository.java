package com.example.store.inventory;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.store.product.Product;
import com.example.store.store.Store;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    // find all inventory rows for a Store object
    List<Inventory> findByStore(Store store);

    // find all inventory rows for a Product object
    List<Inventory> findByProduct(Product product);

    // find a SINGLE row for a specific store + product combo
    Optional<Inventory> findByStoreAndProduct(Store store, Product product);
}
