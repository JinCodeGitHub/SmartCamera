import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../environments/environment';
import {ImageModel} from './model/image.model';
import {ImageDetailModel} from './model/image-detail.model';
import {UploadModel} from './model/upload.model';
import {UploadResponseModel} from './model/uploadResponse.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly mockUpMode: boolean;

  constructor(private _http: HttpClient, @Inject('BASE_URL') private _baseHref: string) {
    this.mockUpMode = environment.mockUpMode;
    // console.debug('Run services in mockUp mode: ' + this.mockUpMode);
    // console.debug('Run services for baseUrl: ' + this._baseHref);
  }

  /**
   * Query all stored images from the backend.
   */
  getImages(): Observable<ImageModel[]> {
    if (this.mockUpMode) {
      return this._http.get<ImageModel[]>(this._baseHref + 'assets/mock_api_images.json');
    } else {
      return this._http.get<ImageModel[]>(this._baseHref + 'api/image');
    }
  }

  /**
   * Query all details for the image.
   */
  getImageDetails(idImage: string): Observable<ImageDetailModel[]> {
    if (this.mockUpMode) {
      return this._http.get<ImageDetailModel[]>(this._baseHref + 'assets/mock_api_image-details.json');
    } else {
      return this._http.get<ImageDetailModel[]>(this._baseHref + 'api/image/' + idImage + '/detail');
    }
  }

  /**
   * Post the data with the image to the backend.
   * The server return the state of the transmission.
   *
   * @param upload Parameter of the upload
   * @param uploadFile File for upload
   */
  uploadImage(upload: UploadModel, uploadFile: File): Observable<UploadResponseModel> {
    if (this.mockUpMode) {
      return this._http.get<UploadResponseModel>(this._baseHref + 'assets/mock_api_upload-response.json');
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'Enctype': 'multipart/form-data',
          'Accept': 'application/json'
        })
      };

      const formData = new FormData();
      formData.append('upload', JSON.stringify(upload));
      formData.append('uploadFile', uploadFile, uploadFile.name);

      return this._http.post<UploadResponseModel>(this._baseHref + 'api/upload', formData, httpOptions);
    }
  }

}
