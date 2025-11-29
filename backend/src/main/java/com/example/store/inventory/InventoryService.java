package com.example.store.inventory;

import java.util.List;
import java.util.Optional;

public interface InventoryService {

    List<Inventory> findInventoryByStoreId(Long storeId);

    List<Inventory> findInventoryByProductId(Long productId);

    Optional<Inventory> findByStoreIdAndProductId(Long storeId, Long productId);
    Inventory createInventoryItem(Long storeId, InventoryItemRequest request);
}
