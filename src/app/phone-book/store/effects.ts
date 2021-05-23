import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import {
  LoadContacts,
  LoadedSuccess,
  Failure,
  Remove,
  Add,
  RemoveSuccess,
  AddSuccess,
  Update,
  UpdateSuccess,
  LoadContact,
  LoadedContactSuccess,
} from './actions';
import  { PhoneBookService }  from '../services/phone-book.service';
import { ActivatedRoute, Router } from '@angular/router';
 
@Injectable()
export class PhoneBookEffects {
  getContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadContacts),
      exhaustMap(action =>
        this.phoneBookService.getContacts().pipe(
          map(contacts => LoadedSuccess({ contacts })),
          catchError(error =>  of(Failure({ error })))
        )
      )
    )
  );

  getContactById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadContact),
      exhaustMap(action =>
        this.phoneBookService.getContactById(action.id).pipe(
          map(contact => LoadedContactSuccess({ contact })),
          catchError(error =>  of(Failure({ error })))
        )
      )
    )
  );


  addContact$ = createEffect(() =>
  this.actions$.pipe(
    ofType(Add),
    exhaustMap(action =>
      this.phoneBookService.addContact(action.contact).pipe(
        map(contact => {
          this.router.navigate(['/']);
          return AddSuccess({ contact })
        }),
        catchError(error => of(Failure({ error })))
      )
    )
  )
);

updateContact$ = createEffect(() =>
  this.actions$.pipe(
    ofType(Update),
    exhaustMap(action =>
      this.phoneBookService.updateContact(action.contact).pipe(
        map(contact => { 
          debugger
          this.router.navigate(['/']);
          return UpdateSuccess({ contact })
        }),
        catchError(error => of(Failure({ error })))
      )
    )
  )
);

removeContact$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(Remove),
    switchMap((action) => {
      return this.phoneBookService.removeContact(action.id).pipe(
        map((data) => {
          return RemoveSuccess({ id: action.id });
        }),
        catchError(error => of(Failure({ error })))
      );
    })
  );
});

 
  constructor(
    private actions$: Actions,
    private phoneBookService: PhoneBookService,
    private router: Router
  ) {}
}