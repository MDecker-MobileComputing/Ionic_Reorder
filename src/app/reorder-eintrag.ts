/**
 * Ein Objekt dieser Klasse repräsentiert einen Eintrag
 * für eine Reorder-Liste, nämlich ein "historisches"
 * Ereignis mit einer Jahreszahl.
 */
export class ReorderEintrag {

    /** 
     * Zufallszahl, wird für Durchmischung benötigt.
     */
    public zufallszahl : number = 0.0;

    /**
     * Konstruktor um historisches Ereignis mit Jahreszahl zu übergeben.
     * 
     * @param ereignis Kurze Beschreibung des historischen Ereignisses.
     * @param jahr vierstellige Jahreszahl, z.B. 2015.
     */
    constructor( public ereignis : string,
                 public jahr : number ) {}
                 
    /**
     * Weißt der Member-Variable eine neue Zufallszahl für die
     * Durchmischung zu.
     */
    public neueZufallszahl() {

        this.zufallszahl = Math.random();
    }
}
