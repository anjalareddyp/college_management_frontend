import {
	Button,
	Card,
	Col,
	Descriptions,
	Row,
	Space,
	Table,
	Tag,
	Typography,
	notification,
} from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CourseSections = () => {
	const [sections, setSections] = React.useState([]);
	const [course, setCourse] = React.useState({});
	const [department, setDepartment] = React.useState({});
	const navigate = useNavigate();
	const { did, cid } = useParams();

	useEffect(() => {
		fetchCourse();
		fetchDepartment();
		fetchSections();
	}, []);

	const fetchCourse = async () => {
		await axios.get("http://localhost:8080/course/" + cid).then((res) => {
			setCourse(res.data);
		});
	};

	const fetchDepartment = async () => {
		await axios.get("http://localhost:8080/department/" + did).then((res) => {
			setDepartment(res.data);
		});
	};

	const fetchSections = async () => {
		await axios
			.get(
				"http://localhost:8080/section/all/" +
					did +
					"/" +
					cid +
					"/" +
					localStorage.getItem("student")
			)
			.then((res) => {
				setSections(res.data);
			});
	};

	const columns = [
		{
			title: "Professor",
			dataIndex: "professorName",
			key: "professorName",
			render: (_, record) => <p>Dr. {record.professorName}</p>,
		},
		{
			title: "CRN",
			dataIndex: "sectionName",
			key: "sectionName",
			render: (_, record) => <p>{record.sectionName}</p>,
		},
		{
			title: "Room no.",
			dataIndex: "roomNo",
			key: "roomNo",
		},
		{
			title: "Available seats",
			dataIndex: "availableSeats",
			key: "availableSeats",
			render: (_, record) => (
				<p>
					{record.availableSeats} of {record.capacity}
				</p>
			),
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => (
				<Button
					disabled={record.availableSeats === 0 || record.registered === 1}
					onClick={() => {
						axios
							.post(
								"http://localhost:8080/section/register/student/" + record.id,
								{
									studentId: localStorage.getItem("student"),
									name:localStorage.getItem("firstName")
								}
							)
							.then(() => {
								notification.success({
									message: "Success",
									description:
										"You have successfully registered to the section",
								});
								fetchCourse();
								fetchDepartment();
								fetchSections();
							})
							.catch(() => {
								notification.error({
									message: "Error",
									description: "Failed to register",
								});
							});
					}}
				>
					Register
				</Button>
			),
		},
	];

	return (
		<div>
			<Typography.Title level={2}>Course Sections</Typography.Title>
			<Row gutter={16}>
				<Col className="gutter-row" span={24}>
					<Card hoverable style={{ marginBottom: 20 }}>
						<Descriptions bordered>
							<Descriptions.Item label="Course Code">
								{course.courseId}
							</Descriptions.Item>

							<Descriptions.Item label="Department">
								{department.department}
							</Descriptions.Item>
							<Descriptions.Item label="Description" span={3}>
								{course.courseDescription}
							</Descriptions.Item>
						</Descriptions>
					</Card>
				</Col>
			</Row>
			<Table columns={columns} dataSource={sections} pagination={false} />
		</div>
	);
};

export default CourseSections;
