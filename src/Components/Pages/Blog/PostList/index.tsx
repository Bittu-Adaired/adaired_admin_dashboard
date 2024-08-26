"use client"
import { SearchTableButton } from "@/Constant";
import axios from "axios";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody, Col, Container, Input, Label, Row } from "reactstrap";
import CustomBadge from "@/Components/Form&Table/Table/CommonComponent/CustomBadge";
import ActionDataSource from "@/Components/Form&Table/Table/CommonComponent/ActionDataSource";

export type postType = {
  _id: string;
  metaTitle: string;
  metaDescription: string;
  canonicalLink: string;
  openGraphImage?: string;
  robotsText?: string;
  category: string;
  featuredImage: string;
  postTitle: string;
  postDescription: string;
  slug: string;
  tags: string;
  status: string;
};

const PostListContainer = () => {
  const [posts, setPosts] = useState<postType[]>([]);
  const [filterText, setFilterText] = useState("");

  const filteredItems = useMemo(() => {
    return posts.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }, [posts, filterText]);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/blog/readBlog`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch Posts:", error);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <div className="dataTables_filter d-flex align-items-center">
        <Label className="me-2">{SearchTableButton}:</Label>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFilterText(e.target.value)
          }
          type="search"
          value={filterText}
        />
      </div>
    );
  }, [filterText]);

  const deleteFunction = async (id: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/blog/deleteBlog/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status !== 200) {
        console.error("Failed to delete item:", response.data);
        return;
      }

      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const HtmlColumn = useMemo(
    () => [
      {
        name: "S. No.",
        selector: (row: postType) => posts.indexOf(row) + 1,
        sortable: true,
      },
      {
        name: "Post Title",
        selector: (row: postType) => row.postTitle,
        sortable: true,
        grow: 2,
      },
      {
        name: "Slug",
        selector: (row: postType) => row.slug,
        sortable: true,
      },
      {
        name: "Status",
        cell: (row: postType) => (
          <CustomBadge
            color={`${row.status !== "active" ? "success" : "danger"}`}
            text={row.status}
            pill
          />
        ),
        sortable: true,
      },
      {
        name: "Action",
        cell: (row: postType) => (
          <ActionDataSource
            id={row._id}
            slug={row.slug}
            editUrl={`/blog/update_post`}
            viewUrl=""
            toastMessage="Are you sure, you wanna delete this?"
            toastName="Delete"
            handleConfirmDelete={deleteFunction}
          />
        ),
        sortable: true,
      },
    ],
    [posts]
  );

  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <DataTable
                className="theme-scrollbar"
                title="Post List"
                columns={HtmlColumn}
                data={filteredItems}
                subHeaderComponent={subHeaderComponentMemo}
                pagination
                fixedHeader
                striped
                highlightOnHover
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PostListContainer;
