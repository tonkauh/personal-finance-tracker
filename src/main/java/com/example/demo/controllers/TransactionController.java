package com.example.demo.controllers; // เปลี่ยนชื่อตามโปรเจกต์คุณ

import com.example.demo.model.Transaction;
import com.example.demo.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions") // ตั้ง "เบอร์โทร" สำหรับเรียกใช้ API นี้
@CrossOrigin(origins = "*") // สำคัญมาก: เพื่อให้หน้าบ้าน (React) โทรหาได้โดยไม่ติดบล็อก
public class TransactionController {

    @Autowired
    private TransactionRepository repository;

    // ฟีเจอร์: ดึงรายการทั้งหมด (GET)
    @GetMapping
    public List<Transaction> getAll() {
        return repository.findAll();
    }

    // ฟีเจอร์: บันทึกรายการใหม่ (POST)
    @PostMapping
    public Transaction create(@RequestBody Transaction transaction) {
        return repository.save(transaction);
    }
}