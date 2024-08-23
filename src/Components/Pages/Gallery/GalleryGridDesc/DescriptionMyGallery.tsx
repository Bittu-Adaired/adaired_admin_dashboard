"use client";
import Image from "next/image";
import Link from "next/link";
import { Button, Col, Container, Row } from "reactstrap";
import { fetchImages, deleteImage } from "@/Redux/Reducers/ImageFetchSlice";
import { Gallery, Item } from "react-photoswipe-gallery";
import { RootState } from "@/Redux/Store";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { useEffect } from "react";
import { ImageType } from "@/Redux/Reducers/ImageFetchSlice";

export const DescriptionMyGallery = () => {
  const dispatch = useAppDispatch();
  const { images, isLoading, deleteLoading, error } = useAppSelector(
    (state: RootState) => state.imageFetch
  );

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  const handleDelete = (fileName: string) => {
    dispatch(deleteImage(fileName));
  };

  if (isLoading) {
    return (
      <Gallery withCaption>
        <h1>Fetching images</h1>
      </Gallery>
    );
  }

  if (error) {
    return (
      <Gallery withCaption>
        <h1>Error Loading Images</h1>
      </Gallery>
    );
  }

  return (
    <Gallery withCaption>
      {images && images.length > 0 ? (
        <>
          {images.map((item: ImageType) => (
            <figure
              key={item.asset_id}
              className="col-xl-3 col-md-4 col-sm-6 m-0"
              itemProp="caption description"
            >
              <Item
                original={item.secure_url}
                width="1500"
                height="850"
                caption={item.filename}
              >
                {({ ref, open }) => (
                  <Link href="" passHref>
                    <Image
                      className="border-bottom-0 p-2 rounded-0 rounded-top-1"
                      ref={
                        ref as unknown as React.MutableRefObject<HTMLImageElement>
                      }
                      src={item.secure_url}
                      alt={item.filename}
                      onClick={open}
                      width={300}
                      height={200}
                    />
                    <div className="caption common-space border-top-0 p-2 pt-0">
                      <h4>{item.filename}</h4>
                      <Button
                        className="btn-pill btn-air-danger btn btn-danger"
                        onClick={() => handleDelete(item.public_id)}
                        type="button"
                      >
                        <i className="fa fa-trash-o"></i>
                      </Button>
                    </div>
                  </Link>
                )}
              </Item>
            </figure>
          ))}
        </>
      ) : (
        <Container>
          <Row>
            <Col sm="12">
              <div className="error-heading">
                <h2 className="font-danger">No Images Found</h2>
              </div>
            </Col>
            <Col sm="12">
              <p className="sub-content">
                You have not uploaded any images yet. Click the button above to
                upload images.
              </p>
            </Col>
          </Row>
        </Container>
      )}
    </Gallery>
  );
};
