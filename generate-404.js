const fs = require('fs');

const redirectUrl = process.env.REDIRECT_URL || '/'; // Définir l'URL de redirection en fonction de vos besoins
const content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <script>
    var redirectUrl = window.location.origin + '/'; // Définissez la redirection par défaut à la racine
    var path = window.location.pathname;
    // Si l'URL demandée n'est pas la racine, redirigez vers cette URL
    if (path !== '/') {
      redirectUrl = window.location.origin + path;
    }
    window.location.href = redirectUrl;
  </script>
</head>
<body>
  <p>Redirecting to <a href="{{ redirectUrl }}">{{ redirectUrl }}</a></p>
</body>
</html>
`;

fs.writeFileSync('dist/404.html', content, 'utf8');
