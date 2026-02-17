import './App.css'
import { useContext, useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router'
import NavBar from './components/NavBar/Navbar.jsx'
import SignUpForm from './components/SignUpForm/SignUpForm.jsx'
import SignInForm from './components/SignInForm/SignInForm.jsx'
import Landing from './components/Landing/Landing.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Footer from "./components/Footer/Footer.jsx";

import ProfilePage from './components/ProfilePage/ProfilePage.jsx'
import ProfileForm from './components/ProfileForm/ProfileForm.jsx'
import SearchPage from './components/SearchPage/SearchPage.jsx'

import { UserContext } from './contexts/UserContext.jsx'

import * as postService from './services/postService.js'

import PostList from './components/PostList/PostList.jsx'
import PostDetails from './components/PostDetails/PostDetails.jsx'
import PostForm from './components/PostForm/PostForm.jsx'

const App = () => {
    const { user } = useContext(UserContext)
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const fetchAllPosts = async () => {
            const postsData = await postService.index()
            setPosts(postsData)
        }
        if (user) fetchAllPosts()
    }, [user])

    // checking current path for background image display
    const isLandingPage = location.pathname === '/' && !user;

    // set footer display rules
    const hideFooterPath = ['/sign-in', '/sign-up'];
    const showFooter = !hideFooterPath.includes(location.pathname);

    const handleAddPost = async (postFormData) => {
        const newPost = await postService.create(postFormData)
        setPosts([newPost, ...posts])
    }

    const handleDeletePost = async (postId) => {
        const deletedPost = await postService.deletePost(postId)
        const filteredPosts = posts.filter((post) => post.id !== deletedPost.id)
        setPosts(filteredPosts)
        navigate(-1)
    }

    const handleUpdatePost = async (postId, postFormData) => {
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
        <div className={isLandingPage ? 'no-bg' : 'app-bg-container'}>
            <NavBar />
            <main>
            <Routes>
                <Route path='/' element={user ? <Dashboard /> : <Landing />} />
                {user ? (
                    <>
                        {/* GLOBAL WALL re: postService */}
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
                        <Route path="/search" element={<SearchPage />} />
                        {/* USER PROFILE devspace page */}
                        <Route 
                            path="/users/:userId/profile" 
                            element={<ProfilePage />} 
                        />
                        {/* EDIT PROFILE devspace info */}
                        <Route
                            path='users/:userId/edit'
                            element={<ProfileForm />}
                        />
                        {/* TEST ROUTE profile view of other users */}
                        <Route path="/profiles/:userId" element={<ProfilePage />} />
                    </>
                ) : (
                    <>
                        <Route path='/sign-up' element={<SignUpForm />} />
                        <Route path='/sign-in' element={<SignInForm />} />
                    </>
                )}
            </Routes>
            </main>
            {showFooter && <Footer />}
        </div> 
        </>
    )
}

export default App
