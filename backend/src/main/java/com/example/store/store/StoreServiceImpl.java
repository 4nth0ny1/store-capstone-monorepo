package com.example.store.store;

import com.example.store.*;
import com.example.store.product.Product;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StoreServiceImpl implements StoreService {
    
    private final StoreRepository storeRepository;

    public StoreServiceImpl(StoreRepository storeRepository) {
        this.storeRepository = storeRepository;
    }

    @Override
    public List<Store> getAllStores() {
        return storeRepository.findAll();
    }

    @Override
    public Store createStore(Store store) {
        return storeRepository.save(store);
    }

        @Override
    public Store getStoreById(Long id) {
        return storeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Store not found with id: " + id));
    }

    @Override
    public Store updateStore(Long id, Store updatedStore) {
        Store existingStore = storeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Store not found with id: " + id));

        existingStore.setStoreNumber(updatedStore.getStoreNumber());
        existingStore.setAddress(updatedStore.getAddress());
        existingStore.setCity(updatedStore.getCity());
        existingStore.setState(updatedStore.getState());
        existingStore.setZip(updatedStore.getZip());
        existingStore.setManager(updatedStore.getManager());

        return storeRepository.save(existingStore);
    }
}
