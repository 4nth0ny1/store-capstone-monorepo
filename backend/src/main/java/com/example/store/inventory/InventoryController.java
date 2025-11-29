package com.example.store.inventory;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    // GET /api/inventory/store/1
    // GET http://localhost:8080/api/inventory/store/1
    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<Inventory>> getInventoryByStore(@PathVariable Long storeId) {
        List<Inventory> inventory = inventoryService.findInventoryByStoreId(storeId);
        // Even if it's empty, that's fine: []
        return ResponseEntity.ok(inventory);
    }

    // GET http://localhost:8080/api/inventory/product/2
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Inventory>> getInventoryByProduct(@PathVariable Long productId) {
        List<Inventory> inventory = inventoryService.findInventoryByProductId(productId);
        return ResponseEntity.ok(inventory);
    }

    // GET http://localhost:8080/api/inventory/store/1/product/2
    @GetMapping("/store/{storeId}/product/{productId}")
    public ResponseEntity<Inventory> getInventoryByStoreAndProduct(
            @PathVariable Long storeId,
            @PathVariable Long productId) {

        return inventoryService.findByStoreIdAndProductId(storeId, productId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/store/{storeId}")
    public ResponseEntity<Inventory> createInventoryItem(
            @PathVariable Long storeId,
            @RequestBody InventoryItemRequest request) {

        Inventory created = inventoryService.createInventoryItem(storeId, request);
        return ResponseEntity.ok(created);
    }


}
