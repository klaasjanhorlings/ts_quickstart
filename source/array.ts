// Deze regel 'doet' niks behalve aan te geven hoe de functie die aan de Map functie word doorgegeven
// eruit moet zien.
type MapCallbackMethod<TElement, TResult> = (el: TElement, index: number, array: TElement[]) => TResult;

/**
 * Roept de doorgegeven functie (callback) aan voor elk element in de array. Het resultaat van de
 * callbackfunctie wordt in een nieuwe array verzameld en teruggegeven.
 * @type TElement het type van de individuele elementen in de bron array
 * @type TResult het type van het resultaat van de callback functie
 * @param array De bron array waaruit elk element aan de callback wordt doorgegeven
 * @param callback De callback functie die word aangeroepen voor elk element en een resultaat
 * teruggeeft
 */
export const map = <TElement, TResult>(
    array: TElement[],
    callback: MapCallbackMethod<TElement, TResult>,
): TResult[] => {
    return [];
};

type PredicateCallbackMethod<TElement> = (el: TElement, index: number, array: TElement[]) => boolean;

/**
 * Roept de doorgegeven functie (callback) aan voor elk element in de array. Wanneer het resultaat
 * van de callbackfunctie true is word het element toegevoegd aan het resultaat.
 * @type TElement het type van de individuele elementen in de bron array
 * @param array De bron array waaruit elk element aan de callback wordt doorgegeven
 * @param callback De callback functie die word aangeroepen voor elke element en true of false
 * teruggeeft
 */
export const filter = <TElement>(
    array: TElement[],
    callback: PredicateCallbackMethod<TElement>,
): TElement[] => {
    return [];
};

/**
 * Roept de doorgegeven functie (callback) aan voor elk element in de array. Wanneer het resultaat
 * van de callbackfunctie true geeft de functie true terug. Wanneer geen van de callbackfuncties
 * true teruggeeft geeft de functie false terug
 * @type TElement het type van de individuele elementen in de bron array
 * @param array De bron array waaruit elk element aan de callback wordt doorgegeven
 * @param callback De callback functie die word aangeroepen voor elke element en true of false
 * teruggeeft
 */
export const some = <TElement>(
    array: TElement[],
    callback: PredicateCallbackMethod<TElement>,
): boolean => {
    return true;
};

/**
 * Roept de doorgegeven functie (callback) aan voor elk element in de array. Wanneer het resultaat
 * van alle callbackfuncties true is geeft de functie true terug. Wanneer een of meer van de callbacks
 * false teruggeeft geeft de functie false terug
 * @type TElement het type van de individuele elementen in de bron array
 * @param array De bron array waaruit elk element aan de callback wordt doorgegeven
 * @param callback De callback functie die word aangeroepen voor elke element en true of false
 * teruggeeft
 */
export const every = <TElement>(
    array: TElement[],
    callback: PredicateCallbackMethod<TElement>,
): boolean => {
    return true;
};

type ReduceCallbackMethod<TElement, TResult> = (
    accumulator: TResult,
    current: TElement,
    index: number,
    array: TElement[],
) => TResult;

export const reduce = <TElement, TResult>(
    array: TElement[],
    callback: ReduceCallbackMethod<TElement, TResult>,
    initialValue?: TResult,
): TResult => {
    return array.reduce(callback, initialValue!);
};
