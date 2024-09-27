import fs from 'node:fs';
import jsdom from 'jsdom';
import { Request, Response } from 'express';

import { DECORATOR_INTERNAL_STYLING, DECORATOR_INTERNAL_SCRIPT } from '../config';

const { JSDOM } = jsdom;

const scriptAddress: string = 'internarbeidsflatedecorator/bundle.js';
const styleAddress: string = 'internarbeidsflatedecorator/index.css';

export async function getModiaDekoratoren(indexpath: string, _: Request, res: Response) {
    const index: string = await getHTMLDocument(indexpath);

    const { document } = new JSDOM(index).window;
    if (document) {
        const updatedDocument = setInnHTML(document);
        res.send(`<!DOCTYPE html>${updatedDocument.documentElement.outerHTML}`);
    } else {
        throw new Error('Feilet med oppdatering av index.html.');
    }
}

async function getHTMLDocument(indexFilepath: string) {
    const fsPromises = fs.promises;

    const index = await fsPromises
        .readFile(indexFilepath)
        .then((res) => res.toString())
        .catch((err) => console.error('Failed to read file', err));

    if (typeof index === 'string') {
        return index;
    }
    throw new Error('Greide ikke lese index.html fra disk.');
}

function setInnHTML(document: Document) {
    const style = document.createElement('link');
    style.href = DECORATOR_INTERNAL_STYLING ?? styleAddress;
    style.rel = 'stylesheet';

    const script = document.createElement('script');
    script.src = DECORATOR_INTERNAL_SCRIPT ?? scriptAddress;

    insertHTML(document, style);
    insertHTML(document, script);

    return document;
}

function insertHTML(document: Document, htmlElement: Node): void {
    const head = document.getElementsByTagName('head')[0];
    if (head) {
        const title = head.getElementsByTagName('title')[0];
        title.after(htmlElement);
    }
}
