/*FUNZIONI PURE: 
Le funzioni pure sono quelle funzioni che a parità di input tornano sempre lo stesso risultato */

import { unstable_batchedUpdates } from "react-dom";


const pureFunc = (a,b) => {
    return a + b;
}

console.log(pureFunc(4,5));
console.log(pureFunc(4,5));
console.log(pureFunc(4,5));
console.log(pureFunc(4,5));
console.log(pureFunc(4,5));



/*FUNZIONI IMPU RE:
Al contrario invece le funzioni impure possono restituire risultati diversi a parità di input.
Nell'esempio seguente infatti il risultato cambia perche all'interno c'è il parametro c che 
può cambiare. */


let c  = 3;
const funcA = (a,b) => {
    return a + b + c;
}

console.log(funcA(3,4));
console.log(funcA(3,4));
console.log(funcA(3,4));

c = 5;

console.log(funcA(3,4));
console.log(funcA(3,4));


/* Impure function with sideEffects:
La funzione seguente potrebbe essere considerata pura in quanto ritorna sempre lo stesso
risultato a parità di input. Il punto è che nello scope della funzione viene modificata una
variabile che si trova all'esterno. In sintesi tutte quelle funzioni che eseguono queste
operazioni, andando a modificare variabili che si trovano all'esterno, o dipendono dal comportamento
di variabili esterne si tratta sempre di FUNZIONI IMPURE.  */


var d = 5;

const funcB = (a,b) => {
    //side effect
    d = a + b;

    return a * b;
}


console.log(funcB(2,4));
console.log(d);