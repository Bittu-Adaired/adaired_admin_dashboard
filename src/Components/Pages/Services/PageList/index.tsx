"use client";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Row,
} from "reactstrap";
import { ServiceFormTypes } from "@/Types/ServiceType";
import DataTable from "react-data-table-component";
import ActionDataSource from "@/Components/Form&Table/Table/CommonComponent/ActionDataSource";
import axios from "axios";

const PageList = () => {
  const [services, setServices] = useState<ServiceFormTypes[]>([]);
  const [filterText, setFilterText] = useState("");

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
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/service/getServices`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <div
        id="basic-1_filter"
        className="dataTables_filter d-flex align-items-center"
      >
        <Label className="me-1">Search:</Label>
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/service/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status !== 200) {
        console.error("Failed to delete item:", response.data);
        return;
      }

      setServices(services.filter((service) => service._id !== id));
      // toggle("delete");
      // setShowConfirmToast(false); // Close confirm toast after successful deletion
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
      },
      {
        name: "Service Name",
        selector: (row: ServiceFormTypes) => row.serviceName,
        sortable: true,
      },
      {
        name: "Slug",
        selector: (row: ServiceFormTypes) => row.slug,
        sortable: true,
      },
      {
        name: "Status",
        cell: (row: ServiceFormTypes) => (
          // <CustomBadge
          //   color={`${row.status !== "publish" ? "danger" : "success"}`}
          //   position={row.status}
          // />
          <p>1</p>
        ),
        sortable: true,
      },
      {
        name: "Action",
        cell: (row: ServiceFormTypes) => (
          <ActionDataSource
            id={row._id}
            editUrl=""
            viewUrl=""
            toastMessage="Are you sure, you wanna delete this?"
            toastName="Delete"
            handleConfirmDelete={deleteFunction}
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
          <Card className="basic-data-table">
            <CardHeader className="flex items-center justify-between">
              <h2>Services</h2>
              <div>{subHeaderComponentMemo}</div>
            </CardHeader>
            <CardBody>
              <div className="table-responsive">
                <DataTable
                  className="theme-scrollbar"
                  data={filteredItems}
                  columns={HtmlColumn}
                  striped
                  highlightOnHover
                  pagination
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PageList;
