"use client";

// React Imports
import React, { useEffect, useMemo, useState, useCallback } from "react";

// Constants Imports
import { SearchTableButton } from "@/constant";

// Axios and Axios Instance Imports
import axios from "axios";
import api from "@/config/axiosConfig";

// Data Table Imports
import DataTable from "react-data-table-component";

// Reactstrap Imports
import { Card, CardBody, Col, Container, Input, Label, Row } from "reactstrap";

// Custom Components
import CustomBadge from "@/components/form_&_table/table/common/customBadge";
import ActionDataSource from "@/components/form_&_table/table/common/actionDataSource";

// Types Imports
import type { BlogType } from "@/types/BlogType";
import FilterHeader from "./filterHeader";
import CollapseFilterData from "./collapseFilterData";

const PostListContainer = () => {
  // States
  const [posts, setPosts] = useState<BlogType[]>([]);
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
      const response = await api.get(`/blog/readBlog?limit=500`);
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      const data: BlogType[] = response.data;

      // Sort posts by createdAt, newest first
      const sortedPosts = data.sort((a: BlogType, b: BlogType) => {
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
        selector: (row: BlogType) => posts.indexOf(row) + 1,
        sortable: true,
        grow: 0.2,
      },
      {
        name: "Post Title",
        selector: (row: BlogType) => row.postTitle,
        sortable: true,
        grow: 2,
      },
      {
        name: "Slug",
        selector: (row: BlogType) => row.slug,
        sortable: true,
      },
      {
        name: "Status",
        cell: (row: BlogType) => (
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
        cell: (row: BlogType) => (
          <ActionDataSource
            id={row._id}
            slug={row.slug}
            editUrl={`/pages/blog/update_post`}
            viewUrl={`${process.env.NEXT_PUBLIC_WEB_URI}/blog/${row.slug}`}
            handleConfirmDelete={deleteFunction}
            duplicateFunction={duplicateFunction}
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
              <div className="list-product-header">
                <FilterHeader />
                <CollapseFilterData />
              </div>
              <div className="list-product">
                <div className="table-responsive">
                  <DataTable
                    className="theme-scrollbar"
                    data={filterText !== "" ? filteredItems : posts}
                    columns={HtmlColumn}
                    striped
                    highlightOnHover
                    pagination
                    fixedHeader
                    subHeader
                    selectableRows
                    subHeaderComponent={subHeaderComponentMemo}
                    pointerOnHover
                    progressPending={isLoading}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PostListContainer;
