"use client"
import { createContext, useState  } from "react";
import UpdatePage from "@/Components/Pages/Services/UpdatePage";

// Define the context to expect an object with a slug property
interface SlugContextType {
  slug: string;
}

export const SlugContext = createContext<SlugContextType | undefined>(undefined);

interface AddServiceProps {
  params: { slug: string };
}

const AddService = ({ params }: AddServiceProps) => {
  const [slug, setSlug] = useState(params.slug);

  return (
    <SlugContext.Provider value={{ slug }}>
      <UpdatePage />
    </SlugContext.Provider>
  );
};

export default AddService;
