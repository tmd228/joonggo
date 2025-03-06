import styles from './Home.module.css'
import { auth } from '../../config/firebase'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    
    //current user 콘솔에 출력
    const [currentUser, setCurrentUser] = useState(null)
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            console.log(user)
        })

        return () => unsubscribe()
    }, [])

    return (
        <div>
            <div>Home</div>
            <Link className={styles.newPostBtn} to={currentUser ? '/newPost' : '/signIn'}>게시글작성</Link>
        </div>
    )
}
