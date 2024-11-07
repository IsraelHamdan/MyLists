import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { listaDTO } from '../interfaces/listaDTO';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { itemDTO } from '../interfaces/itemDTO';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private api: string = 'http://localhost:3000/listas';
  constructor(
    private http: HttpClient,
    private notification: NotificationService
  ) {}

  getLists(): Observable<listaDTO[]> {
    return this.http
      .get<listaDTO[]>(this.api)
      .pipe(catchError((error) => this.handleError(error)));
  }

  postList(list: listaDTO): Observable<listaDTO> {
    return this.http
      .post<listaDTO>(this.api, list)
      .pipe(catchError((error) => this.handleError(error)));
  }

  putList(list: listaDTO, id: string): Observable<listaDTO> {
    return this.http
      .put<listaDTO>(`${this.api}/${id}`, list)
      .pipe(catchError((error) => this.handleError(error)));
  }

  getList(id: string): Observable<listaDTO> {
    return this.http
      .get<listaDTO>(this.api)
      .pipe(catchError((error) => this.handleError(error)));
  }

  deleteList(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.api}/${id}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  getItem(listId: string, itemId: string): Observable<itemDTO> {
    return this.http.get<listaDTO>(`${this.api}/${listId}`).pipe(
      map((lista) => {
        const item = lista.itens.find((item) => item.id === itemId);
        if (!item)
          throw new Error(
            `Item com id ${itemId} não encontrado na lsita $${listId}`
          );
        return item;
      })
    );
  }

  putItem(
    listId: string,
    itemId: string,
    updateItem: itemDTO
  ): Observable<itemDTO> {
    return this.http.get<listaDTO>(`${this.api}/${listId}`).pipe(
      map((lista) => {
        const itemIndex = lista.itens.findIndex((item) => item.id === itemId);
        if (itemIndex === -1) {
          throw new Error(
            `Item com id ${itemId} não encontrado na lista ${listId}`
          );
        }
        lista.itens[itemIndex] = updateItem;
        return lista;
      }),
      switchMap((updateList) =>
        this.http.put<listaDTO>(`${this.api}/${listId}`, updateList).pipe(
          map(() => updateItem),
          catchError((error) => this.handleError(error))
        )
      )
    );
  }

  private handleError(error: any): Observable<never> {
    let errorMesage: string = 'Ocorreu um erro inesperado';
    if (error.error instanceof ErrorEvent) {
      errorMesage = `Erro: ${error.error.message}`;
    } else {
      errorMesage = `Código do erro: ${error.status}\n Mensagem: ${errorMesage}`;
    }
    this.notification.showError(errorMesage);
    return throwError(errorMesage);
  }
}
