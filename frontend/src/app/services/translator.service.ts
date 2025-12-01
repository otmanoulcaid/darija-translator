import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { HttpResponse } from "../models/HttpResponse.model";

@Injectable({
    providedIn: 'root'
})
export class TranslatorService {
    private config = (window as any).APP_CONFIG;
    private httpClient = inject(HttpClient);

    public englishToDarija(text: string) {
        return this.httpClient.post<HttpResponse>(`${this.config.apiUrl}en-to-darija`, {
            text
        })
    }

    public darijaToEnglish(text: string) {
        return this.httpClient.post<HttpResponse>(`${this.config.apiUrl}darija-to-en`, {
            text
        })
    }
}
