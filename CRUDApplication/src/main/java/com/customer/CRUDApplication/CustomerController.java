package com.customer.CRUDApplication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController 
{

    @Autowired
    private CustomerService customerService;

    @GetMapping
    public List<Customer> getAllCustomers() 
    {
        return customerService.getAllCustomers();
    }

    @GetMapping("/{first_name}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long first_name) 
    {
        Customer customer = customerService.getCustomerById(first_name);

        if (customer != null) 
        {
            return ResponseEntity.ok(customer);
        } 
        else 
        {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) 
    {
        Customer createdCustomer = customerService.createCustomer(customer);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCustomer);
    }

    @PutMapping("/{first_name}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long first_name, @RequestBody Customer updatedCustomer) 
    {
        
    }

    @DeleteMapping("/{first_name}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long first_name) 
    {
        customerService.deleteCustomer(first_name);
        return ResponseEntity.noContent().build();
    }
}
