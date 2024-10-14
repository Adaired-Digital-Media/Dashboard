"use client";
import {
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  TabContent,
  TabPane,
} from "reactstrap";
import { z } from "zod";
import axios from "axios";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";
import api from "@/config/axiosConfig";
import { useRouter } from "nextjs-toploader/app";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setNavId } from "@/redux/reducers/addPostSlice";
import { BlogCategoryTypes } from "@/types/blogCategoryType";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { FC, useEffect, useState, useCallback } from "react";
import SubmitButton from "@/components/pages/pageLayout/submitButton";
import CodeEditor from "@/components/form_&_table/form/inputs/codeEditor";

// Dynamically import components
const Editor = dynamic(
  () => import("@/components/form_&_table/form/inputs/textEditor")
);
const ImageSelector = dynamic(
  () => import("@/components/form_&_table/form/inputs/imageSelector")
);

const schema = z.object({
  metaTitle: z.string().min(3, {
    message: "Meta title is required",
  }),
  metaDescription: z.string().min(3, {
    message: "Meta description is required",
  }),
  canonicalLink: z.string().min(3, {
    message: "Canonical link is required",
  }),
  openGraphImage: z.string().optional(),
  robotsText: z
    .string()
    .includes("index", {
      message: "Robots text must include index/noindex",
    })
    .includes("follow", {
      message: "Robots text must include follow/nofollow",
    }),
  category: z.string().optional(),
  featuredImage: z.string().min(3, {
    message: "Post image is required",
  }),
  postTitle: z.string().min(3, {
    message: "Title is required",
  }),
  postDescription: z.string().min(3, {
    message: "Description is required",
  }),
  postExerpt: z.string().optional(),
  slug: z.string().optional(),
  tags: z.string().optional(),
  status: z.enum(["publish", "draft"]).or(z.literal("")),
  articleScript: z.string().optional(),
  headerScript: z.string().optional(),
  footerScript: z.string().optional(),
});

