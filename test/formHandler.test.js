import { handleSubmit } from '../src/client/js/formHandler'

describe(" Testing 'handleSubmit()' ", () => {
    test('It should return true as defined', () => {
        expect(handleSubmit).toBeDefined();
    });

    test('It should be a function', () => {
        expect(typeof handleSubmit).toBe("function");
    });
});
