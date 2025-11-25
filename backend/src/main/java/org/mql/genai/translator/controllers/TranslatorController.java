package org.mql.genai.translator.controllers;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1")
public class TranslatorController {

    private final WebClient webClient = 
    WebClient.create("https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-en-ar");

    @PostMapping("/translate")
    public Mono<String> translate(@RequestBody Map<String, String> body) {
        String text = body.get("text");
        return webClient.post()
                .header("Authorization", "Bearer YOUR_HF_TOKEN")
                .bodyValue(Map.of("inputs", text))
                .retrieve()
                .bodyToMono(String.class);
    }
}
