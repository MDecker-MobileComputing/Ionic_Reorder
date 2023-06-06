import { Component } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';
import { ReorderEintrag } from '../reorder-eintrag';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public reorderListe : Array<ReorderEintrag> = [];

  constructor() {

    this.listeInitialisieren();
  }

  private listeInitialisieren() { 

    const e1 = new ReorderEintrag( "Android Inc. gegründet", 2003);
    const e2 = new ReorderEintrag( "Android von Google aufgekauft", 2005);
    const e3 = new ReorderEintrag( "iPhone kommt auf den Markt", 2007);
    const e4 = new ReorderEintrag( "Erstes Android-Gerät auf Markt", 2008);

    this.reorderListe = [ e2, e4, e1, e3 ];
  }

  public onReihenfolgeAenderung(event: CustomEvent<ItemReorderEventDetail>) {

    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

    event.detail.complete();
  } 

}
