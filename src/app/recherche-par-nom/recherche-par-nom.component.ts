import { Component, OnInit } from '@angular/core';
import { Chat } from '../model/chat.model';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: [
  ]
})
export class RechercheParNomComponent implements OnInit{

 nomChat! : string;
 chats! : Chat[];

 constructor(private chatService : ChatService){}
 allChats! : Chat[];
searchTerm!: string;
ngOnInit(): void {
this.chatService.listeChat().subscribe(chs => {
console.log(chs);
this.allChats = chs;
});
}
onKeyUp(filterText : string){
this.chats = this.allChats.filter(item =>
item.nomChat!.toLowerCase().includes(filterText));
}











  rechercherChats(){
    this.chatService.rechercherParNom(this.nomChat). subscribe(chs => {
    this.chats = chs; 
    console.log(chs)});
    }
    

}
