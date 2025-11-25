package org.mql.genai.translator.models;

import org.springframework.beans.factory.annotation.Value;

public class Properties {

    @Value("${GEMINI_KEY}")
    private String apiKey;

    public String getToken() {
        return apiKey;
    }
}

// setx HF_TOKEN "ton_token_hf_ici"
