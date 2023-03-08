import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/shared/services/task.service';
import { Task } from './../../../shared/models/task.model'
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{

  totalTask: number = 0;
  ruta: string = "";
  noCompletedTasks: boolean = true;

  constructor(
    private taskService: TaskService,
    private activateRoute: ActivatedRoute
  ) { }

 ngOnInit(): void {
  this.taskService.todoReactiveStorage$.subscribe({
    next: (tasks: Task[]) =>{
      this.totalTask = tasks.filter(task => !task.completed).length;
      tasks.length == this.totalTask ? this.noCompletedTasks = true : this.noCompletedTasks = false;
    }
  })

  this.activateRoute.params.subscribe((params: Params)=>{
    this.ruta = params['status'];
  });

 }

 clearCompleted(): void {
  this.taskService.clearCompletedTask();
}

 clicToFilter() {
  this.taskService.filterByUrl(this.ruta)
 }

}
