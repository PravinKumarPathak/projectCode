import { Component, inject, signal } from '@angular/core';
import { TodoData } from '../service/data/todo-data';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../list-todos/list-todos';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manage-todo',
  imports: [
    FormsModule,
    DatePipe
  ],
  templateUrl: './manage-todo.html',
  styleUrl: './manage-todo.css',
})

export class ManageTodo {
  private todoService = inject(TodoData);
  private route = inject(ActivatedRoute);

  id = Number(this.route.snapshot.params['id']);

  todo = signal<Todo | undefined>(undefined);
  private router = inject(Router);



  ngOnInit(){
    if(this.id!=-1){
      this.todoService.retrieveTodo('in28minutes', this.id).subscribe({
      next: (response) => this.todo.set(response)
    })
    }
    else{
      this.todo.set(new Todo('', false, new Date()));
    }
  }


  saveTodo(){
    if(this.id!=-1){
      this.todoService.updateTodo('in28minutes', this.id, this.todo()!).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/todos']);
      }
    })
    }
    else{
      this.todoService.createTodo('in28minutes', this.todo()!).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/todos']);
      }
    })
    }
  }

}