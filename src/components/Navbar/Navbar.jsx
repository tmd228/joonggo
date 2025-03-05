import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { auth } from '../../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';


export default function Navbar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [auth]);

    async function handleSignOut() {
        try {
            await signOut(auth)
        }catch (err) {
            console.log('로그아웃 실패')
        }
    }

    return (
        <div className={styles.navbar}>
            <Link className={styles.link} to="/"><h1>Logo</h1></Link>
            <ul className={styles.navLinks}>
                <li><Link to='/joonggo' className={styles.link}>중고마켓</Link></li>
                <li>{user ? <button onClick={handleSignOut}>로그아웃</button> : <Link to='/signIn' className={styles.link}>로그인</Link>}</li>
            </ul>
        </div>
    )
}
