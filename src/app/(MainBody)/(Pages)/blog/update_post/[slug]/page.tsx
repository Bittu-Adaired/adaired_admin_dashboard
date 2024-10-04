"use client";
import UpdatePostContainer from "@/Components/Pages/Blog/UpdatePost";

interface SlugContextType {
  params: { slug: string };
}

const AddPost = ({ params }: SlugContextType) => {
  return <UpdatePostContainer slug={params.slug} />;
};

export default AddPost;
