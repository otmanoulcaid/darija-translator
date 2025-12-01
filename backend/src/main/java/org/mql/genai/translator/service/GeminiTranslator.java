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

    private Properties props;
    // Using Gemini 2.5 Flash
    private final RestTemplate restTemplate;
    private final tools.jackson.databind.ObjectMapper objectMapper;

    public GeminiTranslator(Properties props) {
        this.props = props;
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    private Map<String, Object> mapFactory(String key, Object value) {
        Map<String, Object> map = new HashMap<>();
        map.put(key, value);
        return map;
    }

    private String prompter(String prompt) {
        Map<String, Object> part = mapFactory("text", prompt);
        Map<String, Object> content = mapFactory("parts", List.of(part));
        Map<String, Object> requestBody = mapFactory("contents", List.of(content));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            String URL = props.getModelURL() + "?key=" + props.getToken();
            ResponseEntity<String> response = restTemplate.postForEntity(URL, entity, String.class);
            JsonNode root = objectMapper.readTree(response.getBody());

            JsonNode candidates = root.path("candidates");
            return (candidates.isArray() && candidates.size() > 0)
                    ? candidates.get(0)
                        .path("content")
                        .path("parts")
                        .get(0)
                        .path("text")
                        .asText()
                    : "No accurate translation found.";
        } catch (Exception e) {
            System.out.println("Error during translation" + e.getMessage());
            return "Error during translation";
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