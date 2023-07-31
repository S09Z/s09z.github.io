// ** React Imports
import { ReactNode } from "react";

// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout";

/**
 *  Set Home URL based on User Roles
 */
export const getHomeRoute = (role: string) => {
  if (role === "client") return "/acl";
  return "/document";
};

const Home = () => {};
Home.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;
export default Home;
