const fs = require('fs');

const redirectUrl = process.env.REDIRECT_URL || '/'; // Définir l'URL de redirection en fonction de vos besoins
const content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <script>
    var redirectUrl = window.location.href.split('/').slice(0, 4).join('/') + '/'; // Mettez à jour cette URL selon votre configuration
    window.location.href = redirectUrl;
  </script>
</head>
<body>
  <p>Redirecting to <a href="{{ redirectUrl }}">{{ redirectUrl }}</a></p>
</body>
</html>
`;

fs.writeFileSync('dist/404.html', content, 'utf8');
