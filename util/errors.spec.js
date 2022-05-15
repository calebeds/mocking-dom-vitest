import { describe, expect, it } from "vitest";
import { HttpError, ValidationError } from "./errors";

describe('class HttpError', () => {
    it('should contain the provided status code, message and data', () => {
        const testStatus = 1;
        const testMessage = 'Test';
        const testData = {key: 'test'};

        const testError = new HttpError(testStatus, testMessage, testData);

        expect(testError.statusCode).toBe(testStatus);
        expect(testError.message).toBe(testMessage);
        expect(testError.data).toBe(testData);
    });

    it('should contain undefined as data if no data is provided', () => {
        const testStatus = 1;
        const testMessage = 'Test';

        const testError = new HttpError(testStatus, testMessage);

        expect(testError.statusCode).toBe(testStatus);
        expect(testError.message).toBe(testMessage);
        expect(testError.data).not.toBeDefined();
    });

    it('should contain undefined as message if no message is provided', () => {
        const testStatus = 1;

        const testError = new HttpError(testStatus);

        expect(testError.statusCode).toBe(testStatus);
        expect(testError.message).toBeUndefined();
    });
});

describe('class ValidationError', () => {
    it('should contain the provided message', () => {
        const testMessage = 'test';

        const testError = new ValidationError(testMessage);

        expect(testError.message).toBe(testMessage);
    });

    it('should contain undefined as message if message is provided', () => {
        const testError = new ValidationError();

        expect(testError.message).toBeUndefined();
    });
});