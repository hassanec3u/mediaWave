import {Injectable} from "@angular/core";
import {Observable, switchMap} from "rxjs";
import {User} from "../shared/types/user.type";
import {Picture} from "../shared/types/Picture.type";
import {environment} from "../../environments/environments";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class PicturesService {
    private backendUrl = `${environment.backend.protocol}://${environment.backend.host}:${environment.backend.port}`;
    constructor(private http: HttpClient) {
    }

    uploadPicture(profilePicture: File): Observable<Picture> {
        const formData = new FormData();
        formData.append('file', profilePicture);
        return this.http.post<Picture>(this.backendUrl+environment.backend.endpoints.uploadPicture, formData, {
            headers: new HttpHeaders({'enctype': 'multipart/form-data'})});
    }

    getProfilePicture(profilePicturePath: string | undefined): Observable<any> {
        console.log("GET PROFILE PICTURE");
        const params = new HttpParams().set('filePath', profilePicturePath+'');
        return this.http.get<any>(this.backendUrl+environment.backend.endpoints.uploadPicture, {params, responseType: 'blob' as 'json'});
    }
}