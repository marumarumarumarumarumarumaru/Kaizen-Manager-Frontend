import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';

export default function CreateTaskCard({ status }) {
  return (
    <Card key={status} sx={{ mb: 2 }} >
      <CardActionArea>
        <CardContent>
          <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <PostAddIcon/>
            <Typography gutterBottom variant="button" component="div" sx={{ ml: 2 }}>
              Create task
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}