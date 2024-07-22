import { useState } from "react";
import { AppBar } from "../components/AppBar"
import styles from './PublishBlog.module.css'
import { CiCirclePlus } from "react-icons/ci";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

export const PublishBlog = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleUploadBlog = async () => {
        if(title.length < 5) {
            alert('Minimum title length is 5')
            return;
        }
        if(content.length < 10) {
            alert('Minimum content length is 10')
            return;
        }
        setLoading(true);

        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/post`, {
                title,
                content
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            navigate(`/blogs/${res.data.id}`);
        } catch (error) {
            console.log("Unable to upload blog: ", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <AppBar />
            <div className={styles.mainContainer}>
                <div className={styles.firstInputConatiner}>
                    <CiCirclePlus className={styles.plusIcon} />
                    <input onChange={(e) => setTitle(e.target.value)} type="text" name="title" className={styles.inputTitle} placeholder="Title" />
                </div>
                <textarea onChange={(e) => setContent(e.target.value)} placeholder="Tell your story..." className={styles.textArea}></textarea>
                <div className={styles.btnLoader}>
                    {
                        loading ? (
                            <RotatingLines
                                visible={true}
                                width="40"
                                strokeColor="rgb(78, 78, 255)"
                                strokeWidth="5"
                                animationDuration="0.75"
                                ariaLabel="rotating-lines-loading"
                            />
                        ) : (
                            <button onClick={handleUploadBlog} className={styles.btn} >Upload blog</button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}