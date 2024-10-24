import { RouterLink } from '@angular/router';
import { Task, TaskService } from './../../data-access/task.service';
import { Component, effect, inject, input } from '@angular/core';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './table.component.html',
  styles: ``
})
export class TableComponent {
  tasks = input.required<Task[]>();
  private _taskService = inject(TaskService);
  /* constructor() {
    effect(() => {
      console.log(this.tasks());
    });
  } */

    async deleteTask(id: string) {
      try{
        const confirmationTask = confirm('¿Estás seguro de que quieres eliminar la tarea?');
        if(!confirmationTask) {
          toast.error('Tarea no eliminada');
          return;
        }
        await this._taskService.delete(id);
        toast.success(`Tarea ${id} eliminada`);
      } catch (error) {
        toast.error('Error al eliminar la tarea');
      }
    }

    async getTask(id: string) {
      try{
        const taskSnapshot =  await this._taskService.getTask(id);
        if(!taskSnapshot.exists()) {
          return;
        }
        const task = taskSnapshot.data() as Task;



      } catch (error) {
        toast.error('Error al obtener la tarea');
      }


    }
}
