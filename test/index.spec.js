const Browser = require('../index');

const chai = require("chai");

chai.should();

describe('index.js', () => {
    let executablePath;
    let config;
    beforeEach(function () {
        executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
        config = {
            "executablePath": executablePath,
            "headless": true
        };
    });

    describe('start()', () => {
        it('start success', async () => {
            let ws;
            try {
                let b = new Browser();
                await b.start(config);
                let list = b.list().headless;
                list.size.should.equal(1);
                ws = list.values().next().value;
            } catch (e) {
                console.log(e.message)
            } finally {
                await Browser.close(ws)
            }
        });
        it('start failed', async () => {
            config.executablePath = "";
            try {
                let b = new Browser();
                await b.start(config);
            } catch (e) {
                console.log(e.message);
                e.message.should.contains('start browser failed')
            }
        })
    });
    describe('close()', () => {
        it('close success', async () => {
            let ws;
            let err;
            try {
                let b = new Browser();
                await b.start(config);
                let list = b.list().headless;
                list.size.should.equal(1);
                ws = list.values().next().value;
                await Browser.close(ws)
            } catch (e) {
                err = e;
            } finally {
                (err === undefined).should.be.true;
            }
        });
        it('close failed', async () => {
            try {
                await Browser.close('ws://7788');
            } catch (e) {
                console.log(e.message);
                e.message.should.contains('close browser failed')
            }
        })
    });
    describe('connect()', () => {
        it('connect success', async () => {
            let ws;
            let err;
            try {
                let b = new Browser();
                await b.start(config);
                let list = b.list().headless;
                list.size.should.equal(1);
                ws = list.values().next().value;
                await Browser.connect(ws);
            } catch (e) {
                err = e;
            } finally {
                (err === undefined).should.be.true;
                await Browser.close(ws)
            }
        });
        it('connect failed', async () => {
            try {
                await Browser.connect('ws://7788');
            } catch (e) {
                console.log(e.message);
                e.message.should.contains('connect browser failed')
            }
        })
    });
});