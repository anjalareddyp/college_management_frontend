import { Button, Table, Typography, notification } from "antd";
import axios from "axios";
import React, { useEffect } from "react";

const EnrolledCourses = () => {
	const [enrolledCourses, setEnrolledCourses] = React.useState([]);

	useEffect(() => {
		fetchEnrolledCourses();
	}, []);

	const fetchEnrolledCourses = async () => {
		await axios
			.get("http://localhost:8080/section/student/all/" + localStorage.getItem("student"))
			.then((res) => {
				setEnrolledCourses(res.data);
			});
	};

	const columns = [
		{
			title: "Department",
			dataIndex: "departmentName",
			key: "departmentName",
			render: (_, record) => <p>{record.departmentName}</p>,
		},
		{
			title: "Course",
			dataIndex: "courseDescription",
			key: "courseDescription",
			render: (_, record) => <p>{record.courseDescription}</p>,
		},
		{
			title: "Professor",
			dataIndex: "professorName",
			key: "professorName",
			render: (_, record) => <p>Dr. {record.professorName}</p>,
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
					{" "}
					{record.availableSeats} of {record.capacity}
				</p>
			),
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => (
				<Button
					onClick={() => {
						axios
							.post(
								"http://localhost:8080/section/deregister/student/" + record.id,
								{
									studentId: localStorage.getItem("student"),
								}
							)
							.then(() => {
								notification.success({
									message: "Success",
									description: "You have successfully dropped from the section",
								});
								fetchEnrolledCourses();
							})
							.catch(() => {
								notification.error({
									message: "Error",
									description: "Failed to drop from the section",
								});
							});
					}}
				>
					Drop
				</Button>
			),
		},
	];

	return (
		<div>
			<Typography.Title level={3}>Enrolled Courses</Typography.Title>
			<Table
				columns={columns}
				dataSource={enrolledCourses}
				pagination={false}
			/>
		</div>
	);
};

export default EnrolledCourses;
