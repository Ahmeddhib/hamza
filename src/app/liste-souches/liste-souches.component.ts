import { Component, OnInit } from '@angular/core';
import { Souche } from '../model/souche.model';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-liste-souches',
  templateUrl: './liste-souches.component.html',
  styles: []
})
export class ListeSouchesComponent implements OnInit {
  souches: Souche[] = [];
  updatedSou: Souche = { idSou: 0, nomSou: '', descriptionSou: '' };
  ajout:boolean=true;


  constructor(private chatService: ChatService) { }
  
  ngOnInit(): void {
    this.chargerSouches();
  }

  chargerSouches() {
    this.chatService.listeSouches().subscribe(sous => {
      this.souches = sous._embedded.souches;
      console.log(sous);
    });
  }

  soucheUpdated(sou: Souche) {
    console.log("Souche updated event", sou);
    this.chatService.ajouterSouche(sou).subscribe(() => this.chargerSouches());
  }
  updateSou(sou:Souche) {
    this.updatedSou=sou;
    this.ajout=false; 
    }
    
}
