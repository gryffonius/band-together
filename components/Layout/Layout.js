import LeftNavigation from '../AuthedNav/LeftNav/LeftNavigation'
import RightNavigation from '../AuthedNav/RightNav/RightNavigation'

// LEFT AND RIGHT NAV BARS SEEN ONLY IF SIGNED IN

const Layout = (props) => {
  return (
    <>
      <LeftNavigation />
      <main>{props.children}</main>
      <RightNavigation />
    </>
  );
};

export default Layout;