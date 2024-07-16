export const findImage = async (name: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/multer/getImageByPublicId/${name}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.data.secure_url;
};
