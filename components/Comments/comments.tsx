import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, CircularProgress, List, ListItem, ListItemText, Avatar, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useAuth } from 'contexts/AuthContext'; // Ajusta la ruta según sea necesario

interface Comment {
  _id: string;
  comment: string;
  date: string;
  idUser: {
    name: string;
  };
}

interface CommentsModalProps {
  open: boolean;
  handleClose: () => void;
  postId: string;
}

const CommentsModal: React.FC<CommentsModalProps> = ({ open, handleClose, postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const { token, user } = useAuth();

  useEffect(() => {
    if (open) {
      const fetchComments = async () => {
        if (!token) {
          setError('No token found');
          setLoading(false);
          return;
        }

        try {
          console.log(`Fetching comments for postId: ${postId}`);
          const response = await axios.get(`http://localhost:3000/get/comments/${postId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setComments(response.data);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
        } finally {
          setLoading(false);
        }
      };

      fetchComments();
    }
  }, [open, postId, token]);

  const handleAddComment = async () => {
    if (!newComment) {
      setError('Comment cannot be empty');
      return;
    }

    if (!token || !user) {
      setError('No token or user found');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/post/comment`,
        { comment: newComment, postId, idUser: localStorage.getItem('userId') },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments([...comments, response.data.saveComment]);
      setNewComment('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography id="modal-title" variant="h6" component="h2">
          Comments
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <>
            <List>
              {comments.map((comment) => (
                <ListItem key={comment._id} alignItems="flex-start">
                  <Avatar>{comment.idUser?.name?.charAt(0)}</Avatar>
                  <ListItemText primary={comment.idUser?.name} secondary={`${comment.comment} - ${comment.date}`} />
                </ListItem>
              ))}
            </List>
            <TextField
              label="Add a comment"
              variant="outlined"
              fullWidth
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              sx={{ mt: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleAddComment} sx={{ mt: 2 }}>
              Add Comment
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default CommentsModal;
