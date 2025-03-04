import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'


export default function Navbar() {
  return (
    <div className={styles.navbar}>
        <Link className={styles.link} to="/"><h1>Logo</h1></Link>
        <ul className={styles.navLinks}>
            <li><Link to='/joonggo' className={styles.link}>중고마켓</Link></li>
            <li></li>
        </ul>
    </div>
  )
}
