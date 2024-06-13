import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

const Product = ({ product, index }) => {

    return (
        <Card sx={{ display: 'flex', minHeight: 265 }} key={index}>
            <CardMedia
                component="img"
                sx={{
                    maxWidth: 150
                }}
                image={product.thumbnail}
                alt={product.title}
            />
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-around' }}>
                <Typography component="div" variant="h6">
                    {product.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    by {product.authorName}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    Type: {product.type}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    Price: {product.price}
                </Typography>
                <Button sx={{width: '100%'}} target='_blank' variant="outlined" color="success" href={"https://amazon.in" + product.productURL} >View</Button>
            </CardContent>
        </Card>


    )
}

export default Product;