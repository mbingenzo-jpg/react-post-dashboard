import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Avatar, Typography } from '@mui/material';
import { Post } from '../../interfaces/post.interface';
import { User } from '../../interfaces/user.interface';

interface PostItemProps {
  post: Post;
  user?: User;
  viewMode: 'list' | 'grid';
}

const PostItem: React.FC<PostItemProps> = ({ post, user, viewMode }) => {
  const navigate = useNavigate();

  const getInitials = (name?: string) => {
    if (!name) return '??';
    const parts = name.split(' ');
    return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
  };

  return (
    <Box sx={{ p: 3, height: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: viewMode === 'grid' ? 'column' : 'row',
        alignItems: 'flex-start', 
        gap: 3 
      }}>
        
        <Avatar
          variant="rounded"
          onClick={() => navigate(`/post/${post.id}`)}
          sx={{
            width: 50, height: 50, bgcolor: 'primary.main', fontWeight: 'bold', 
            cursor: 'pointer', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' },
            flexShrink: 0, borderRadius: '8px',
            mt: viewMode === 'list' ? 0.5 : 0 
          }}
        >
          {getInitials(user?.name)}
        </Avatar>

        <Box sx={{ flex: 1 }}>
          <Typography 
            variant="h2" 
            sx={{ fontSize: '2rem', fontWeight: 'bold', color: 'primary.main', textTransform: 'capitalize', mb: 0.5, mt: 0, lineHeight: 1.1 }}
          >
            {post.title}
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: '#666', mb: 1.5 }}>
            pubblicato da:{' '}
            <Box 
              component="span" 
              onClick={(e) => {
                e.stopPropagation();
                if (user) navigate(`/user/${user.id}`);
              }}
              sx={{ 
                color: 'primary.main', 
                textDecoration: 'underline', 
                cursor: 'pointer',
                '&:hover': { color: 'text.primary' } 
              }}
            >
              {user?.username}
            </Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PostItem;