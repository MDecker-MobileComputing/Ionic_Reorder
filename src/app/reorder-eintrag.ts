/**
 * Ein Objekt dieser Klasse repräsentiert einen Eintrag
 * für eine Reorder-Liste, nämlich ein "historisches"
 * Ereignis mit einer Jahreszahl.
 */
export class ReorderEintrag {

    constructor( public ereignis : string,
                 public jahr : number) {}
}
