import { useRouter } from 'next/router'
import React from 'react'
import { useIsAuth } from '../../../../utils/useIsAuth'
import { withApollo } from '../../../../utils/withApollo'

const Product = () => {
    const router = useRouter()
    const id = router.query.id
    useIsAuth()
    return (
      <>
        {id}
      </>
    )
}

export default withApollo({ ssr: true })(Product)