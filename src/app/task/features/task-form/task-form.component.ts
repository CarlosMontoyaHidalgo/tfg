import { Task, TaskService } from './../../data-access/task.service';
import { Component, effect, inject, input, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TaskCreate } from '../../data-access/task.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
  providers: [TaskService]
})

export default class TaskFormComponent {
  private _formBuilder = inject(FormBuilder);
  private _taskService = inject(TaskService);
  private _Router = inject(Router);


  loading = signal(false);

  idTask = input.required<string>(); //nos traemos el id de la tarea que hemos puesto en el task.routes.ts

  form = this._formBuilder.group({
    title: this._formBuilder.control('', Validators.required),
    completed: this._formBuilder.control(false, Validators.required)
  });

  constructor(){
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    effect(() => {
      console.log('idTask', this.idTask());
      const id = this.idTask();
      if (id) {
        this.getTask(id);
      }
    });
  }

  async getTask(id: string) {
    try{
      const taskSnapshot =  await this._taskService.getTask(id);
      if(!taskSnapshot.exists()) {
        return;
      }
      const task = taskSnapshot.data() as Task;
      this.form.patchValue(task);


    } catch (error) {
      toast.error('Error al obtener la tarea');
    }


  }


  async submit() {
    if (this.form.invalid) return;

    try {
      this.loading.set(true);

      const {title, completed} = this.form.value;

      const task: TaskCreate = {
        title: title || '',
        completed: !!completed
      };

      const id = this.idTask();
      if (id) {
        await this._taskService.update(task, id);

      } else {
        await this._taskService.create(task);

      }
      toast.success(`Tarea ${id ? 'actualizada' : 'creada' } correctamente`);
        this._Router.navigateByUrl('/tasks');
      } catch (error) {
      toast.error('Error al crear la tarea');
    } finally {
      this.loading.set(false);
    }

  }

}
