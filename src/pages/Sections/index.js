import { Button, Card, Col, Descriptions, Row, Typography, Table, Space, Modal } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EachSection from "./eachSection";

const Sections = () => {
	const [sections, setSections] = React.useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetchSections();
	}, []);

	const fetchSections = async () => {
		await axios.get("http://localhost:8080/section/all").then((res) => {
			setSections(res.data);
		});
	};
	const columns = [
		{
			title: "Student Id",
			dataIndex: "studentId",
			key: "studentId",
			render: (_, record) => <p>{record.studentId}</p>,
		},
		{
			title: "Student Name",
			dataIndex: "name",
			key: "name",
			render: (_, record) => <p>{record.name}</p>,
		},
		{
			title: "Grade",
			dataIndex: "grade",
			key: "grade",
			render: (_, record) => (
				<p>
					{record.grade === 0 && 'A'}
				</p>
			),
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (_, record) => (
				<p>
					{record.status}
				</p>
			),
		}
	];

	return (
		<div>
			<Typography.Title level={2}>Sections</Typography.Title>
			<Row gutter={16}>
				<Col className="gutter-row" span={6}>
					<Card
						hoverable
						style={{ height: 320 }}
						cover={
							<img
								style={{ height: 260 }}
								alt="example"
								src="https://cdn.pixabay.com/photo/2016/12/21/17/11/signe-1923369_1280.png"
							/>
						}
						onClick={() => navigate(localStorage.getItem("role") === "admin" ?
						"/admin/sections/add" : "/professor/sections/add")}
					/>
				</Col>
				{sections.map((section, idx) => {
					return (
						<Col className="gutter-row" span={6} key={idx}>
							<EachSection section={section} />
							{/* <Card hoverable onClick={() => {}} style={{ height: 320 }}>
								<Descriptions
									title={section.sectionName}
									extra={
										<Button
											type="primary"
											onClick={() => {localStorage.getItem("role") === "admin" ?
											navigate("/admin/sections/update/" + section.id)
												: navigate("/professor/sections/update/" + section.id)}}
										>
											Edit
										</Button>
									}
								>
									<Descriptions.Item label="Course" span={24}>
										{section.courseDescription}
									</Descriptions.Item>
									<Descriptions.Item label="Department" span={24}>
										{section.departmentName}
									</Descriptions.Item>
									<Descriptions.Item label="Professor" span={24}>
										Dr. {section.professorName}
									</Descriptions.Item>
									<Descriptions.Item label="Room no." span={24}>
										{section.roomNo}
									</Descriptions.Item>
									<Descriptions.Item label="Seats Available" span={24}>
										{section.availableSeats}
									</Descriptions.Item>
									<Descriptions.Item label="Registered Students" span={24}>
										{section.students.map((s) => {
											return(
												s.name
											)
										})}
										<Button
											type="primary"
											onClick={() => setViewModal(true)}>
											View
										</Button>
									</Descriptions.Item>
								</Descriptions>
							</Card> */}
						</Col>
					);
				})}
			</Row>
		</div>
	);
};

export default Sections;
