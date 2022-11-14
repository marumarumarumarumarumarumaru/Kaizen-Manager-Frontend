import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Avatar from '@mui/material/Avatar';

export default function TaskCard({ id, name, assignee, targetDate }) {
  return (
    <Card key={id} sx={{ mb: 2 }} elevation={4}>
      <CardActionArea>
        <CardContent>
          <Typography noWrap gutterBottom variant="h6" component="div" sx={{ mb: 2 }}>
            {name}
          </Typography>
          {/* Color: succes, warning, error  */}
          {/* TODO: Do a date comparison check with current date + color accordingly */}
          <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Chip color="error" label={targetDate}/>
            <Avatar sx={{ width: 36, height: 36, ml: 1 }}>
              {assignee ? assignee.charAt(0) : null}
            </Avatar>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}