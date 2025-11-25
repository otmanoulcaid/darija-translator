package org.mql.genai.translator.models;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

public class Properties {

    @Value("${HF_TOKEN}")
    private String hfToken;

    public String getHfToken() {
        return hfToken;
    }
}

// setx HF_TOKEN "ton_token_hf_ici"
