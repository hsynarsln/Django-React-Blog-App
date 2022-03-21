import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import { AiFillLike } from 'react-icons/ai';
import { BiLike } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { MdComment } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { increseViewCountAPI, likePostAPI } from '../redux/actions/blogAction';

const BlogCard = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.user);

  const goDetailPageAndIncreasaeViewCount = () => {
    navigate(`/detail/${data.id}`);
    dispatch(increseViewCountAPI(data.id));
  };

  const likeBlog = () => {
    if (data?.likes.length === 0) {
      dispatch(likePostAPI(data.id));
    } else if (!data?.likes.find(like => like.user === (user.id || user.pk))) {
      dispatch(likePostAPI(data.id));
    }
  };

  return (
    <Card sx={{ maxWidth: 375 }} className='card'>
      <div onClick={goDetailPageAndIncreasaeViewCount}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: grey[900] }} aria-label='recipe'>
              {data.author[0].toUpperCase() || 'A'}
            </Avatar>
          }
          title={data.title.length > 30 ? data.title.substring(0, 30) + '...' : data.title}
          subheader={
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography variant='body2' color='text.secondary'>
                {data.category}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {data.days_since_creation > 0 ? data.days_since_creation + ' days ago' : 'today'}
              </Typography>
            </div>
          }
        />
        <CardMedia component='img' height='194' image={data.image} alt={data.title} />
        <CardContent>
          <Typography variant='body2' color='text.secondary' className='line-clamp'>
            {data.content}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant='body1' color='text.secondary' style={{ textAlign: 'right', fontWeight: 'bold' }}>
            {data.author || 'Anonymous'}
          </Typography>
        </CardContent>
      </div>

      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites' onClick={likeBlog}>
          {!data?.likes.find(like => like.user === (user?.id || user?.pk)) ? <BiLike /> : <AiFillLike color='blue' />}
          &nbsp;
          <p style={{ fontSize: '1rem' }}>{data.like_count}</p>
        </IconButton>
        <IconButton aria-label='view'>
          <FaEye />
          &nbsp;
          <p style={{ fontSize: '1rem' }}>{data.view_count}</p>
        </IconButton>
        <IconButton aria-label='add to comment'>
          <MdComment />
          &nbsp;
          <p style={{ fontSize: '1rem' }}>{data.comment_count}</p>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
