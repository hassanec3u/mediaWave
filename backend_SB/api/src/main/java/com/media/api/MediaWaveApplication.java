package com.media.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


@SpringBootApplication(scanBasePackages = "com.media")
@EnableMongoRepositories(basePackages = "com.media.domain.repository")
public class MediaWaveApplication {

	public static void main(String[] args) {
		SpringApplication.run(MediaWaveApplication.class, args);
	}

}
