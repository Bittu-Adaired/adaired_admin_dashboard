"use client";
import UpdatePage from "@/Components/Pages/Services/UpdatePage";

interface SlugContextType {
  params: { slug: string };
}

const UpdateService = ({ params }: SlugContextType) => {
  return <UpdatePage slug={params.slug}/>;
};

export default UpdateService;
