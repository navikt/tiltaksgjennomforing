import fs from 'fs-extra';
import jsdom from 'jsdom';
import path from 'path';
import { ApiError } from '../../src/types/errors';

const { JSDOM } = jsdom;

type NewDocument = Document | undefined;

const scriptAddress: string =
    'https://internarbeidsflatedecorator.nais.adeo.no/internarbeidsflatedecorator/v2/static/js/head.v2.min.js';
const styleAddress: string =
    'https://internarbeidsflatedecorator.nais.adeo.no/internarbeidsflatedecorator/v2/static/css/main.css';

async function getModiaDekoratoren(): Promise<Document> {
    const indexpath = path.resolve(__dirname, './../../build', 'index.html');
    const index: string = await getHTMLDocument(indexpath);

    const { document } = new JSDOM(index).window;
    if (document) {
        const updatedDocument = setInnHTML(document);
        return updatedDocument;
    }

    throw new ApiError('Feilet med oppdatering av index.html.');
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
    throw new ApiError('Greide ikke lese index.html fra disc.');
}

function setInnHTML(document: Document): Document {
    const style = `<link rel="stylesheet" href="${process.env.DECORATOR_INTERNAL_STYLING ?? styleAddress}">`;
    const script = `<script src="${process.env.DECORATOR_INTERNAL_SCRIPT ?? scriptAddress}"></script>`;

    insertHTML(document, 'styles', style);
    insertHTML(document, 'scripts', script);

    return document;
}

function insertHTML(document: Document, id: string, htmlElement: string): void {
    const element = document.getElementById(id);
    if (element) {
        element.innerHTML = htmlElement;
    }
}

export default { getModiaDekoratoren };
