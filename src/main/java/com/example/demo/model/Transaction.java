package com.example.demo.model;

import jakarta.persistence.*; // ต้องมีเพื่อใช้ @Entity, @Id
import java.util.Date;

@Entity // 1. เพิ่มตัวนี้เพื่อให้ Spring รู้ว่านี่คือตารางในฐานข้อมูล
@Table(name = "transactions") // 2. ตั้งชื่อตารางใน Database
public class Transaction {

    @Id // 3. กำหนดให้เป็น Primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 4. ให้ระบบรัน ID (1, 2, 3...) อัตโนมัติ
    private Long id; // แนะนำให้ใช้ Long สำหรับ ID ในฐานข้อมูลครับ

    private double amount;
    private Date date;
    private String description;
    private String type;

    // 5. สำคัญมาก: ต้องมี Constructor ว่าง (No-Args) สำหรับ JPA
    public Transaction() {
    }

    public Transaction(String description, double amount, Date date, String type) {
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.type = type;
    }

    // Getter และ Setter ของคุณ (ใช้ของเดิมได้เลย แต่เปลี่ยนชื่อจาก transactionId เป็น id ให้ตรงกัน)
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