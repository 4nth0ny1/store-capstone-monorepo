package com.example.store;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RestController;



@RestController

public class HomeController {


    @GetMapping("/")
    public String home() {
        return "You're at home bro! Go to the api/products page to see some products";
    }
}
