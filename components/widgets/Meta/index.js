import NProgress from 'nprogress';
import Router from 'next/router';
import Footer from 'components/views/Dashboard/Footer';

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export default (props) => (
  <div>
      {props.children}
      <Footer />
  </div>
)
