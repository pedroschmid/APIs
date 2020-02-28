package com.produtos.api.repository;

import com.produtos.api.models.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<ProductModel, Long> {
    ProductModel findById(long id);
    ProductModel deleteById(long id);
}
