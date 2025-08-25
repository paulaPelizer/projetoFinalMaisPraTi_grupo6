package com.adi.docflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DocflowApplication {
    public static void main(String[] args) {
        SpringApplication.run(DocflowApplication.class, args);
    }
}
