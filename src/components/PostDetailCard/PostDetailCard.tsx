import React from 'react';
import { Typography, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Post } from '../../interfaces/post.interface';
import { User } from '../../interfaces/user.interface';

interface PostDetailCardProps {
  post: Post;
  user: User;
  onClose: () => void;
  onDelete: (id: number) => void;
}

const PostDetailCard: React.FC<PostDetailCardProps> = ({ post, user, onClose, onDelete }) => {
  return (
   <Dialog 
      open={true} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
    >
      <DialogTitle sx={{ pb: 1 }} component="div">
        <Typography component="div" sx={{ fontSize: '0.75rem', color: '#666', mb: 1 }}>
          post pubblicato da: <strong>{user.name}</strong> alias{' '}
          <Box component="span" sx={{ color: 'primary.main', textDecoration: 'underline' }}>
            {user.username}
          </Box>
        </Typography>
        
        <Typography variant="h4" component="div" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          {post.title}
        </Typography>

      </DialogTitle>
      
      <DialogContent dividers>
        <Typography sx={{ fontSize: '1.1rem', color: 'text.primary', py: 1 }}>
          {post.body}
        </Typography>
      </DialogContent>
      
      <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
        <Button variant="outlined" color="primary" onClick={onClose}>
          Chiudi
        </Button>
        <Button variant="contained" color="error" onClick={() => onDelete(post.id)}>
          Elimina Card
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostDetailCard;