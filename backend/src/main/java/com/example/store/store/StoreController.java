package com.example.store.store;

import org.springframework.web.bind.annotation.*;

import com.example.store.product.Product;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.List;



@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("api/stores")
public class StoreController {
    
    private final StoreService storeService;

    public StoreController(StoreService storeService) {
        this.storeService = storeService;
    }

    @GetMapping
    public List<Store> getAllStores() {
        return storeService.getAllStores();
    }

    @PostMapping
    public ResponseEntity<Store> createStore(@RequestBody Store store) {
        Store created = storeService.createStore(store);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
    
    // GET /api/stores/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Store> getStoreById(@PathVariable Long id) {
        try {
            Store store = storeService.getStoreById(id);
            return ResponseEntity.ok(store);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

        // PUT /api/stores/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Store> updateStore(
            @PathVariable Long id,
            @RequestBody Store updatedStore
    ) {
        try {
            Store saved = storeService.updateStore(id, updatedStore);
            return ResponseEntity.ok(saved);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
    

}
