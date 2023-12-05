import { Component, OnInit } from '@angular/core';
import { Souche } from '../model/souche.model';
import { Chat } from '../model/chat.model';
import { ChatService } from '../services/chat.service';


@Component({
  selector: 'app-recherche-par-souche',
  templateUrl: './recherche-par-souche.component.html',
  styles: [
  ]
})
export class RechercheParSoucheComponent implements OnInit{


chats! : Chat[];
IdSouche! : number;
souches! : Souche[];
constructor(private chatService : ChatService){}
ngOnInit(): void {
  this.chatService.listeSouches().
  subscribe(sous => {this.souches = sous._embedded.souches;
  console.log(sous);
  });
  }
  onChange() {
    this.chatService.rechercherParSouche(this.IdSouche).
    subscribe(sous =>{this.chats=sous});
    }
    
    



}
