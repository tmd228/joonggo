import styles from './Home.module.css'
import { auth } from '../../config/firebase'
import { useEffect } from 'react'

export default function Home() {
    const currentUser = auth.currentUser

    useEffect(() => {
        console.log(currentUser)
    }, [])

    
    return (
        <div>Home</div>
    )
}
