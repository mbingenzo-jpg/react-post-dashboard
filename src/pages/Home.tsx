
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, CircularProgress, Typography, ToggleButton, ToggleButtonGroup, Card, Divider } from '@mui/material';
import Grid from '@mui/material/Grid'; 
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';

import { Header, SearchBar, PostDetailCard, PostItem } from '../components';
import { usePostsData } from '../hooks/usePostsData';

const HomePage: React.FC = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  
  const { users, filteredPosts, isLoading, searchTerm, setSearchTerm, deletePost } = usePostsData();
  
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const selectedPost = postId ? filteredPosts.find(p => p.id === Number(postId)) : null;
  const selectedUser = selectedPost ? users.find(u => u.id === selectedPost.userId) : null;

  const handleDeletePost = (idToDelete: number) => {
    deletePost(idToDelete);
    navigate('/'); 
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ pb: 4 }}>
      <Box 
        sx={{ 
          position: 'sticky', 
          top: 0, 
          zIndex: 10, 
          bgcolor: 'background.default', 
          pt: 4, 
          pb: 2, 
          mb: 2,
          mx: { xs: -2, sm: -3 }, 
          px: { xs: 2, sm: 3 },
        }}
      >
        <Header />
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </Box>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(event, newView) => { if (newView) setViewMode(newView); }}
            color="primary"
            sx={{ height: '56px' }}
          >
            <ToggleButton value="list">
              <ViewListIcon />
            </ToggleButton>
            <ToggleButton value="grid">
              <GridViewIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {selectedPost && selectedUser && (
        <PostDetailCard 
          post={selectedPost} 
          user={selectedUser} 
          onClose={() => navigate('/')} 
          onDelete={handleDeletePost}
        />
      )}

      {viewMode === 'list' ? (
        <Card sx={{ border: '1px solid', borderColor: 'divider', boxShadow: 1, borderRadius: 2 }}>
          {filteredPosts.map((post, index) => (
            <React.Fragment key={post.id}>
              <PostItem 
                post={post} 
                user={users.find(u => u.id === post.userId)} 
                viewMode="list" 
              />
              {index < filteredPosts.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Card>
      ) : (
        <Grid container spacing={3}>
          {filteredPosts.map(post => (
            <Grid size={{ xs: 12, md: 6 }} key={post.id}>
              <Card sx={{ height: '100%', border: '1px solid', borderColor: 'divider', boxShadow: 1, borderRadius: 2 }}>
                <PostItem 
                  post={post} 
                  user={users.find(u => u.id === post.userId)} 
                  viewMode="grid" 
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {filteredPosts.length === 0 && (
        <Typography textAlign="center" sx={{ mt: 4, color: 'text.secondary' }}>
          Nessun post trovato.
        </Typography>
      )}
    </Container>
  );
};

export default HomePage;