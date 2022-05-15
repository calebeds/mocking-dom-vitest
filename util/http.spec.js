import { describe, expect, it, vi } from "vitest";
import { HttpError, ValidationError } from "./errors";
import { sendDataRequest } from "./http";

const testResponseData = {testKey: 'testData'};

const testFetch = vi.fn((url, options) => {
    return new Promise((resolve, reject) => {
        if(typeof options.body !== 'string') {
            return reject('Not a string.');
        }
        const testResponse = {
            ok: true, //Ok is used on send data request
            json() {
                return new Promise((resolve, reject) => {
                    resolve(testResponseData);
                });
            }//Adds this json() method to the testReponse. Interesting
        };

        resolve(testResponse);
    });
});//Replacing the code on http

vi.stubGlobal('fetch', testFetch);//Here we pass a spy for the mock, pretty interesting 'cause we get the both functionalites
 

describe('function sendDataRequest()', () => {
    it('should return any available response data', () => {
        const testData = {key: 'test'};

        return expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
    });

    it('should convert the provided data to JSON before sending the request', () => {
        const testData = {key: 'test'};

        let errorMessage;

        try {
            sendDataRequest(testData);//There are awaits inside of it, but this is an async funtion, search for it, but there is no agreement over it
        } catch (error) {
            errorMessage = error;
        }
        
        expect(errorMessage).not.toBe('Not a string');
        // expect(errorMessage).toBeUndefined();
    });

    it('should throw an HttpError in case of non-ok responses', () => {
        testFetch.mockImplementationOnce(((url, options) => {
            return new Promise((resolve, reject) => {
                if(typeof options.body !== 'string') {
                    return reject('Not a string.');
                }
                const testResponse = {
                    ok: false, //Ok is used on send data request
                    json() {
                        return new Promise((resolve, reject) => {
                            resolve(testResponseData);
                        });
                    }//Adds this json() method to the testReponse. Interesting
                };
        
                resolve(testResponse);
            });
        }));


       
        const testData = {key: 'test'};

        return expect(sendDataRequest(testData)).rejects.toBeInstanceOf(HttpError);
        
    });
});