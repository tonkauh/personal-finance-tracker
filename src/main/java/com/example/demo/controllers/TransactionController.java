package com.example.demo.controllers; 

import com.example.demo.model.Transaction;
import com.example.demo.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions") // set the base path for this controller
@CrossOrigin(origins = "*") //allow CORS for all origins
public class TransactionController {

    @Autowired
    private TransactionRepository repository;

    // feature: pull all transactions (GET)
    @GetMapping
    public List<Transaction> getAll() {
        return repository.findAll();
    }

    // feature: create a new transaction (POST)
    @PostMapping
    public Transaction create(@RequestBody Transaction transaction) {
        return repository.save(transaction);
    }
    @DeleteMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000") 
    public void deleteTransaction(@PathVariable Long id) {
    repository.deleteById(id);
}
}