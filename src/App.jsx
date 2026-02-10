import './App.css'
import { useContext, useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router'
import NavBar from './components/NavBar/Navbar.jsx'
import SignUpForm from './components/SignUpForm/SignUpForm.jsx'
import SignInForm from './components/SignInForm/SignInForm.jsx'
import Landing from './components/Landing/Landing.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import { UserContext } from './contexts/UserContext.jsx'

import * as postService from './services/postService.js'

import PostList from './components/PostList/PostList.jsx'
import PostDetails from './components/PostDetails/PostDetails.jsx'
import PostForm from './components/PostForm/PostForm.jsx'

const App = () => {
    const { user } = useContext(UserContext)
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    console.log(posts)

    useEffect(() => {
        const fetchAllPosts = async () => {
            const postsData = await postService.index()
            console.log("Data from server:", postsData)
            setPosts(postsData)
        }
        if (user) fetchAllPosts()
    }, [user])

    const handleAddPost = async (postFormData) => {
        const newPost = await postService.create(postFormData)
        setPosts([newPost, ...posts])
        navigate('/posts')
    }

    const handleDeletePost = async (postId) => {
        const deletedPost = await postService.deletePost(postId)
        const filteredPosts = posts.filter((post) => post.id !== deletedPost.id)
        setPosts(filteredPosts)
        navigate('/posts')
    }

    const handleUpdatePost = async (postId, postFormData) => {
        console.log(postId, postFormData)
        const updatedPost = await postService.updatePost(postId, postFormData)
        setPosts(
            posts.map((post) =>
                post.id === updatedPost.id ? updatedPost : post,
            ),
        )
        navigate(`/posts/${postId}`)
    }
    
    return (
        <>
            <NavBar />
            <Routes>
                <Route path='/' element={user ? <Dashboard /> : <Landing />} />
                {user ? (
                    <>
                        <Route
                            path='/posts'
                            element={<PostList posts={posts} />}
                        />
                        <Route
                            path='/posts/:postId'
                            element={
                                <PostDetails
                                    handleDeletePost={handleDeletePost}
                                />
                            }
                        />
                        <Route
                            path='/posts/new'
                            element={<PostForm handleAddPost={handleAddPost} />}
                        />
                        <Route
                            path='/posts/:postId/edit'
                            element={
                                <PostForm handleUpdatePost={handleUpdatePost} />
                            }
                        />
                    </>
                ) : (
                    <>
                        <Route path='/sign-up' element={<SignUpForm />} />
                        <Route path='/sign-in' element={<SignInForm />} />
                    </>
                )}
            </Routes>
        </>
    )
}

export default App
