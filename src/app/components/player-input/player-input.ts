import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-player-input',
  imports: [MatInputModule, MatButtonModule],
  templateUrl: './player-input.html',
  styleUrl: './player-input.css'
})
export class PlayerInput {

}
