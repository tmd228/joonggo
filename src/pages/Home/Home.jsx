import styles from './Home.module.css'
import { auth, db } from '../../config/firebase'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

export default function Home() {

    //current user 콘솔에 출력 @@파이어베이스 읽기를 많이씀 나중에 삭제해야됨
    const [currentUser, setCurrentUser] = useState(null)
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            console.log(user);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        async function getPostsFromFirebase() {
            const collectionRef = collection(db, "joonggo_posts");
            const q = query(collectionRef, orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const postList = querySnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
            setPosts(postList)
        }
        getPostsFromFirebase()
    }, [])


    return (
        <div>
            <Link className={styles.newPostBtn} to={currentUser ? '/newPost' : '/signIn'}>게시글작성</Link>
            <div className={styles.postList}>
                {posts.map(post => {
                    return <div key={post.id} className={styles.post} onClick={() => navigate(`/post/${post.id}`)}>
                        <img
                            src={post.images?.[0] || "https://via.placeholder.com/150"}
                            alt={post.title}
                            className={styles.postImage} />
                        <div className={styles.postTexts}>
                            <h3 className={styles.postTitle}>{post.title}</h3>
                            <p className={styles.postPrice}>${post.price}</p>
                            <p className={styles.postSellerId}>{post.sellerId}</p>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}
