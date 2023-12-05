import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURL } from '../config';
import { SoucheWrapper } from '../model/SoucheWarpped';
import { Chat } from '../model/chat.model';
import { Image } from '../model/image.model';
import { Souche } from '../model/souche.model';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ChatService {


  apiURLSou: string = 'http://localhost:8082/chats/sou';


  chats!: Chat[];
  //souches : Souche[];


  constructor(private http: HttpClient,
    private authService: AuthService) {


  }

  listeChat(): Observable<Chat[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })

    return this.http.get<Chat[]>(apiURL + "/all", { headers: httpHeaders });

  }

  ajouterChat(ch: Chat): Observable<Chat> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<Chat>(apiURL + "/addchat", ch, { headers: httpHeaders });
  }



  supprimerChat(id: number) {
    const url = `${apiURL}/delchat/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.delete(url, { headers: httpHeaders });
  }

  consulterChat(id: number): Observable<Chat> {
    const url = `${apiURL}/getbyid/${id}`;
    console.log(url);
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Chat>(url, { headers: httpHeaders });
  }

  updateChat(ch: Chat): Observable<Chat> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.put<Chat>(apiURL + "/updatechat", ch, { headers: httpHeaders });
  }



  listeSouches(): Observable<SoucheWrapper> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<SoucheWrapper>(this.apiURLSou, { headers: httpHeaders });

  }

  rechercherParSouche(idSou: number): Observable<Chat[]> {
    const url = `${apiURL}/chatsou/${idSou}`;
    return this.http.get<Chat[]>(url);
  }

  rechercherParNom(nom: string): Observable<Chat[]> {
    const url = `${apiURL}/chatsByName/${nom}`;
    return this.http.get<Chat[]>(url);
  }

  ajouterSouche(sou: Souche): Observable<Souche> {
    return this.http.post<Souche>(this.apiURLSou, sou, httpOptions);
  }
  
  uploadImage(file: File, filename: string): Observable<Image>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
    }


    loadImage(id: number): Observable<Image> {
      const url = `${apiURL + '/image/get/info'}/${id}`;
      return this.http.get<Image>(url);
      }
      uploadImageChat(file: File, filename: string, idChat:number): Observable<any>{
        const imageFormData = new FormData();
        imageFormData.append('image', file, filename);
        const url = `${apiURL + '/image/uplaodImageProd'}/${idChat}`;
        return this.http.post(url, imageFormData);
        }
        supprimerImage(id : number) {
          const url = `${apiURL}/image/delete/${id}`;
          return this.http.delete(url, httpOptions);
          }
          
        



}