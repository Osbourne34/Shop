import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductQuery } from '../store/productsApi';

import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Loader from '../components/Loader/Loader';
import Product from '../components/Product/Product';

const ProductDetails = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetProductQuery(id);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <Breadcrumbs
                links={[
                    {
                        link: `/category/${data.category}`,
                        title: data.category,
                    },
                    {
                        link: null,
                        title: data.title,
                    },
                ]}
            />
            <Product product={data} />
        </>
    );
};

export default ProductDetails;
