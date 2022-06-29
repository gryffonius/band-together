import LeftNavigation from './Navigation/LeftNav/LeftNavigation'
import RightNavigation from './Navigation/RightNav/RightNavigation'
import TopNav from './Navigation/TopNavigation/TomNav';

// NAV BARS SEEN ONLY IF SIGNED IN

const Layout = (props) => {
  return (
    <>
      <LeftNavigation />
      <TopNav />
      <main>{props.children}</main>
      <RightNavigation />
    </>
  );
};

export default Layout;