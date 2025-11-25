package org.mql.genai.translator.controllers;

import java.util.Map;

import org.mql.genai.translator.service.Translator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/translate")
public class TranslatorController {
    @Autowired
    private Translator translator;

    @PostMapping("/en-to-darija")
    public Map<String, String> englishToDarija(@RequestBody Map<String, String> body) {
        String text = body.get("text");
        String translated = translator.englishToDarija(text);
        return Map.of("translation", translated);
    }

    @PostMapping("/darija-to-en")
    public Map<String, String> darijaToEnglish(@RequestBody Map<String, String> body) {
        String text = body.get("text");
        String translated = translator.DarijaToEnglish(text);
        return Map.of("translation", translated);
    }
}
