import fs from 'fs-extra';
import jsdom from 'jsdom';
import path from 'path';
import { ApiError } from '../../src/types/errors';

type NewDocument = Document | undefined;

const scriptAddress: string =
    'https://internarbeidsflatedecorator.nais.adeo.no/internarbeidsflatedecorator/v2/static/js/head.v2.min.js';
const styleAddress: string =
    'https://internarbeidsflatedecorator.nais.adeo.no/internarbeidsflatedecorator/v2/static/css/main.css';

function getModiaDekoratoren(): Document {
    console.log(
        'modiaDekoratoren path satt for henting av index.html: ',
        path.resolve(__dirname, './../build', 'index.html')
    );
    const document: NewDocument = getHTMLDocument(path.resolve(__dirname, './../build', 'index.html'));
    if (document) {
        const updatedDocument = setInnHTML(document);
        return updatedDocument;
    }
    throw new ApiError('Greide ikke lese index.html fra disc.');
}

function getHTMLDocument(indexFilepath: string): NewDocument {
    let newDocument;
    fs.readFile(indexFilepath, 'utf8', (err, data) => {
        if (!err) {
            const { document } = new jsdom.JSDOM(data).window;
            newDocument = document;
        }
    });
    return newDocument;
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
