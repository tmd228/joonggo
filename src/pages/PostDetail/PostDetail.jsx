import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './PostDetail.module.css'
import { useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import { getDoc } from 'firebase/firestore'
import { doc } from 'firebase/firestore'
import { auth } from '../../config/firebase'

export default function PostDetail() {
    const { id } = useParams();
    const [postData, setPostData] = useState({});

    const navigate = useNavigate()

    const currentUser = auth.currentUser;
    const currentUserId = currentUser?.uid;

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

    const handleEdit = () => {
        navigate(`/edit/${postData.id}`)
    }
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
                {/* 본인 게시물에서 삭제버튼 + 수정버튼 */}
                {postData.sellerId === currentUserId && (
                    <div>
                        <button onClick={handleEdit}>수정하기</button>
                        <button>삭제하기</button>
                    </div>
                )}

                <p className={styles.description}>{postData.description}</p>
                <div className={styles.buttons}>
                    <button className={styles.wishlist}>♡ 찜하기</button>
                    <button className={styles.chatButton}>채팅하기</button>
                </div>
            </div>
        </div>
    </div>
}