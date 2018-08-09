import React, { Component } from 'react';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [], 
        selectedPostId: null,
        error: null
    }

    componentDidMount () {
        axios.get('/posts')
            .then((response) => {
                const posts = response.data.slice(0,4);
                const updataedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'calvin'
                    }
                })
                this.setState({posts: updataedPosts})
            })
            .catch(error => {
                this.setState({error: error});
                console.log(Error)
            })
    }

    postSelectedHandler = (id) => {
        this.setState({ selectedPostId: id })
    }

    render () {
        let posts = <p style={{textAlign: 'center'}} > Something Went Wrong!</p>
        if( !this.state.error ) {
            posts = this.state.posts.map(post => {
                return <Post 
                    key={post.id} 
                    title={post.title} 
                    author={post.author} 
                    clicked={ () => this.postSelectedHandler(post.id) } />
            })
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;