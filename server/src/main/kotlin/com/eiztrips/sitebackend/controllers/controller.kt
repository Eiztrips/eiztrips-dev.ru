package com.eiztrips.sitebackend.controllers;

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import com.eiztrips.sitebackend.services.CatGifService

@RestController
@RequestMapping("/api")
class Controller {

    @GetMapping("/random-cat-gif")
    fun getRandomCatGif(): ResponseEntity<Map<String, String>> {
        val gifUrl = CatGifService().fetchRandomCatGif()

        return if (gifUrl != null) {
            ResponseEntity.ok(mapOf("url" to gifUrl))
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(mapOf("error" to "No gif data found"))
        }
    }
}
