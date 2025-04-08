import { Link, useParams } from 'react-router-dom'
import styles from './PostDetail.module.css'
import { useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import { getDoc } from 'firebase/firestore'
import { doc } from 'firebase/firestore'

export default function PostDetail() {
    const { id } = useParams()
    const [postData, setPostData] = useState({})

    useEffect(() => {
        async function fetchData() {
            try {
                const docRef = doc(db, 'joonggo_posts', id);
                const postDoc = await getDoc(docRef);
                const postData = postDoc.data();

                const userNicknameRef = doc(db, 'users-public', postData.sellerId);
                const userNicknameDoc = await getDoc(userNicknameRef);
                const nickname = userNicknameDoc.exists() ? userNicknameDoc.data().nickname : '사용자 알수없음';

                setPostData({
                    id: postDoc.id,
                    ...postData,
                    sellerNickname: nickname
                });
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [])

    console.log(postData)
    return <div className={styles.postDetailPage}>
        <div className={styles.postContainer}>
            <div className={styles.imgContainer}>
                <p className={styles.directory}><Link to='/'>홈</Link> {">"} <Link to='/joonggo'>중고마켓</Link> {">"} {postData.title}</p>
                <img src={postData.images?.[0]} alt="dd" className={styles.img} />
            </div>
            <div className={styles.textContainer}>
                <div className={styles.titleSection}>
                    <p className={styles.statusBadge}>판매중</p>
                    <h2>{postData.title}</h2>
                </div>
                <p>{postData?.createdAt?.toDate().toLocaleString()}</p>
                <p>{postData.sellerNickname}</p>
                <p className={styles.price}>${postData.price}</p>
                <p>{postData.description}</p>
            </div>
        </div>
    </div>
}