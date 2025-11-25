package org.mql.genai.translator.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mql.genai.translator.models.Properties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Service
public class GeminiTranslator implements Translator {

    @Autowired
    private Properties props;
    // Using Gemini 2.5 Flash
    private static final String GEMINI_API_URL_TEMPLATE = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=%s";

    private final RestTemplate restTemplate;
    private final tools.jackson.databind.ObjectMapper objectMapper;

    
    public GeminiTranslator() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    private String prompter(String prompt) {
        String url = String.format(GEMINI_API_URL_TEMPLATE, props.getToken());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> part = new HashMap<>();
        part.put("text", prompt);

        Map<String, Object> content = new HashMap<>();
        content.put("parts", List.of(part));

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", List.of(content));

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
            JsonNode root = objectMapper.readTree(response.getBody());

            JsonNode candidates = root.path("candidates");
            if (candidates.isArray() && candidates.size() > 0) {
                return candidates.get(0).path("content").path("parts").get(0).path("text").asText();
            } else {
                return "No translation found in the response.";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error during translation: " + e.getMessage();
        }
    }

    @Override
    public String englishToDarija(String text) {
        String prompt = "Translate the following English text to Moroccan Arabic (Darija). Output ONLY the translation: ";
        String result = prompter(prompt + text);
        return result;
    }

    @Override
    public String DarijaToEnglish(String text) {
        String prompt = "Translate the following Moroccan Arabic (Darija) text to english. Output ONLY the translation: ";
        String result = prompter(prompt + text);
        return result;
    }
}