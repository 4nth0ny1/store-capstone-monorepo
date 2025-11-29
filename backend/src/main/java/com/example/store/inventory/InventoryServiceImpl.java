package com.example.store.inventory;

import com.example.store.store.Store;
import com.example.store.store.StoreRepository;
import com.example.store.product.Product;
import com.example.store.product.ProductRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepository inventoryRepository;
    private final StoreRepository storeRepository;
    private final ProductRepository productRepository;

    public InventoryServiceImpl(
            InventoryRepository inventoryRepository,
            StoreRepository storeRepository,
            ProductRepository productRepository
    ) {
        this.inventoryRepository = inventoryRepository;
        this.storeRepository = storeRepository;
        this.productRepository = productRepository;
    }

    @Override
    public List<Inventory> findInventoryByStoreId(Long storeId) {
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new EntityNotFoundException("Store not found: " + storeId));

        return inventoryRepository.findByStore(store);
    }

    @Override
    public List<Inventory> findInventoryByProductId(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found: " + productId));

        return inventoryRepository.findByProduct(product);
    }

    @Override
    public Optional<Inventory> findByStoreIdAndProductId(Long storeId, Long productId) {
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new EntityNotFoundException("Store not found: " + storeId));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found: " + productId));

        return inventoryRepository.findByStoreAndProduct(store, product);
    }

    public Inventory createInventoryItem(Long storeId, InventoryItemRequest request) {

        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new EntityNotFoundException("Store not found: " + storeId));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found: " + request.getProductId()));

        Inventory inventory = new Inventory(store, product, request.getQuantity());
        return inventoryRepository.save(inventory);
    }
}
