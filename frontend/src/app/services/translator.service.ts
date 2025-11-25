import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { HttpResponse } from "../models/HttpResponse.model";

@Injectable({
    providedIn: 'root'
})
export class TranslatorService {
    private httpClient = inject(HttpClient);
    private URL = 'http://localhost:8080/api/v1/translate/';

    public englishToDarija(text: string) {
        return this.httpClient.post<HttpResponse>(`${this.URL}en-to-darija`, {
            text
        })
    }

    public darijaToEnglish(text: string) {
        return this.httpClient.post<HttpResponse>(`${this.URL}darija-to-en`, {
            text
        })
    }
}
