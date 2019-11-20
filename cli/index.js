// 使用方法： node cli/index.js config_file_name(default/debug)
const path = require('path');
const Browser = require('../Browser');

const config_dir = path.join(__dirname, '../config');

async function main(config_filename = 'default') {
    if (/\./.test(config_filename)) {
        console.log('config_filename 不能包含 .');
        process.exit(1);
    }
    try {
        let config = require(path.join(config_dir, config_filename));
        console.log(config);
        let browser = new Browser();
        await browser.start(config);
        console.log(browser.list());
    } catch (e) {
        if (e.code === 'MODULE_NOT_FOUND') {
            console.log(e.message);
        } else {
            console.log(e);
        }
    }
}

let config_filename = process.argv[2];
main(config_filename);
