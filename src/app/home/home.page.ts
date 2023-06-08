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

    this.listeInitialisieren();
  }

  /**
   * Member-Variable mit Liste der historischen Ereignisse, die zu sortieren sind,
   * wird in zufälliger Reihenfolge befüllt.
   */
  private listeInitialisieren() { 

    const e1 = new ReorderEintrag( "Firma 'Android Inc.' gegründet", 2003);
    const e2 = new ReorderEintrag( "Firma 'Android Inc.' von Google aufgekauft", 2005);
    const e3 = new ReorderEintrag( "iPhone kommt auf den Markt", 2007);
    const e4 = new ReorderEintrag( "Erstes Android-Gerät auf Markt", 2008);
    const e5 = new ReorderEintrag( "iPad kommt auf den Markt", 2010);

    this.reorderListe = [ e2, e4, e5, e1, e3 ];
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
    this.reorderListe.splice(indexZiel, 0, draggedItem)

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

    setTimeout(() => {

      ladeAnzeige.dismiss();
      this.onUeberpruefenFertig(reihenfolgeRichtig);
      
    }, 1500); // 1500ms = 1,5sek
  }

  private onUeberpruefenFertig(richtigeReihenfolge: boolean) {

  }

}
