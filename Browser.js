const puppeteer = require('puppeteer-core');

class Browser {
    constructor() {
        this._list = {
            'headless': new Set(),
            'withhead': new Set()
        }
    }

    /**
     * 启动新的浏览器实例，并把 wsEndpoint 保存到 _list 属性
     * @param config{Object}
     * @return {Promise<void>}
     */
    async start(config) {
        const browser = await puppeteer.launch(config);
        browser.on('disconnected', function () {
            console.log('browser disconnected');
        });
        let wsEndpoint = browser.wsEndpoint();
        if (config.headless === false) {
            this._list.withhead.add(wsEndpoint);
        } else {
            this._list.headless.add(wsEndpoint);
        }
    }

    list() {
        return this._list;
    }
}

module.exports = Browser;