import React, { createContext, useReducer } from 'react'
import { detailReducer } from '../reducers/detailReducer'
import { ProductDetail, ProductDetailAction } from '../types/ProductDetail'

interface DetailContextProps { }

export const DetailContext = createContext<{
    productDetail: ProductDetail;
    dispatch: React.Dispatch<ProductDetailAction>
}>({
    productDetail: { size: "", color: "" },
    dispatch: () => null
})

const DetailContextProvider: React.FC<DetailContextProps> = ({ children }) => {
    const [productDetail, dispatch] = useReducer(detailReducer, { size: "", color: "" })

    return (
        <DetailContext.Provider value={{ productDetail, dispatch }}>
            {children}
        </DetailContext.Provider>
    );
}

export default DetailContextProvider