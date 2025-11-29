package com.example.store.store;

import java.util.List;
import com.example.store.store.Store;

public interface StoreService {
    List<Store> getAllStores();
    Store createStore(Store store);

    Store getStoreById(Long id);
    Store updateStore(Long id, Store updatedStore);
    // void deleteStore(Long id);
}
