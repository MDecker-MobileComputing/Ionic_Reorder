import { Component } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ReorderEintrag } from '../reorder-eintrag';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  /** Array mit Einträgen, die in richtige Reihenfolge zu bringen sind. */
  public reorderListe : Array<ReorderEintrag> = [];

  /**
   * Konstruktor für Dependency Injection, initialisiert auch Liste.
   */
  constructor(private loadingCtrl: LoadingController,
              private alertController: AlertController) {

    const e1 = new ReorderEintrag( "Firma 'Android Inc.' gegründet"             , 2003 );
    const e2 = new ReorderEintrag( "Firma 'Android Inc.' von Google aufgekauft" , 2005 );
    const e3 = new ReorderEintrag( "iPhone kommt auf den Markt"                 , 2007 );
    const e4 = new ReorderEintrag( "Erstes Android-Gerät auf Markt"             , 2008 );
    const e5 = new ReorderEintrag( "iPad kommt auf den Markt"                   , 2010 );
            
    this.reorderListe = [ e1, e2, e3, e4, e5 ];

    this.mischen();
  }

  /**
   * Durchmischt Member-Variable mit `ReorderEintrag`-Elementen. Hierzu wird
   * dem Attribut `zufallszahl` der `ReorderEintrag`-Elemente ein zufälliger
   * Wert zugewiesen, anhand dessen diese dann sortiert werden.
   */
  private mischen() { 

    for (let i = 0; i < this.reorderListe.length; i++) {

      this.reorderListe[i].neueZufallszahl();
    }

    this.reorderListe.sort((e1,e2) => {
      if (e1.zufallszahl < e2.zufallszahl) {

        return -1;

      } else {

        return 1;
      }
    });
  }

  /**
   * Event-Handler für Reihenfolge-Änderung mit Reorder-Element.
   */
  public onReihenfolgeAenderung(event: CustomEvent<ItemReorderEventDetail>) {

    const indexStart = event.detail.from;
    const indexZiel  = event.detail.to;

    const ereignis = this.reorderListe[indexStart].ereignis;

    console.log(`Element "${ereignis}" von Index ${indexStart} nach ${indexZiel} gezogen.`);

    const draggedItem = this.reorderListe.splice(indexStart, 1)[0];
    this.reorderListe.splice(indexZiel, 0, draggedItem);

    event.detail.complete();
  } 

  /**
   * Event-Handler für Button: überprüft, ob die aktuell gewählte 
   * Reihenfolge richtig ist.
   */
  public async onUeberpruefenButton() {

    let reihenfolgeRichtig     = true;
    let jahrVorherigesEreignis = -1;

    for (let i = 0; i < this.reorderListe.length; i++) {

      const eintrag  = this.reorderListe[i];
      const ereignis = eintrag.ereignis;
      const jahr     = eintrag.jahr;

      console.log(`Index ${i}: ${ereignis}`);
      
      if (i > 0) {

        if (jahrVorherigesEreignis > jahr) {

          reihenfolgeRichtig = false;
          break;
        }
      }

      jahrVorherigesEreignis = jahr;
    }

    console.log("Richtige Reihenfolge: " + reihenfolgeRichtig);

    const ladeAnzeige = await this.loadingCtrl.create({
        message: "Überprüfe Antwort ..."
    });  
    ladeAnzeige.present();

    setTimeout(async () => {

      ladeAnzeige.dismiss();
      await this.onUeberpruefenFertig(reihenfolgeRichtig);
      
    }, 1500); // 1500ms = 1,5sek
  }

  /** 
   * Methode wird aufgerufen, wenn Wartezeit für "Bewertung" 
   * der Lösung vorüber ist.
   */
  private async onUeberpruefenFertig(richtigeReihenfolge: boolean) {

    const dialogTitel = richtigeReihenfolge ? "Richtig!" : "Leider falsch!";    

    const jaButton = { text: "Ja", 
                       handler: () => { this.mischen(); } 
                     };

    const neinButton = { text: "Nein", 
                         role: "Cancel" 
                       };

    const alert = await this.alertController.create({
      header: dialogTitel,
      message: "Sollen die Ereignisse durchmischt werden?",
      backdropDismiss: false,
      buttons: [ jaButton, neinButton ]
    });
    alert.present();
  }

}
