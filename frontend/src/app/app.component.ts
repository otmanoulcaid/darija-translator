import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // <-- import FormsModule


@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sourceText = '';
  destText = '';
  sourceLabel = 'Darija';
  destLabel = 'English';

  onSwitch() {
    [this.sourceText, this.destText] = [this.destText, this.sourceText];
    [this.sourceLabel, this.destLabel] = [this.destLabel, this.sourceLabel];
  }

  translateText() {
    // Placeholder translation logic
    this.destText = this.sourceText;
  }
}
