"use client";
import { SearchTableButton } from "@/constant";
import axios from "axios";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody, Col, Container, Input, Label, Row } from "reactstrap";
import CustomBadge from "@/components/form_&_table/table/common/customBadge";
import ActionDataSource from "@/components/form_&_table/table/common/actionDataSource";
import api from "@/config/axiosConfig";


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
  createdAt: string;
};

const PostListContainer = () => {
  const [posts, setPosts] = useState<postType[]>([]);
  const [filterText, setFilterText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(true);
    try {
      const response = await api.get(`/blog/readBlog`);
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      const data: postType[] = response.data;

      // Sort posts by createdAt, newest first
      const sortedPosts = data.sort((a: postType, b: postType) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setPosts(sortedPosts);
    } catch (error) {
      console.error("Failed to fetch Posts:", error);
    } finally {
      setIsLoading(false);
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
      const response = await api.delete(`/blog/deleteBlog/${id}`);
      if (response.status !== 200) {
        console.error("Failed to delete item:", response.data);
        return;
      }
      await axios.post(
        `${process.env.NEXT_PUBLIC_WEB_URI}/api/revalidatePage`,
        { slug: `/blog` },
        { headers: { "Content-Type": "application/json" }, timeout: 5000 }
      );
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const duplicateFunction = async (id: string) => {
    try {
      const response = await api.post(`/blog/duplicateBlog/${id}`);
      if (response.status !== 201) {
        console.error("Failed to duplicate post:", response.data);
        return;
      }
      const newPost = response.data.newBlog;
      setPosts((prevPosts) => [...prevPosts, newPost]);
      await axios.post(
        `${process.env.NEXT_PUBLIC_WEB_URI}/api/revalidatePage`,
        { slug: `/blog` },
        { headers: { "Content-Type": "application/json" }, timeout: 5000 }
      );
    } catch (error) {
      console.error("Failed to duplicate post:", error);
    }
  };

  const HtmlColumn = useMemo(
    () => [
      {
        name: "S. No.",
        selector: (row: postType) => posts.indexOf(row) + 1,
        sortable: true,
        grow: 0.2,
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
            color={`${row.status !== "draft" ? "success" : "danger"}`}
            text={row.status}
            pill
          />
        ),
        sortable: true,
        grow: 0.2,
      },
      {
        name: "Action",
        cell: (row: postType) => (
          <ActionDataSource
            id={row._id}
            slug={row.slug}
            editUrl={`/blog/update_post`}
            viewUrl={`${process.env.NEXT_PUBLIC_WEB_URI}/blog/${row.slug}`}
            handleConfirmDelete={deleteFunction}
            duplicateFunction={duplicateFunction}
            setPosts={setPosts}
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
                data={filterText !== "" ? filteredItems : posts}
                columns={HtmlColumn}
                striped
                highlightOnHover
                pagination
                fixedHeader
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                pointerOnHover
                progressPending={isLoading}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PostListContainer;
