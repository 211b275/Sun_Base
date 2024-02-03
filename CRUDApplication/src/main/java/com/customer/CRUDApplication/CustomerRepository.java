package com.customer.CRUDApplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> 
{
    
}
