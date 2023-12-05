import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Souche } from '../model/souche.model';


@Component({
  selector: 'app-update-souche',
  templateUrl: './update-souche.component.html',
  styles: [
  ]
})
export class UpdateSoucheComponent implements OnInit{
  @Input()
souche! : Souche;
  @Output()
soucheUpdated = new EventEmitter<Souche>();
@Input()
ajout!:boolean;



ngOnInit(): void {
  console.log("ngOnInit du composant UpdateSouche ",this.souche);
    
}
saveSouche(){
  this.soucheUpdated.emit(this.souche);
  }


}
