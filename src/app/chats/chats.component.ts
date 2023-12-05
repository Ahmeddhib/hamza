import { Component, OnInit } from '@angular/core';
import { Chat } from '../model/chat.model';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  chats! : any[]; //un tableau de chînes de caractères
  constructor(private chatService : ChatService,
    public authService: AuthService) { }
    
    
    ngOnInit(): void {
      this.chargerChats();
      }
      chargerChats(){
        this.chatService.listeChat().subscribe(chat => {
        this.chats = chat;
        console.log(chat);
        this.chats.forEach((chat)=>{
          chat.image.image = 'data:' + chat.image.type + ';base64,' + chat.image.image;
        })
        });}

      supprimerChat(chat: Chat){
      let conf = confirm("Etes-vous sûr ?");
      if (conf)
      this.chatService.supprimerChat(chat.idChat!).subscribe(() => {
      console.log("chat supprimé");
      this.chargerChats();
      });
      } 
  
    } 
  
      



