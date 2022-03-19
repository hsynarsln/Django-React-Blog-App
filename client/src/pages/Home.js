import { Container, Grid, Grow } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlogCard from '../components/BlogCard';
import Loader from '../components/Loader';
import { clearErrors, loadBlogs } from '../redux/actions/blogAction';

const Home = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector(state => state.blogs);
  // console.log(blogs);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(loadBlogs());
  }, [dispatch, error]);

  return (
    <Grow in>
      <Container>
        <Grid container justify='space-between' alignItems='stretch' spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            {loading ? (
              <Loader />
            ) : (
              <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ margin: '5rem auto' }} spacing={2}>
                {blogs?.results?.map(data => (
                  <Grid key={data.id} item xs={12} md={4} sm={6} justifyContent='center'>
                    <BlogCard data={data} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
