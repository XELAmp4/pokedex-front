const fs = require('fs');

const redirectUrl = process.env.REDIRECT_URL || '/'; // Définir l'URL de redirection en fonction de vos besoins
const content = `<!doctype html><html lang="en-US"><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" href="/pokedex-front/favicon.ico"><title>pokedex</title><script defer="defer" src="/pokedex-front/js/chunk-vendors.c791d296.js"></script><script defer="defer" src="/pokedex-front/js/app.de3bdf05.js"></script><link href="/pokedex-front/css/app.612d9488.css" rel="stylesheet"></head><body><noscript><strong>We're sorry but pokedex doesn't work properly without JavaScript enabled. Please enable it to continue.</strong></noscript><div id="app"></div></body></html>
`;

fs.writeFileSync('dist/404.html', content, 'utf8');
