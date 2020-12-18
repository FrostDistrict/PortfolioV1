import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export class GenericCrudService<T, K> {

  constructor(protected http: HttpClient, protected url: string){}

    /**
     * CREATE(POST)
     */
    save(t: T): Observable<T> {
        return this.http.post<T>(this.url, t);
    }
    
    /**
     * READ ALL(GET)
     */
    getAll(): Observable<T[]> {
        return this.http.get<T[]>(this.url);
    }
    
    /**
     * READ BY ID(GET)
     */
    getById(id: K): Observable<T> {
        return this.http.get<T>(this.url+ "/"+ id);
    }
    
    /**
     * UPDATE(PUT)
     */
    update(id: K, t: T): Observable<T> {
        return this.http.put<T>(this.url+ "/"+ id, t, {});
    }
   
    /**
     * DELETE
     */
    deleteById(id: K): Observable<T> {
        return this.http.delete<T>(this.url+ "/"+ id);
    }

}
