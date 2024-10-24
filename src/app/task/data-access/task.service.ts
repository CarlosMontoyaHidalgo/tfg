import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  updateDoc,
  where,
  query,
} from '@angular/fire/firestore';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthStateService } from '../../shared/data-access/auth-state.service';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export type TaskCreate = Omit<Task, 'id'> /*  & {userId: string} */;

const PATH = 'tasks';

@Injectable()

export class TaskService {
  private _firestore = inject(Firestore);
  private _authState = inject(AuthStateService);
  loading = signal<boolean>(true);

  //Mi coleccion de tareas
  private _tasksCollection = collection(this._firestore, PATH);
  private _query = query(
    this._tasksCollection,
    where('userId', '==', this._authState.currentUser?.uid)
  );

  constructor() {
    console.log(this._authState.currentUser);
  }

  getTasks = toSignal(
    (collectionData(this._query, { idField: 'id' }) as Observable<Task[]>).pipe(
      tap(() => {
        this.loading.set(false);
      }),
      catchError((error) => {
        console.error('Error getting tasks', error);
        this.loading.set(false);
        return throwError(() => error);
      })
    ),
    {
      initialValue: [],
    }
  );

  getTask(id: string) {
    const docRef = doc(this._tasksCollection, id);
    return getDoc(docRef);
  }

  //TODO: Implementar Promesas u Observables
  create(task: TaskCreate) {
    return addDoc(this._tasksCollection, {
      ...task,
      userId: this._authState.currentUser?.uid,
    }).catch((error) => {
      console.error('Error creating task', error);
      return throwError(() => error);
    });;
  }

  update(task: TaskCreate, id: string) {
    const docRef = doc(this._tasksCollection, id);
    return updateDoc(docRef, {
      ...task,
      userId: this._authState.currentUser?.uid,
    }).catch((error) => {
      console.error('Error updating task', error);
      return throwError(() => error);
    });
  }

  delete(id: string) {
    const docRef = doc(this._tasksCollection, id);
    return deleteDoc(docRef).catch((error) => {
      console.error('Error deleting task', error);
      return throwError(() => error);
    });
  }

}
