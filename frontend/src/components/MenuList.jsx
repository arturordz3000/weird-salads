import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useMenu } from '../hooks/useMenu';

function MenuList() {
    const { data, loading } = useMenu();

  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
        gap: 2,
      }}
    >
      {data?.menu.map((item, index) => (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {item.recipe_name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Price: ${item.price}
                </Typography>
            </CardContent>
            </CardActionArea>
            <CardActions>
            <Button size="small" color="primary">
                Add to order
            </Button>
            </CardActions>
        </Card>
      ))}
    </Box>
  );
}

export default MenuList;