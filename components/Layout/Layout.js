import MainNavigation from './MainNavigation'

const Layout = () => {
  return (
    <>
      <MainNavigation />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;