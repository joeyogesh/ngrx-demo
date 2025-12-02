import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addTodo } from '../store/todos.actions';

@Component({
    selector: 'app-todo-input',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <input [(ngModel)]="title" placeholder="Enter new todo" />
    <button (click)="onAdd()">Add Todo</button>
  `
})
export class TodoInputComponent {
    title: string = '';

    constructor(private store: Store) { }

    onAdd() {
        if (this.title.trim()) {
            this.store.dispatch(addTodo({ title: this.title }));
            this.title = '';
        }
    }
}
