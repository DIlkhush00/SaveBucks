import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

const Product = ({ product }) => {
    let prefixURL = 'https://www.google.com';
    let URL = product.productURL ? product.productURL : product.productSecondaryURL;
    if(URL.startsWith('/url?url='))
    {
       URL = URL.replace('/url?url=', '');
    }
    else if(URL.startsWith('/'))
    {
        URL = prefixURL + URL;
    }
    URL = URL.replace(/\/url\?url=/, '').split('&')[0];

    return (
        product.valid ? (
            <Card sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                maxWidth: '100%', 
                height: '100%',
                ':hover': {
                    overflow: 'visible'
                }
                }}
            >
                <CardMedia
                    component="img"
                    sx={{
                        width: '100%',
                        height: 200,
                        objectFit: 'contain',
                        transition: 'transform 0.3s ease-in-out',
                        ':hover': {
                            transform: 'scale(1.3)',
                        }
                    }}
                    image={product.thumbnail ? product.thumbnail : "https://media.giphy.com/media/xTkcEQACH24SMPxIQg/giphy.gif?cid=ecf05e47ci7gxtq9v74se0k9jc2fwho5620reuyofasu41p8&ep=v1_gifs_search&rid=giphy.gif&ct=g"}
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
                        href={ URL }
                    >
                        View
                    </Button>
                </CardContent>
            </Card>
        ) : null
    );
};

export default Product;
