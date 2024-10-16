"use client";
import { SearchTableButton } from "@/constant";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody, Col, Container, Input, Label, Row } from "reactstrap";
import { ServiceFormTypes } from "@/types/serviceType";
import ActionDataSource from "@/components/form_&_table/table/common/actionDataSource";
import CustomBadge from "@/components/form_&_table/table/common/customBadge";
import api from "@/config/axiosConfig";

const ProductListContainer = () => {
  const [services, setServices] = useState<ServiceFormTypes[]>([]);
  const [filterText, setFilterText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const filteredItems = useMemo(() => {
    return services.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(filterText.toLowerCase())
      )
    );
  }, [services, filterText]);

  const fetchServices = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/service/getServices`);
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      const data = await response.data;
      setServices(data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

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
      const response = await api.delete(`/service/deleteService/${id}`);
      if (response.status !== 200) {
        console.error("Failed to delete item:", response.data);
        return;
      }

      setServices(services.filter((service) => service._id !== id));
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const HtmlColumn = useMemo(
    () => [
      {
        name: "S. No.",
        selector: (row: ServiceFormTypes) => services.indexOf(row) + 1,
        sortable: true,
        grow: 0.2,
      },
      {
        name: "Service Name",
        selector: (row: ServiceFormTypes) => row.serviceName,
        sortable: true,
        grow: 2,
      },
      {
        name: "Slug",
        selector: (row: ServiceFormTypes) => row.slug,
        sortable: true,
      },
      {
        name: "Status",
        cell: (row: ServiceFormTypes) => (
          <CustomBadge
            color={`${row.status !== "publish" ? "danger" : "success"}`}
            text={row.status}
            pill
          />
        ),
        sortable: true,
        grow: 0.2,
      },
      {
        name: "Action",
        cell: (row: ServiceFormTypes) => (
          <ActionDataSource
            id={row._id}
            slug={row.slug}
            editUrl={`/pages/services/update_service/`}
            viewUrl={`${process.env.NEXT_PUBLIC_WEB_URI}/services/${row.slug}`}
            handleConfirmDelete={deleteFunction}
            duplicateFunction={deleteFunction}
          />
        ),
        sortable: true,
      },
    ],
    [services]
  );

  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <div className="list-product-header">
                {/* <ProductListFilterHeader /> */}
                {/* <CollapseFilterData /> */}
              </div>
              <div className="list-product">
                <div className="table-responsive">
                  <DataTable
                    className="theme-scrollbar"
                    data={filteredItems}
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
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductListContainer;
