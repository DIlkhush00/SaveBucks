import { Grid } from "@mui/material"
import Product from "./Product"

const Products = ({ productsData }) => {

    return (
        <>
        {productsData ? (
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 1, md: 8 }}>
            {productsData.map((product, index) => (
              <Grid item xs={1} sm={1} md={4} key={index}>
                <Product product={product} key={index} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <p>Nothing to show yet...</p>
        )}
      </>
    )
}

export default Products