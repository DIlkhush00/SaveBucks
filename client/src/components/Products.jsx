import { Grid } from "@mui/material"
import PropTypes from 'prop-types';
import Product from "./Product"

const Products = ({ productsData }) => {

    return (
        <>
        {productsData ? (
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {productsData.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Product product={product} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <p>Nothing to show yet...</p>
        )}
      </>
    )
}
Products.propTypes = {
  productsData: PropTypes.array,
};

export default Products