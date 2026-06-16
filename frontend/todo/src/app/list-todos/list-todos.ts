import { DatePipe, UpperCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { TodoData } from '../service/data/todo-data';
import { Router } from '@angular/router';


export class Todo {
  constructor(
    public description: string,
    public done: boolean,
    public targetDate: Date,
    public id?: number
  ){
    
  }
}


@Component({
  selector: 'app-list-todos',
  imports: [DatePipe, UpperCasePipe],
  templateUrl: './list-todos.html',
  styleUrl: './list-todos.css',
})


export class ListTodos {

  todos = signal<Todo[] | undefined>(undefined);


  private todoService = inject(TodoData);
  private router = inject(Router);

  message = signal<string | undefined>(undefined);


  ngOnInit() {
    this.refreshTodos();
  }


  refreshTodos(){
    this.todoService.retrieveAllTodos('in28minutes').subscribe({
        next: (response) => {
          console.log('Response Part')
          console.log(response);
          this.todos.set(response);
        }
      })
  }


  deleteTodo(id: number){
    console.log(`Delete todo ${id}`)
    this.todoService.deleteTodo('in28minutes', id).subscribe({
      next: (response) => {
        console.log(response);
        this.message.set(`Delete of Todo ${id} Successful!`);
        this.refreshTodos();
      }
  })
  }


  updateTodo(id: number){
    console.log(`Update: ${id}`);
    this.router.navigate(['/manageTodo', id]);
  }


  addTodo(){
    this.router.navigate(['/manageTodo', -1]);
  }

}
