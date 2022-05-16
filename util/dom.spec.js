import fs from 'fs';
import path from 'path';

import { beforeEach, expect, it, vi } from "vitest";
import { Window} from 'happy-dom';
import { showError } from "./dom";

const htmlDocPath = path.join(process.cwd(), 'index.html');//Setting up the path
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString();//The document content

const window = new Window();//this is from happy-dom
const document = window.document;//here we take window.document

vi.stubGlobal('document', document);//Now we mock the document using the above setup

beforeEach(() => {
    document.body.innerHTML = '';//Reset the body
    document.write(htmlDocumentContent);//we set the content to the window
});

it('should add an error paragraph to the id="errors" element', () => {
    //Arrange and acting but in an unusual way
    showError('test');

    const errorsEl = document.getElementById('errors');
    const errorParagraph = errorsEl.firstElementChild;//Getting the <p></p> generated from div which contains id errors

    //Assert
    expect(errorParagraph).not.toBeNull();
});

it('should not contain an error paragraph initially', () => {
    const errorsEl = document.getElementById('errors');
    const errorParagraph = errorsEl.firstElementChild;//Getting the <p></p> generated from div which contains id errors

    //Assert
    expect(errorParagraph).toBeNull();
});

it('should output the provided message in the error paragraph', () => {
    const testErrorMessage = 'Test';

    showError(testErrorMessage);

    const errorsEl = document.getElementById('errors');
    const errorParagraph = errorsEl.firstElementChild;//Getting the <p></p> generated from div which contains id errors

    //Assert
    expect(errorParagraph.textContent).toBe(testErrorMessage);
});