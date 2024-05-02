const fs = require('fs');

const redirectUrl = process.env.REDIRECT_URL || '/'; // Définir l'URL de redirection en fonction de vos besoins
const content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <script>
    // Vérifie si la page demandée est introuvable (404)
    if (document.title === '404 Not Found') {
      var currentPath = window.location.pathname;
      var redirectUrl = window.location.origin + '/';
      // Redirige uniquement si la page demandée est introuvable
      if (currentPath !== '/') {
        window.location.href = redirectUrl;
      }
    }
  </script>
</head>
<body>
  <p>Redirecting to <a href="{{ redirectUrl }}">{{ redirectUrl }}</a></p>
</body>
</html>
`;

fs.writeFileSync('dist/404.html', content, 'utf8');
