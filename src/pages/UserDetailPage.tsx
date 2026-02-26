
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Card, CardContent, CircularProgress, Button, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PostItem } from '../components';
import { useUserData } from '../hooks/useUserData';

const UserDetailPage: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { user, userPosts, isLoading } = useUserData(userId);

  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress color="primary" /></Box>;
  if (!user) return <Typography textAlign="center" sx={{ mt: 5 }}>Utente non trovato.</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/')} 
        sx={{ mb: 3 }}
      >
        Torna alla Home
      </Button>

      <Card sx={{ mb: 4, borderLeft: 6, borderColor: 'primary.main', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>
            {user.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            @{user.username}
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography><strong>Email:</strong> {user.email}</Typography>
            <Typography><strong>Sito Web:</strong> {user.website}</Typography>
            <Typography><strong>Azienda:</strong> {user.company?.name}</Typography>
          </Box>
        </CardContent>
      </Card>

      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        Tutti i post di {user.name} ({userPosts.length})
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Card sx={{ border: '1px solid', borderColor: 'divider', boxShadow: 1, borderRadius: 2 }}>
        {userPosts.map((post, index) => (
          <React.Fragment key={post.id}>
            <PostItem post={post} user={user} viewMode="list" />
            {index < userPosts.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Card>
    </Container>
  );
};

export default UserDetailPage;