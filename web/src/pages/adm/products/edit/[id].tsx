import React from 'react'
import { BackButton } from '../../../../components/admin/BackButton'
import { EditProduct } from '../../../../components/admin/EditProduct'
import { Layout } from '../../../../components/admin/Layout'
import { useIsAuth } from '../../../../utils/useIsAuth'
import { withApollo } from '../../../../utils/withApollo'

const Product = () => {
  useIsAuth()
  
  return (
    <Layout>
      <BackButton />
      <EditProduct />
    </Layout>
  )
}

export default withApollo({ ssr: false })(Product)