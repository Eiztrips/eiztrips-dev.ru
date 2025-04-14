package com.eiztrips.sitebackend.services

import com.eiztrips.sitebackend.dto.catGifDTO
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import org.springframework.web.util.UriComponentsBuilder

@Service
class CatGifService {

    private val apiKey = "iQgxezMg38EAGvABl8qmgZfAxxVzzNCF"
    private val restTemplate = RestTemplate()

    fun fetchRandomCatGif(): String? {
        val uri = UriComponentsBuilder
            .fromUriString("https://api.giphy.com/v1/gifs/random")
            .queryParam("api_key", apiKey)
            .queryParam("tag", "cat")
            .queryParam("rating", "g")
            .build()
            .toUri()

        return try {
            val response = restTemplate.getForObject(uri, catGifDTO.GiphyResponse::class.java)
            response?.data?.images?.original?.url
        } catch (e: Exception) {
            null
        }
    }
}
