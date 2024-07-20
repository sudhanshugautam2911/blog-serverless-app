import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface Blog {
    id: number;
    title: string;
    content: string;
    author: {
        name: string;
    }
}


export const useBlog = ({ id }: { id: number }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog | null>(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/v1/post/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("token") || "",
                    },
                });
                setBlog(res.data.blog);
            } catch (err) {
                console.error("Error while fetching single blog: ", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    return {
        loading,
        blog,
    };
};

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([])

    useEffect(() => {
        const fetchAllBlogs = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/v1/post/bulk`, {
                    headers: {
                        Authorization: localStorage.getItem("token") || "",
                    }
                })
                setBlogs(res.data.blogs);
            }
            catch (err) {
                console.error('Error fetching data:', err);
            }finally {
                setLoading(false);
            }
        }
        fetchAllBlogs();
    }, [])

    return (
        { loading, blogs }
    )

}