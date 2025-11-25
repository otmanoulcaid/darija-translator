import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';  // <-- import FormsModule
import { TranslatorService } from './services/translator.service';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  translatorService = inject(TranslatorService);
  english = signal(true);

  destText = '';
  sourceText = '';
  destLabel = 'Darija';
  sourceLabel = 'English';

  onSwitch() {
    [this.sourceText, this.destText] = [this.destText, this.sourceText];
    [this.sourceLabel, this.destLabel] = [this.destLabel, this.sourceLabel];
    this.english.update(prev => !prev)
  }

  translateText() {
    this.destText = ''
    const translator = this.english() ?
      this.translatorService?.englishToDarija(this.sourceText)
      : this.translatorService?.darijaToEnglish(this.sourceText)

    translator.subscribe({
      next: (HttpResponse) => {
        this.destText = HttpResponse.translation
      },
      error: (error) => {
        alert(error.message)
      }
    })
  }
}
