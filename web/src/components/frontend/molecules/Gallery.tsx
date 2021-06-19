import { useRouter } from 'next/router';
import React from 'react'
import ReactPaginate from 'react-paginate';
import { Product, Sort, useProductsQuery } from '../../../generated/graphql';
import { LIMIT_PAGE_WEB } from '../../../static/products';
import { loadingOrQueryFailed } from '../../../utils/loadingOrQueryFailed';
import paginate from '../../../styles/frontend/Paginate.module.css'
import { SearchNotFound } from '../atoms/SearchNotFound';
import styles from '../../../styles/frontend/Gallery.module.css'
import dynamic from 'next/dynamic';
import { CardProps } from '../atoms/Card';
const Card = dynamic(() => import('../atoms/Card').then((component) => component.Card as any), { ssr: false }) as React.ComponentType<CardProps>

interface GalleryProps { }

export const Gallery: React.FC<GalleryProps> = ({ }) => {
    const router = useRouter()
    const { data, error, loading, refetch } = useProductsQuery({
        variables: {
            page: 1,
            limit: LIMIT_PAGE_WEB,
            isExclusive: router.pathname == '/exclusive' || router.query.exclusive !== undefined,
            isMalikha: router.pathname == '/malikha-indonesia',
            categoryId: router.pathname == '/categories' ? parseInt(router.query.id as string) : 0,
            isDiscount: router.pathname == '/promotion' || router.query.discount !== undefined,
            sortByName: router.query.sortByName as Sort ?? undefined,
            sortByPrice: router.query.sortByPrice as Sort ?? undefined,
            search: router.query.keyword as string ?? undefined
        },
        fetchPolicy: 'cache-and-network'
    })

    const totalPage = Math.ceil((data?.products?.meta.total ?? 0) / LIMIT_PAGE_WEB)

    const errorMessage = loadingOrQueryFailed({ data, error, loading })
    if (errorMessage) {
        return errorMessage
    }

    return (
        <div>
            <div className={styles.cards}>
                {data?.products?.products.map((product) => (
                    <Card key={product.id} product={product as Product} />
                ))}
            </div>
            {(data?.products?.products.length ?? 0) < 1
                ? typeof router.query.keyword == 'string'
                    ? <SearchNotFound />
                    : null
                : (
                    <ReactPaginate
                        previousLabel={''}
                        nextLabel={''}
                        breakLabel={'..'}
                        pageCount={totalPage}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={5}
                        onPageChange={({ selected }) => {
                            refetch({
                                page: selected + 1
                            })
                        }}
                        containerClassName={paginate.pagination}
                        activeClassName={paginate.pagination__link_active}
                        previousClassName={`${paginate.pagination_nav} ${paginate.pagination_prev}`}
                        nextClassName={`${paginate.pagination_nav} ${paginate.pagination_next}`}
                    />
                )}
        </div>
    );
}