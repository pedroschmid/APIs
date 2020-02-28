package com.produtos.api.controllers;

import com.produtos.api.models.ProductModel;
import com.produtos.api.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    // Get all
    @GetMapping("/products")
    public List<ProductModel> productList() {
        return productRepository.findAll();
    }

    // Get by id
    @GetMapping("/product/{id}")
    public ProductModel uniqueProductList(@PathVariable(value = "id") long id) {
        return productRepository.findById(id);
    }

    // Post
    @PostMapping("/product")
    public ProductModel storeProduct(@RequestBody ProductModel productModel) {
        return productRepository.save(productModel);
    }

    // Delete by id
    @DeleteMapping("/product")
    public void removeProduct(@RequestBody ProductModel product) {
        productRepository.delete(product);
    }

    // Update by id
    @PutMapping("/product")
    public ProductModel updateProduct(@RequestBody ProductModel product) {
        return productRepository.save(product) ;
    }
}
