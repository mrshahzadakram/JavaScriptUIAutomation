const downloadsFolder = require('downloads-folder');
const fs = require('fs');
class genericUtils {
    static testSession = this.getRandomNumber(1, 100000);

    static getKeyValFromTable(table) {
        var raw = table.raw();

        const results = [];
        const headers = raw[0];

        for (let i = 1; i < raw.length; i++) {
            const row = raw[i];
            for (let j = 0; j < headers.length; j++) {
                results.push({ key: headers[j], value: this.convertString(row[j]) });
            }
        }

        return results;
    }

    static convertString(str) {
        return str
            .replace('<Test_ID>', this.testSession.toString());
    }

    static getRandomNumber(min, max) {
        return Math.floor((Math.random() * max) + min);
    }

    static getObjectListFromTable(table) {
        var raw = table.raw();

        const results = [];
        const headers = raw[0];

        for (let i = 1; i < raw.length; i++) {
            const row = raw[i];
            const item = {};
            for (let j = 0; j < headers.length; j++) {
                item[headers[j]] = this.convertString(row[j]);
            }
            results.push(item);
        }

        return results;
    }

    static async validateDownload(fileName) {

        const downloadsPath = downloadsFolder();

        var path = downloadsPath + '\\' + fileName;

        let success = false;

        try {
            fs.access(path, fs.F_OK, (err) => {
                if (err) {
                    success = false;
                } else {
                    success = true;
                }

                expect(success, 'The files does not exist on the downloads folder.').to.be.true;
            })
        } catch (err) {
            console.error(err)
            expect(success, 'The download failed.').to.be.true;
        }

        return success;
    }
}

module.exports = genericUtils;