import styles from './Home.module.css'
import { auth } from '../../config/firebase'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

export default function Home() {
    
    //current user 콘솔에 출력 @@파이어베이스 읽기를 많이씀 나중에 삭제해야됨
    const [currentUser, setCurrentUser] = useState(null)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            console.log(user);
        });
    
        return () => unsubscribe();
    }, []);


    return (
        <div>
            <div>Home</div>
            <Link className={styles.newPostBtn} to={currentUser ? '/newPost' : '/signIn'}>게시글작성</Link>
        </div>
    )
}
