import { Box, Button, FormControl, InputLabel, NativeSelect, Paper, TextField } from '@mui/material';
import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createBlog, updateBlog } from '../redux/actions/blogAction';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: 5
    }
  },
  paper: {
    padding: 10
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  fileInput: {
    width: '97%',
    margin: '10px 0'
  },
  buttonSubmit: {
    marginTop: 10,
    marginBottom: 10,
    '&:hover': {
      background: '#aec8bf',
      color: '#126d88'
    }
  }
}));

const BlogForm = ({ blog }) => {
  const [blogData, setBlogData] = useState({
    id: '',
    title: '',
    content: '',
    image: '',
    category: ''
  });

  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (blog) {
      setBlogData({
        id: blog.id,
        title: blog.title,
        content: blog.content,
        image: blog.image,
        category: blog.category
      });
    }
  }, [blog]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (blog.id) {
      dispatch(updateBlog(blogData));
    } else {
      dispatch(createBlog({ title: blogData.title, content: blogData.content, image: blogData.image, category: blogData.category }));
    }
    navigate('/');
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <TextField name='title' variant='outlined' label='Title *' fullWidth value={blogData.title} onChange={e => setBlogData({ ...blogData, title: e.target.value })} />
        <TextField name='image' variant='outlined' label='Image URL *' fullWidth value={blogData.image} onChange={e => setBlogData({ ...blogData, image: e.target.value })} />
        <TextField name='content' variant='outlined' label='Content *' fullWidth value={blogData.content} onChange={e => setBlogData({ ...blogData, content: e.target.value })} multiline rows={10} />
        <Box sx={{ width: '100%', p: 1 }}>
          <FormControl fullWidth>
            <InputLabel variant='standard' htmlFor='uncontrolled-native'>
              Category
            </InputLabel>
            <NativeSelect
              inputProps={{
                name: 'category',
                id: 'uncontrolled-native'
              }}
              value={blogData.category}
              onChange={e => setBlogData({ ...blogData, category: e.target.value })}
            >
              <option value={'General'}>General</option>
              <option value={'Technology'}>Technology</option>
              <option value={'Business'}>Business</option>
              <option value={'Entertainment'}>Entertainment</option>
              <option value={'Health'}>Health</option>
              <option value={'Science'}>Science</option>
              <option value={'Sports'}>Sports</option>
            </NativeSelect>
          </FormControl>
        </Box>

        <Button className={classes.buttonSubmit} sx={{ bgcolor: grey[800] }} variant='contained' size='medium' type='submit' fullWidth>
          {blogData.id ? 'UPDATE' : 'SUBMIT'}
        </Button>
      </form>
    </Paper>
  );
};

export default BlogForm;
