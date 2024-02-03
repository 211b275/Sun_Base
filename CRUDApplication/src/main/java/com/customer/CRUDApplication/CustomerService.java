package com.customer.CRUDApplication;

import com.customer.CRUDApplication.model.Customer;
import com.customer.CRUDApplication.model.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService 
{

    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> getAllCustomers() 
    {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(Long first_name) 
    {
        return customerRepository.findById(first_name).orElse(null);
    }

    public Customer createCustomer(Customer customer) 
    {
        return customerRepository.save(customer);
    }

    public Customer updateCustomer(Long first_name, Customer updatedCustomer) 
    {
        // implement update logic
    }

    public void deleteCustomer(Long id) 
    {
        customerRepository.deleteByfirst_name(first_name);
    }
}
