import fs from 'node:fs';
import jsdom from 'jsdom';
import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

const { JSDOM } = jsdom;

const scriptAddress: string =
    'https://internarbeidsflatedecorator.nais.adeo.no/internarbeidsflatedecorator/v2/static/js/head.v2.min.js';
const styleAddress: string =
    'https://internarbeidsflatedecorator.nais.adeo.no/internarbeidsflatedecorator/v2/static/css/main.css';

async function getModiaDekoratoren(
    indexpath: string,
    req: Request<{}, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>, number>,
): Promise<void> {
    const index: string = await getHTMLDocument(indexpath);

    const { document } = new JSDOM(index).window;
    if (document) {
        console.log('document is defined');
        const updatedDocument = setInnHTML(document);
        console.log('current updated document: ', updatedDocument.documentElement.outerHTML);
        res.send(`<!DOCTYPE html>${updatedDocument.documentElement.outerHTML}`);
    } else {
        throw new Error('Feilet med oppdatering av index.html.');
    }
}

async function getHTMLDocument(indexFilepath: string): Promise<string> {
    const fsPromises = fs.promises;

    const index = await fsPromises
        .readFile(indexFilepath)
        .then((res) => res.toString())
        .catch((err) => console.error('Failed to read file', err));

    if (typeof index === 'string') {
        return index;
    }
    throw new Error('Greide ikke lese index.html fra disc.');
}

function setInnHTML(document: Document): Document {
    const style = document.createElement('link');
    style.href = process.env.DECORATOR_INTERNAL_STYLING ?? styleAddress;
    style.rel = 'stylesheet';

    const script = document.createElement('script');
    script.src = process.env.DECORATOR_INTERNAL_SCRIPT ?? scriptAddress;

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

export default { getModiaDekoratoren };
