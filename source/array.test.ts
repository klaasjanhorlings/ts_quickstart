import { every, filter, map, reduce, some } from "./array";

describe(`Array methods`, () => {
    let mockCallback: jest.Mock;
    let testArray: string[];

    type Callback<TElement> = (el: TElement, index: number, array: TElement[]) => any;
    const testCallbackCalls = <TElement>(
        method: (array: any[], callback: Callback<TElement>) => any,
    ) => {
        test(`callback wordt aangeroepen voor elk element in de array`, () => {
            method(testArray, mockCallback);

            expect(mockCallback.mock.calls.length).toBe(3);
        });

        test(`callback krijgt het huidige element als eerste parameter doorgegeven`, () => {
            method(testArray, mockCallback);

            expect(mockCallback.mock.calls.length).toBe(3);
            expect(mockCallback.mock.calls[0][0]).toBe("a");
            expect(mockCallback.mock.calls[1][0]).toBe("b");
            expect(mockCallback.mock.calls[2][0]).toBe("c");
        });

        test(`callback krijgt de index als tweede parameter doorgegeven`, () => {
            method(testArray, mockCallback);

            expect(mockCallback.mock.calls.length).toBe(3);
            expect(mockCallback.mock.calls[0][1]).toBe(0);
            expect(mockCallback.mock.calls[1][1]).toBe(1);
            expect(mockCallback.mock.calls[2][1]).toBe(2);
        });

        test(`callback krijgt de array als derde parameter doorgegeven`, () => {
            method(testArray, mockCallback);

            expect(mockCallback.mock.calls.length).toBe(3);
            expect(mockCallback.mock.calls[0][2]).toBe(testArray);
            expect(mockCallback.mock.calls[1][2]).toBe(testArray);
            expect(mockCallback.mock.calls[2][2]).toBe(testArray);
        });
    };

    beforeEach(() => {
        // We vervangen de test array voor elke test voor een verse versie, zodat we dat
        // niet in de test zelf hoeven te doen
        testArray = ["a", "b", "c"];

        // De mock is een speciale functie die onthoudt hoe vaak hij word aangeroepen en
        // met welke parameters
        mockCallback = jest.fn();
    });

    describe(`map functie`, () => {
        testCallbackCalls(map);

        test(`map resultaat is een array met resultaten van de callback`, () => {
            const result = map(testArray, (el) => el.toLocaleUpperCase());

            expect(result.length).toBe(3);
            expect(result[0]).toBe("A");
            expect(result[1]).toBe("B");
            expect(result[2]).toBe("C");
        });
    });

    describe(`filter functie`, () => {
        testCallbackCalls(filter);

        test(`filter resultaat is een array met alleen de elementen waar de callback true voor teruggeeft`, () => {
            const numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

            const result = filter(numbers, (el) => el % 2 === 1);

            expect(result.length).toBe(5);
            expect(result[0]).toBe(1);
            expect(result[1]).toBe(3);
            expect(result[2]).toBe(5);
            expect(result[3]).toBe(7);
            expect(result[4]).toBe(9);
        });
    });

    describe(`some functie`, () => {
        testCallbackCalls(some);

        test(`geeft true terug als een van de callbacks true teruggeeft`, () => {
            const result = some(testArray, (el) => el === "b");

            expect(result).toBeTruthy();
        });

        test(`geeft false terug als geen van de callbacks true terug geeft`, () => {
            const result = some(testArray, () => false);

            expect(result).toBeFalsy();
        });

        test(`BONUS stopt met uitvoeren van de callbacks wanneer er true wordt teruggegeven`, () => {
            mockCallback.mockReturnValue(true);
            some(testArray, mockCallback);

            expect(mockCallback.mock.calls.length).toBe(1);
        });
    });

    describe(`all functie`, () => {
        testCallbackCalls(some);

        test(`geeft true terug als alle callbacks true teruggeven`, () => {
            mockCallback.mockReturnValue(true);
            const result = every(testArray, mockCallback);

            expect(result).toBeTruthy();
        });

        test(`geeft false terug als een van de callbacks false terug geeft`, () => {
            const result = every(testArray, (el) => el !== "b");

            expect(result).toBeFalsy();
        });

        test(`BONUS stopt met uitvoeren van de callbacks wanneer er false wordt teruggegeven`, () => {
            mockCallback.mockReturnValue(false);
            every(testArray, mockCallback);

            expect(mockCallback.mock.calls.length).toBe(1);
        });
    });

    describe(`reduce functie`, () => {
        test(`roept callback voor elk element aan wanneer initialValue wordt meegegeven`, () => {
            reduce(testArray, mockCallback, "d");

            expect(mockCallback.mock.calls.length).toBe(3);
            expect(mockCallback.mock.calls[0][1]).toBe(3);
        });

        // tslint:disable-next-line:max-line-length
        test(`roept de callback voor alle elementen behalve het eerste aan wanneer initialValue niet wordt meegegeven`, () => {
            reduce(testArray, mockCallback);

            expect(mockCallback.mock.calls.length).toBe(2);
            expect(mockCallback.mock.calls[0][1]).toBe("b");
            expect(mockCallback.mock.calls[0][2]).toBe("c");
            console.log(mockCallback.mock.calls);
        });
    });
});
