module.exports = function(html, initialState) {
    return `
    <!doctype html>
    <html lang='en'>
      <head>
        <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css' />
        <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css' />
        <link rel='icon' href='./favicon.ico' type='image/x-icon' />
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' />
        <title>React Redux Socket.io Chat</title>
      </head>
      <body>
        <div id='react'>${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src='/dist/bundle.js'></script>
      </body>
    </html>`;
};
