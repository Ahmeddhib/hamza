import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from '../model/chat.model';
import { Image } from '../model/image.model';
import { Souche } from '../model/souche.model';
import { ChatService } from '../services/chat.service';


@Component({
  selector: 'app-add-chat',
  templateUrl: './add-chat.component.html',
  styleUrls: ['./add-chat.component.css']
})
export class AddChatComponent implements OnInit {
  souches!: Souche[];
  newIdSou!: number;
  newSouche!: Souche;
  newChat = new Chat();
  uploadedImage!: File;
  imagePath: any;
  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit(): void {
    this.chatService.listeSouches().
      subscribe(sous => {
        console.log(sous);
        this.souches = sous._embedded.souches;
      }
      );
  }



  addChat() {
    this.chatService
      .uploadImage(this.uploadedImage, this.uploadedImage.name)
      .subscribe((img: Image) => {
        this.newChat.image = img;
        this.newChat.souche = this.souches.find(sou => sou.idSou == this.newIdSou)!;
        this.chatService
          .ajouterChat(this.newChat)
          .subscribe(() => {
            this.router.navigate(['chats']);
          });
      });
  }
  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
  }





}
