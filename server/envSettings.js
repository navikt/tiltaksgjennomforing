const fsExtra = require('fs-extra');


/*  TODO : tenkt at denne kan benyttes i server.js når vi skal injecte milijø values */

function createEnvSettingsFile(settingsFile) {
    fsExtra.ensureFile(settingsFile).then((f) => {
        fsExtra.writeFileSync(
            settingsFile
        );
    });
}
module.exports = createEnvSettingsFile;