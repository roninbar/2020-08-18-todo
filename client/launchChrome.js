const chromeLauncher = require('chrome-launcher');
console.info(process.argv);
chromeLauncher.launch({
    startingUrl: process.argv[2],
    port: 9222,
}).then(function (chrome) {
    console.info('Chrome remote debugging port:', chrome.port);
});