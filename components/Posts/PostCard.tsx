// components/posts/PostCard.tsx

import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

interface PostCardProps {
  title: string;
  content: string;
  author: string;
  date: string;
  id: string;
}

const PostCard: React.FC<PostCardProps> = ({ title, content, author, date, id }) => {
  return (
    <Card className="m-4">
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          by {author} on {date}
        </Typography>
        <Typography variant="body2">
          {content.slice(0, 100)}...
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={`/posts/${id}`}>Read More</Button>
      </CardActions>
    </Card>
  );
};

export default PostCard;
