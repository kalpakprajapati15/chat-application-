import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { baseUrl } from '../app.module';
import { Observable, of, throwError } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { DialogService } from 'primeng/dynamicdialog';
import { ApiErrorDialogComponent } from '../components/api-error-dialog/api-error-dialog.component';
import { MessageService } from 'primeng/api';


export interface ApiResponse<T> {
    status: 'Success' | 'Fail',
    result: T,
    message: Array<string>
}

export abstract class ApiService<T> {
    abstract url: string;

    baseUrl: string;
    http: HttpClient;
    dialogService: DialogService;
    messageService: MessageService;

    constructor(
        injector: Injector) {
        try {
            this.baseUrl = injector.get(baseUrl);
        }
        catch (e) {
            console.error('Error in getting base url', e);
        }
        this.http = injector.get(HttpClient);
        this.dialogService = injector.get(DialogService);
        this.messageService = injector.get(MessageService);
    }

    private getUrl(childUrl?:string) {
        const url = this.baseUrl + this.url + (childUrl ? childUrl : '');
        return url;
    }

    getById(id: string, params?: any): Observable<ApiResponse<T>> {
        const url = this.getUrl() + '/' + id;
        return this.http.get(url, { params: params }).pipe(tap(this.openErrorDialog.bind(this)), map((response: any) => {
            return response;
        }), catchError((err) => {
            this.openErrorDialog(err.error)
            throw err;
        }));
    }
    fetch(params?: any, headers?: any): Observable<ApiResponse<T[]>> {
        const url = this.getUrl() + '/fetch';
        return this.http.get(url, { params: params, headers: headers }).pipe(tap(this.openErrorDialog.bind(this)), map((response: any) => {
            return response;
        }), 
        catchError((err) => {
            this.openErrorDialog(err.error)
            throw err;
        })
    );
    }

    post<P = T>(postObj: any, params?: any, headers?: any, childUrl?:string): Observable<ApiResponse<P>> {
        const url = this.getUrl(childUrl);
        return this.http.post(url, postObj, { params: params, headers: headers }).pipe(
            tap(this.openErrorDialog.bind(this)), 
            map((response: any) => {
            return response;
        })
        ,
         catchError((err) => {
            this.openErrorDialog(err.error)
            return throwError(()=>err);
        })
    );;
    }

    delete(id: any, params?: any): Observable<T> {
        const url = this.getUrl() + '/' + id;
        return this.http.delete(url, { params }).pipe(tap(this.openErrorDialog.bind(this)), map((response: any) => {
            return response;
        }), catchError((err) => {
            this.openErrorDialog(err.error)
            throw err;
        }));;
    }

    private openErrorDialog(response: any) {
        // if (response && response.status && response.status.toUpperCase() == 'FAILED') {
        //     this.dialogService.open(ApiErrorDialogComponent, { data: response.message, header: 'Error' });
        // }
         if (response && response.status && response.status.toUpperCase() == 'FAILED') {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message[0]});
        }
    }
}