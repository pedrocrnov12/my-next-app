import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, Typography, CircularProgress, Grid, Button, Avatar } from '@mui/material';
import { getAllPosts } from '@/utils/api';
import CommentsModal from '@/components/Comments/comments';

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        console.log('API response:', response);
        if (response.status === 200 && response.data && Array.isArray(response.data.docs)) {
          setPosts(response.data.docs);
        } else {
          setError('Unexpected response format');
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error('Error fetching posts:', err);
          setError(err.message);
        } else {
          console.error('Unknown error:', err);
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleOpenModal = (postId: string) => {
    console.log(`Opening modal for postId: ${postId}`);
    setSelectedPostId(postId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log('Closing modal');
    setModalOpen(false);
    setSelectedPostId(null);
  };

  if (loading) {
    return (
      <Container className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="flex justify-center items-center h-screen">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container className="mt-8">
      {posts.map((post) => (
        <Card key={post._id} className="mb-4">
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Avatar>{post.author ? post.author.charAt(0) : ''}</Avatar>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">{post.author}</Typography>
              </Grid>
            </Grid>
            <Typography variant="h5" component="div" className="mt-2">
              {post.title}
            </Typography>
            <Typography variant="body1" className="mt-2">
              {post.content}
            </Typography>
            <div className="mt-4">
              <Button variant="contained" color="primary" onClick={() => handleOpenModal(post._id)}>
                Comment
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      {selectedPostId && (
        <CommentsModal open={modalOpen} handleClose={handleCloseModal} postId={selectedPostId} />
      )}
    </Container>
  );
};

export default PostList;
