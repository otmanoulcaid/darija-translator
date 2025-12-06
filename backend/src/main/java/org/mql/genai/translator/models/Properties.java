package org.mql.genai.translator.models;

import org.springframework.beans.factory.annotation.Value;

public class Properties {

    @Value("${gemini.key}")
    private String apiKey;

    @Value("${gemini.model}")
    private String URLModel;

    public String getToken() {
        return apiKey;
    }

    public String getModelURL() {
        return URLModel;
    }
}

// setx HF_TOKEN "ton_token_hf_ici"
