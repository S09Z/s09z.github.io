// ** React Imports
import { ReactNode, useEffect } from 'react'

// ** Layout Import
import BlankLayout from '../layouts/BlankLayout'

// ** Next Imports
import { useRouter } from 'next/router'

/**
 *  Set Home URL based on User Roles
 */
export const getHomeRoute = (role: string) => {
  if (role === 'client') return '/acl'
  return '/document'
}

const Home = () => {
  // ** Hooks
  const router = useRouter()


  // return <Spinner />
}
Home.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Home
