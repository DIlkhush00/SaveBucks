import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

const Product = ({ product }) => {
    let prefixURL = '';

    // PustakKosh's product URL contains the entire URL so there's no need to set any condition for it
    if(product.source === 'Amazon') {
        prefixURL = "https://amazon.in";
    } else if(product.source === 'Flipkart') {
        prefixURL = "https://flipkart.com";
    }

    return (
        product.valid ? (
            <Card sx={{ display: 'flex', flexDirection: 'column', maxWidth: '100%', height: '100%' }}>
                <CardMedia
                    component="img"
                    sx={{
                        width: '100%',
                        height: 200,
                        objectFit: 'contain'
                    }}
                    image={product.thumbnail}
                    alt={product.title}
                />
                <CardContent 
                    sx={{ 
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        
                    }}
                >
                    <div>
                        <Typography 
                            variant="h6" 
                            component="div" 
                            sx={{
                                mb: 1,
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                width: '100%',
                            }}
                            title={product.title}
                        >
                            {product.title}
                        </Typography>
                        {product.authorName !== '' && (
                            <Typography 
                                variant="body2" 
                                color="text.secondary" 
                                component="div"
                                sx={{
                                    mb: 1,
                                    fontSize: '0.9rem',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    width: '100%',
                                }}
                                title={product.authorName} 
                            >
                                by {product.authorName}
                            </Typography>
                        )}
                        {product.extra !== '' && (
                            <Typography 
                                variant="body2"
                                color="text.secondary" 
                                component="div"
                                sx={{
                                    mb: 1,
                                    fontSize: '0.9rem',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    width: '100%',
                                }}
                                title={product.extra} 
                            >
                                {product.extra}
                            </Typography>
                        )}
                        {product.type !== '' && (
                            <Typography 
                                variant="body2" 
                                color="text.secondary" 
                                component="div"
                                sx={{
                                    mb: 1,
                                    fontSize: '0.9rem'
                                }}
                            >
                                Type: {product.type}
                            </Typography>
                        )}
                        <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            component="div"
                            sx={{
                                mb: 1,
                                fontSize: '0.9rem'
                            }}
                        >
                            Price: {product.price !== '' ? product.price : 'error'}
                        </Typography>
                        <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            component="div"
                            sx={{
                                mb: 1,
                                fontSize: '0.9rem'
                            }}
                        >
                            Source: {product.source}
                        </Typography>
                    </div>
                    <Button 
                        sx={{ width: '100%' }} 
                        target='_blank' 
                        variant="outlined" 
                        color="success" 
                        href={prefixURL + product.productURL}
                    >
                        View
                    </Button>
                </CardContent>
            </Card>
        ) : null
    );
};

export default Product;
