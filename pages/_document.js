import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {

  render () {
    return (
      <html>
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />
          <link rel="shortcut icon" type="image/png" href="/static/favicon.png"/>
          {/* CSS Files */}
          <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css' />
          <link rel='stylesheet' href='/static/css/custom.css' />
          <link rel='stylesheet' href='/static/css/nprogress.css' />
          <script src="/static/js/jquery.min.js" type="text/javascript"></script>
        </Head>
        <body >
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
