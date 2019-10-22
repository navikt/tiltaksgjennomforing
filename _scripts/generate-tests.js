const glob = require('glob');
const path = require('path');
const fs = require('fs');
const createSimpleTest = componentName => {
    return `
import React from 'react';
import { shallow } from 'enzyme';
import ${componentName} from './${componentName}';

test('Test that <${componentName}> renders correctly', () => {
    const wrapper = shallow(<${componentName}/>);
    expect(wrapper).toHaveLength(1);
});`;
};
const ensureFileExists = filePath => {
    if (!fs.existsSync(filePath)) {
        console.log('Creating an new file: ' + relativeFilePath(filePath));
        fs.closeSync(fs.openSync(filePath, 'w'));
    }
};
const relativeFilePath = absFilePath => {
    const rootDir = path.join(__dirname, '..');
    return absFilePath.replace(rootDir, '');
};
const pathToTest = path.join(__dirname, '..', 'src/**/*.tsx');

glob(pathToTest, function(er, files) {
    if (er) {
        console.error(er);
        process.exit(1);
    }
    files.forEach(filePath => {
        if (filePath.slice(-8) !== 'spec.tsx') {
            const specFilePath = filePath.replace('tsx', 'spec.tsx');
            ensureFileExists(specFilePath);
            const stats = fs.statSync(specFilePath);
            const fileSizeInBytes = stats['size'];
            const componentName = path.basename(filePath, '.tsx');
            if (fileSizeInBytes === 0) {
                console.log(
                    'Created a simple test for component <' +
                        componentName +
                        '/>'
                );
                const simpleTest = createSimpleTest(componentName);
                fs.writeFileSync(specFilePath, simpleTest);
            }
        }
    });
});
