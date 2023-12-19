import Product from "./Product"

function Products({productsData}) {

    return (

        <div className="Products">
            {productsData ? productsData.map((product, index) => (
                <Product product={product} key={index} />
            )): 
            (<p>Nothing to show yet...</p>)}
        </div>
    )
}

export default Products