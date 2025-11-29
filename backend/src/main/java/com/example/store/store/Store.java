package com.example.store.store;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Store {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String storeNumber;
    private String address;
    private String city;
    private String state;
    private String zip;
    private String manager;

    public Store() {}
    
    public Store(String storeNumber, String address, String city, String state, String zip, String manager) {
        this.storeNumber = storeNumber;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.manager = manager;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStoreNumber() {
        return storeNumber;
    }

    public void setStoreNumber(String storeNumber) {
        this.storeNumber = storeNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getManager() {
        return manager;
    }

    public void setManager(String manager) {
        this.manager = manager;
    }


}
