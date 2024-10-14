"use client";
import {
  Col,
  Form,
  FormGroup,
  TabContent,
  TabPane,
  Label,
  Input,
  InputGroup,
  InputGroupText,
  Row,
} from "reactstrap";
import { z } from "zod";
import axios from "axios";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import api from "@/config/axiosConfig";
import { RootState } from "@/redux/store";
import { useRouter } from "nextjs-toploader/app";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ServiceFormTypes } from "@/types/serviceType";
import { setNavId } from "@/redux/reducers/addServiceSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ImageWithRadioDataList } from "@/data/Form&Table/Form";
import React, { FC, useEffect, useState, useCallback } from "react";
import SubmitButton from "@/components/pages/pageLayout/submitButton";
import ComponentSelectButton from "@/components/componentSelector";
import ImageSelector from "@/components/form_&_table/form/inputs/imageSelector";
import RenderSelectedInputFields from "@/components/form_&_table/form/templateRenderer";
import CodeEditor from "@/components/form_&_table/form/inputs/codeEditor";
import {
  setSelectedComponents,
  setBodyData,
} from "@/redux/reducers/floatingWidgetSlice";

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
  focusKeyword: z.string().min(3, {
    message: "Focus keyword is required",
  }),
  serviceName: z.string().min(3, {
    message: "Service Name is required",
  }),
  slug: z.string().min(3, {
    message: "Slug is required",
  }),
  colorScheme: z.string().min(3, {
    message: "Color Scheme is required",
  }),
  parentService: z.string().optional(),
  status: z.string().min(3, {
    message: "Please select the status of the page!",
  }),
  bodyScript: z.string().optional(),
  headerScript: z.string().optional(),
  footerScript: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const PageBody: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { navId } = useAppSelector((state) => state.addService);
  const [services, setServices] = useState<ServiceFormTypes[]>([]);

  const selectedComponents = useAppSelector(
    (state: RootState) => state.floatingWidget.selectedComponents
  );
  const bodyData = useAppSelector(
    (state: RootState) => state.floatingWidget.bodyData
  );

  const fetchServices = async () => {
    try {
      const result = await api.get(`/service/getServices`);
      setServices(result.data);
    } catch (error) {
      console.error("Error fetching services : ", error);
      Swal.fire({
        icon: "error",
        title: "Error fetching services",
        text: "Please try again later.",
      });
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      metaTitle: "",
      metaDescription: "",
      canonicalLink: "",
      openGraphImage: "",
      robotsText: "",
      focusKeyword: "",
      serviceName: "",
      slug: "",
      colorScheme: "",
      parentService: undefined,
      status: "",
      bodyScript: "",
      headerScript: "",
      footerScript: "",
    },
  });

  const onSubmit = useCallback(
    async (data: FormData) => {
      const formData = { ...data, bodyData: bodyData };
      try {
        await api.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/service/createService`,
          formData
        );
        await axios.post(
          `${process.env.NEXT_PUBLIC_WEB_URI}/api/revalidatePage`,
          {
            slug: `/services`,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            timeout: 5000,
          }
        );
        router.push("/services/service_list");
        Swal.fire({
          icon: "success",
          title: "Service created successfully",
          text: "Page will be revalidated shortly.",
          timer: 2000,
        });
      } catch (error) {
        console.log("Error : ", error);
        Swal.fire({
          icon: "error",
          title: "Error creating service",
          text: error?.response?.data?.message,
          confirmButtonText: "Okay",
        });
      }
    },
    [bodyData, router]
  );

  const submitForm = useCallback(() => {
    handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit]);

  const handleComponentSelect = (componentName: string) => {
    const label = ImageWithRadioDataList.filter(
      (item) => item.componentName === componentName
    );
    const newComponent = {
      id: `${componentName}-` + uuidv4().substr(0, 4),
      componentName,
      label: label[0].label,
      body: {},
    };
    const newSelectedComponents = [...selectedComponents, newComponent];
    const newBodyData = [...bodyData, newComponent];

    // Dispatch to Redux store
    dispatch(setSelectedComponents(newSelectedComponents));
    dispatch(setBodyData(newBodyData));
  };

  return (
    <>
      <Col xxl="9" xl="8" className="box-col-8 position-relative">
        <Form
          className="need-validation main-custom-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TabContent activeTab={navId}>
            <TabPane tabId={"1"}>
              <RenderSelectedInputFields
                selectedComponents={selectedComponents}
                setSelectedComponents={(components) =>
                  dispatch(setSelectedComponents(components))
                }
                setBodyData={(data) => dispatch(setBodyData(data))}
                bodyData={bodyData}
              />
              {/* <Col className="select-component-buttons">
                <ComponentSelectButton selectedItem={handleComponentSelect} />
              </Col> */}
            </TabPane>
            <TabPane tabId={"2"}>
              <FormGroup>
                <Label check>Service name : </Label>
                <Controller
                  control={control}
                  name="serviceName"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder={""}
                      {...field}
                      className={errors.serviceName ? "is-invalid" : ""}
                    />
                  )}
                />
                {errors.serviceName && (
                  <span className="text-danger">
                    {errors.serviceName.message}
                  </span>
                )}
              </FormGroup>

              <FormGroup>
                <Label check>Parent service : </Label>
                <Controller
                  control={control}
                  name="parentService"
                  render={({ field }) => (
                    <Input
                      type="select"
                      {...field}
                      className={`form-control ${
                        errors.parentService ? "is-invalid" : ""
                      }`}
                    >
                      <option value="">Select Parent Service</option>
                      {services.map((service) => (
                        <option key={service._id} value={service._id}>
                          {service.serviceName}
                        </option>
                      ))}
                    </Input>
                  )}
                />
                {errors.parentService && (
                  <span className="text-danger">
                    {errors.parentService.message}
                  </span>
                )}
              </FormGroup>

              <FormGroup>
                <Label check>Slug : </Label>
                <Controller
                  control={control}
                  name="slug"
                  render={({ field }) => (
                    <InputGroup>
                      <InputGroupText id="basic-addon3">
                        {"https://www.adaired.com/services/"}
                      </InputGroupText>
                      <Input
                        type="text"
                        placeholder={""}
                        {...field}
                        className={errors.slug ? "is-invalid" : ""}
                      />
                    </InputGroup>
                  )}
                />
                {errors.slug && (
                  <span className="text-danger">{errors.slug.message}</span>
                )}
              </FormGroup>

              <FormGroup>
                <Label check>Meta title : </Label>
                <Controller
                  control={control}
                  name="metaTitle"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder={""}
                      {...field}
                      className={errors.metaTitle ? "is-invalid" : ""}
                    />
                  )}
                />
                {errors.metaTitle && (
                  <span className="text-danger">
                    {errors.metaTitle.message}
                  </span>
                )}
              </FormGroup>

              <FormGroup>
                <Label check>Meta description :</Label>
                <Controller
                  control={control}
                  name="metaDescription"
                  render={({ field }) => (
                    <Input
                      type="textarea"
                      rows={4}
                      placeholder={""}
                      {...field}
                      className={errors.metaDescription ? "is-invalid" : ""}
                    />
                  )}
                />
                {errors.metaDescription && (
                  <span className="text-danger">
                    {errors.metaDescription.message}
                  </span>
                )}
              </FormGroup>

              <FormGroup>
                <Label check>Canonical link :</Label>
                <Controller
                  control={control}
                  name="canonicalLink"
                  render={({ field }) => (
                    <InputGroup>
                      <InputGroupText id="basic-addon3">
                        {"https://www.adaired.com/services/"}
                      </InputGroupText>
                      <Input
                        type="text"
                        placeholder={""}
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
                <Label check>Open graph image :</Label>
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
                <Label check>
                  Robots text : (Seperate using comma e.g. index,follow)
                </Label>
                <Controller
                  control={control}
                  name="robotsText"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder={""}
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
                <Label check>Focus Keyword : </Label>
                <Controller
                  control={control}
                  name="focusKeyword"
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder={""}
                      {...field}
                      className={errors.focusKeyword ? "is-invalid" : ""}
                    />
                  )}
                />
                {errors.focusKeyword && (
                  <span className="text-danger">
                    {errors.focusKeyword.message}
                  </span>
                )}
              </FormGroup>

              <FormGroup>
                <Label check>Color Scheme : </Label>

                <Controller
                  control={control}
                  name="colorScheme"
                  render={({ field }) => (
                    <Input
                      type="color"
                      {...field}
                      className={`${errors.colorScheme ? "is-invalid" : ""} `}
                    />
                  )}
                />

                {!errors.colorScheme && (
                  <small>
                    Use hex color codes (e.g. #ffffff, #000000). Default:
                    #f8f8f8
                  </small>
                )}

                {errors.colorScheme && (
                  <span className="text-danger">
                    {errors.colorScheme.message}
                  </span>
                )}
              </FormGroup>

              <FormGroup>
                <Label check>Status : </Label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Input
                      type="select"
                      {...field}
                      className={`form-control ${
                        errors.focusKeyword ? "is-invalid" : ""
                      }`}
                    >
                      <option value="">Select Page Status</option>
                      <option value="publish">Publish</option>
                      <option value="draft">Draft</option>
                    </Input>
                  )}
                />
                {errors.status && (
                  <span className="text-danger">{errors.status.message}</span>
                )}
              </FormGroup>

              <FormGroup>
                <Label check>Body script : </Label>
                <Controller
                  control={control}
                  name="bodyScript"
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
        <Row>
          <ComponentSelectButton selectedItem={handleComponentSelect} />
        </Row>
      </Col>

      <SubmitButton
        submitForm={submitForm}
        navId={navId}
        setNavId={(id) => dispatch(setNavId(id))}
      />
    </>
  );
};

export default React.memo(PageBody);
