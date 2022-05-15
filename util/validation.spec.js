import { describe, it, expect} from 'vitest';
import { validateNotEmpty } from './validation';

describe('validateNotEmpty()', () => {
    it('should throw an error if an empty string is provided as a value', () => {
        const textInput = '';
        const errorInput = '';

        const resultFn = () => validateNotEmpty(textInput , errorInput);

        expect(resultFn).toThrow();
    });

    it('should throw an especific error if an empty string is provided as a value', () => {
        const textInput = '';
        const errorInput = 'Error';

        const resultFn = () => validateNotEmpty(textInput , errorInput);

        expect(resultFn).toThrow('Error');
    });


    it('should throw an especific error if an empty string of blanks is provided as a value', () => {
        const textInput = '   ';
        const errorInput = 'Error';

        const resultFn = () => validateNotEmpty(textInput , errorInput);

        expect(resultFn).toThrow('Error');
    });

    it('should throw an error if a non-string value is provided', () => {
        const invalidInput1 = 1;
        const invalidInput2 = {};
        const errorInput = 'Error';

        const resultFn1 = () => validateNotEmpty(invalidInput1 , errorInput);
        const resultFn2 = () => validateNotEmpty(invalidInput2 , errorInput);


        expect(resultFn1).toThrow('text.trim is not a function');
        expect(resultFn2).toThrow('text.trim is not a function');

    });

    it('should not return an error if a string is greater than 0 is provided', () => {
        const textInput = 'a';
        const errorInput = 'error';

        const resultFn = () => validateNotEmpty(textInput, errorInput);

        expect(resultFn).not.toThrow();
    });
});