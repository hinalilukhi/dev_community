import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { getPost } from '../../actions/post'
import { connect } from 'react-redux'
import PostItem from '../posts/PostItem'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem';

const Post = ({match, post: { post, loading }, getPost}) => {
    useEffect(()=>{
        getPost(match.params.id);
    },[getPost]);
  return (
    <div className='container'>
        <Link to="/posts" className='btn'>Back To Post</Link>
        { post && (<PostItem post={post} showActions={false} ></PostItem>) }
        {post && (<CommentForm postId={post._id}/>)}
       
        {  post && post.comments && (
            <div className='comments'>
            {
                post.comments.map(comment=>(
                    <CommentItem key={comment._id} comment={comment} postId={post._id} ></CommentItem>
                ))
            }
            </div>
        ) }
        
    </div>
  )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPost })(Post)