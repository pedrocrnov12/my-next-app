import Link from 'next/link';
import { Container, Typography, Button, Box } from '@mui/material';

const HomePage = () => {
  return (
    <Container className="flex flex-col justify-center items-center h-screen">
      <Box mb={4}>
        <img src="/3.png" alt="Logo" style={{ maxWidth: '450px' }} />
      </Box>
      <Typography variant="h2" gutterBottom>
        Bienvenido a BlogFace
      </Typography>
      <Link href="/posts/PostList" passHref>
        <Button variant="contained" color="primary">
          Ver Posts
        </Button>
      </Link>
    </Container>
  );
};

export default HomePage;
