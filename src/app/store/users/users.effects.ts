import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../services/user.service";
import { add, addSuccess, findAllPageable, load, remove, removeSuccess, setErrors, update, updateSuccess } from "./users.actions";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { User } from "../../models/user";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Injectable()
export class UsersEffects {

    loadUsers$;
    addUser$;
    updateUser$;
    removeUser$;
    addSuccessUser$;
    updateSuccessUser$;
    removeSuccessUser$;

    constructor(private actions$: Actions, private service: UserService, private router: Router) {

        this.loadUsers$ = createEffect(() => 
            this.actions$.pipe(
                ofType(load),
                exhaustMap(action => this.service.findAllPageable(action.page)
                    .pipe(
                        map(pageable => {
                            const users = pageable.content as User[];
                            const paginator = pageable;
    
                            return findAllPageable({users, paginator});
                        }),
                        catchError((error) => of(error))
                    )
                )
            )
        );

        this.addUser$ = createEffect(
            () => actions$.pipe(
                ofType(add),
                exhaustMap(action => service.create(action.userNew)
                .pipe(
                    map( userNew => addSuccess({ userNew })),
                    catchError( error => (error.status == 400) ? of(setErrors({userForm: action.userNew, errors: error.error })): of(error))
                    )
                )
            )
        )

        this.updateUser$ = createEffect(
            () => actions$.pipe(
                ofType(update),
                exhaustMap(action => service.update(action.userUpdated)
                .pipe(
                    map( userUpdated => updateSuccess({ userUpdated })),
                    catchError( error => (error.status == 400) ? of(setErrors({userForm: action.userUpdated, errors: error.error })): of(error))
                    )
                )
            )
        )

        this.removeUser$ = createEffect(
            () => actions$.pipe(
                ofType(remove),
                exhaustMap(action => service.delete(action.id)
                    .pipe(map( () => removeSuccess({id: action.id })))
                )
            )
        )

        this.addSuccessUser$ = createEffect(() => this.actions$.pipe(
            ofType(addSuccess),
            tap(() => {
                this.router.navigate(['/users']);
                          Swal.fire({
                            title: "Creado!",
                            text: "Usuario creado con exito!",
                            icon: "success"
                          });
            })
        ), {dispatch: false})

        this.updateSuccessUser$ = createEffect(() => this.actions$.pipe(
            ofType(updateSuccess),
            tap(() => {
                this.router.navigate(['/users']);
                          Swal.fire({
                            title: "Actualizado!",
                            text: "Usuario actualizado con exito!",
                            icon: "success"
                          });
            })
        ), {dispatch: false})

        this.removeSuccessUser$ = createEffect(() => this.actions$.pipe(
            ofType(removeSuccess),
            tap(() => {
                this.router.navigate(['/users']);
                Swal.fire({
                    title: "Eliminado!",
                    text: "El usuario ha sido eliminadio con exito.",
                    icon: "success"
                  });
            })
        ), {dispatch: false})
    }

}