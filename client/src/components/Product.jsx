function Product ({product, index}) {

    return (
        <div className="product-card" key={index}>
            <div className="product-image">
                <img src={product.thumbnail} alt={`Product ${index + 1} Thumbnail`} />
            </div>
            <h3>{product.title}</h3>
            <p>Price: {product.price}</p>
            <a href={"https://amazon.in" + product.productURL} target="_blank" rel="noopener noreferrer">
                View Product
            </a>
        </div>
    )
}

export default Product;