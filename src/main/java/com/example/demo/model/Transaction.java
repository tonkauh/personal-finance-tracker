package com.example.demo.model;

import jakarta.persistence.*; // use jakarta.persistence for JPA annotations
import java.util.Date;

@Entity 
@Table(name = "transactions") // name of the table in the database
public class Transaction {

    @Id // set primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-generate ID values
    private Long id; // change transactionId to id

    private double amount;
    private Date date;
    private String description;
    private String type;

    // Constructors
    public Transaction() {
    }

    public Transaction(String description, double amount, Date date, String type) {
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.type = type;
    }

     // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}