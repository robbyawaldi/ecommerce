import { useRouter } from 'next/router';
import React from 'react'
import ReactPaginate from 'react-paginate';
import { Product, Sort, useProductsQuery } from '../../../generated/graphql';
import { LIMIT_PAGE_WEB } from '../../../static/products';
import { loadingOrQueryFailed } from '../../../utils/loadingOrQueryFailed';
import { Card } from '../atoms/Card'
import paginate from '../../../styles/frontend/Paginate.module.css'
import { SearchNotFound } from '../atoms/SearchNotFound';

interface GalleryProps { }

export const Gallery: React.FC<GalleryProps> = ({ }) => {
    const router = useRouter()
    const { data, error, loading, refetch } = useProductsQuery({
        variables: {
            page: 1,
            limit: LIMIT_PAGE_WEB,
            isExclusive: router.pathname == '/exclusive' || router.query.exclusive !== undefined,
            isDiscount: router.query.discount !== undefined,
            categoryId: router.pathname == '/categories' ? parseInt(router.query.id as string) : 0,
            sortByName: router.query.sortByName as Sort ?? undefined,
            sortByPrice: router.query.sortByPrice as Sort ?? undefined,
            search: router.query.keyword as string ?? undefined
        },
        fetchPolicy: "no-cache",
        notifyOnNetworkStatusChange: true
    })

    const totalPage = Math.ceil((data?.products?.meta.total ?? 0) / LIMIT_PAGE_WEB)

    const errorMessage = loadingOrQueryFailed({ data, error, loading })
    if (errorMessage) {
        return errorMessage
    }

    return (
        <div>
            <div className="h-auto grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-8">
                {data?.products?.products.map((product) => (
                    <Card key={product.id} product={product as Product} />
                ))}
            </div>
            {(data?.products?.products.length ?? 0) < 1 &&  typeof router.query.keyword == 'string'
                ? <SearchNotFound />
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