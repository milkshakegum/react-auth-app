import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {

  render () {
    return (
      <html>
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />
          {/* CSS Files */}
          <link rel="stylesheet" href="/static/css/font-awesome.min.css"></link>
          <link rel="stylesheet" href="/static/css/semantic.min.css"></link>

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
