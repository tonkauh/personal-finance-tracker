package com.example.demo.model;
import java.util.Date;
public class Transaction {
	private String transactionId;
	private double amount;
	private Date date;
	private String description;
	private String type;

	public Transaction(String transactionId,String description, double amount, Date date,String type) {
		this.transactionId = transactionId;
		this.description = description;
		this.amount = amount;
		this.date = date;
		this.type = type;
	}

	public String getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
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