const PostBody: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { navId } = useAppSelector((state) => state.addPost);
  const [categories, setCategories] = useState<BlogCategoryTypes[]>([]);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      metaTitle: "",
      metaDescription: "",
      canonicalLink: "",
      openGraphImage: "",
      robotsText: "",
      category: "",
      featuredImage: "",
      postTitle: "",
      postDescription: "",
      postExerpt: "",
      slug: "",
      tags: "",
      status: "draft",
      articleScript: "",
      headerScript: "",
      footerScript: "",
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await api.get(`/blog/category/readCategories`);
        setCategories(result.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = useCallback(
    async (data: any) => {
      try {
        await api.post(`/blog/createBlog`, data);
        await axios.post(
          `${process.env.NEXT_PUBLIC_WEB_URI}/api/revalidatePage`,
          { slug: `/blog` },
          { headers: { "Content-Type": "application/json" }, timeout: 5000 }
        );
        router.push(`/blog/blog_list`);
        Swal.fire({
          title: "Blog created successfully",
          text: "Blog page will be revalidated shortly.",
          icon: "success",
          // confirmButtonText: "Okay",
          timer: 2000,
        });
      } catch (error) {
        console.error("Error submitting the form:", error);
        Swal.fire({
          title: "Error creating the blog",
          text: error?.response?.data?.message,
          icon: "error",
          confirmButtonText: "Okay",
        });
      }
    },
    [router]
  );

  const submitForm = useCallback(() => {
    handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit]);

  return (
    <>
      <Col xxl="9" xl="8" className="box-col-8 position-relative">
        <Form
          className="needs-validation main-custom-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TabContent activeTab={navId}>
            <TabPane tabId={"1"}>
              <FormGroup>
                <Label check>Category :</Label>
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <Input
                      type="select"
                      {...field}
                      className={`form-control ${
                        errors.category ? "is-invalid" : ""
                      }`}
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.categoryName}
                        </option>
                      ))}
                    </Input>
                  )}
                />
              </FormGroup>

              <FormGroup>
                <Label check>Title :</Label>
                <Controller
                  control={control}
                  name="postTitle"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Title"
                      {...field}
                      className={errors.postTitle ? "is-invalid" : ""}
                    />
                  )}
                />
              </FormGroup>

              <FormGroup>
                <Label check>Description :</Label>
                <Controller
                  control={control}
                  name="postDescription"
                  render={({ field }) => (
                    <Editor value={field.value} onBlurEditor={field.onChange} />
                  )}
                />
              </FormGroup>

              <FormGroup>
                <Label check>Featured Image:</Label>
                <Controller
                  control={control}
                  name="featuredImage"
                  render={({ field }) => (
                    <ImageSelector
                      onImageSelect={(e) => {
                        setValue("featuredImage", e);
                      }}
                    />
                  )}
                />
              </FormGroup>

              <FormGroup>
                <Label check>Exerpt :</Label>
                <Controller
                  control={control}
                  name="postExerpt"
                  render={({ field }) => (
                    <Editor value={field.value} onBlurEditor={field.onChange} />
                  )}
                />
              </FormGroup>
            </TabPane>
            <TabPane tabId={"2"}>
              <FormGroup>
                <Label check>Meta Title :</Label>
                <Controller
                  control={control}
                  name="metaTitle"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Meta Title"
                      {...field}
                      className={errors.metaTitle ? "is-invalid" : ""}
                    />
                  )}
                />
              </FormGroup>

              <FormGroup>
                <Label check>Meta Description :</Label>
                <Controller
                  control={control}
                  name="metaDescription"
                  render={({ field }) => (
                    <Input
                      type="textarea"
                      rows={4}
                      placeholder="Meta Description"
                      {...field}
                      className={errors.metaTitle ? "is-invalid" : ""}
                    />
                  )}
                />
              </FormGroup>

              <FormGroup>
                <Label check>Slug :</Label>
                <Controller
                  control={control}
                  name="slug"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Slug"
                      {...field}
                      className={errors.slug ? "is-invalid" : ""}
                    />
                  )}
                />
              </FormGroup>

              <FormGroup>
                <Label check>Canonical Link:</Label>
                <Controller
                  control={control}
                  name="canonicalLink"
                  render={({ field }) => (
                    <InputGroup>
                      <InputGroupText id="basic-addon3">
                        {"https://adaired.com/blog/"}
                      </InputGroupText>
                      <Input
                        type="text"
                        placeholder="Canonical Link"
                        {...field}
                        className={errors.canonicalLink ? "is-invalid" : ""}
                      />
                    </InputGroup>
                  )}
                />
                {errors.canonicalLink && (
                  <span className="text-danger">
                    {errors.canonicalLink.message}
                  </span>
                )}
              </FormGroup>

              <FormGroup>
                <Label check>Open Graph Image:</Label>
                <Controller
                  control={control}
                  name="openGraphImage"
                  render={({ field }) => (
                    <ImageSelector
                      onImageSelect={(e) => {
                        setValue("openGraphImage", e);
                      }}
                    />
                  )}
                />
              </FormGroup>

              <FormGroup>
                <Label check>Tags :</Label>
                <Controller
                  control={control}
                  name="tags"
                  render={({ field }) => (
                    <Editor value={field.value} onBlurEditor={field.onChange} />
                  )}
                />
              </FormGroup>

              <FormGroup>
                <Label check>Robots Text (Index, Follow) :</Label>
                <Controller
                  control={control}
                  name="robotsText"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Write in in this format i.e. index, follow"
                      {...field}
                      className={errors.robotsText ? "is-invalid" : ""}
                    />
                  )}
                />
                {errors.robotsText && (
                  <span className="text-danger">
                    {errors.robotsText.message}
                  </span>
                )}
              </FormGroup>

              <FormGroup>
                <Label check>Status :</Label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Input
                      type="select"
                      {...field}
                      className={`form-control ${
                        errors.status ? "is-invalid" : ""
                      }`}
                    >
                      <option value={""} disabled>
                        Select status
                      </option>
                      <option value="draft">Draft</option>
                      <option value="publish">Publish</option>
                    </Input>
                  )}
                />
              </FormGroup>

              <FormGroup>
                <Label check>Body script : </Label>
                <Controller
                  control={control}
                  name="articleScript"
                  render={({ field }) => (
                    <CodeEditor
                      value={field.value}
                      onChange={(newCode) => {
                        field.onChange(newCode);
                      }}
                    />
                  )}
                />
              </FormGroup>

              <div className="flex items-center justify-between gap-3">
                <FormGroup className="w-full">
                  <Label check>Header script : </Label>
                  <Controller
                    control={control}
                    name="headerScript"
                    render={({ field }) => (
                      <CodeEditor
                        value={field.value}
                        onChange={(newCode) => {
                          field.onChange(newCode);
                        }}
                      />
                    )}
                  />
                </FormGroup>
                <FormGroup className="w-full">
                  <Label check>Footer script : </Label>
                  <Controller
                    control={control}
                    name="footerScript"
                    render={({ field }) => (
                      <CodeEditor
                        value={field.value}
                        onChange={(newCode) => {
                          field.onChange(newCode);
                        }}
                      />
                    )}
                  />
                </FormGroup>
              </div>
            </TabPane>
          </TabContent>
        </Form>
      </Col>
      <SubmitButton
        submitForm={submitForm}
        navId={navId}
        setNavId={(id) => dispatch(setNavId(id))}
      />
    </>
  );
};

export default React.memo(PostBody);
