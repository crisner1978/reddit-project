import { useEffect } from "react";
import { addView } from "./firebase";

export function usePostViewCount(postId) {
    useEffect(() => {
        if(process.env.NODE_ENV !== "production") {
            addView(postId)
        }
    }, [postId])
}
