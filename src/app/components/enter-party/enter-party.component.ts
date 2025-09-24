import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enter-party',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './enter-party.component.html',
  styleUrl: './enter-party.component.css'
})
export class EnterPartyComponent {
  @Output() closed = new EventEmitter<void>();
  partyCode = new FormControl('', { nonNullable: true, validators: [Validators.required] });

  constructor(private router: Router) { }

  closeEnterCode() {
    this.closed.emit();
  }

 enterPartyRoom() {
    if (this.partyCode.valid) {
      this.router.navigate([`/party/${this.partyCode.value}`]);
    }
  }
}
