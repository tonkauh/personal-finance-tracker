package com.example.demo.repository; // เปลี่ยน com.example.demo ตามชื่อที่คุณตั้งใหม่

import com.example.demo.model.Transaction; // Import class Transaction ที่เราเพิ่งทำเสร็จ
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository // บอก Spring ว่าไฟล์นี้คือส่วนที่ใช้ติดต่อกับฐานข้อมูล
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    // ไม่ต้องพิมพ์อะไรเพิ่มในนี้ครับ JPA จะจัดการคำสั่ง Save, Find, Delete ให้เองอัตโนมัติ
}