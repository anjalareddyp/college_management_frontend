import { Card, Col, Row, Typography } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const { Meta } = Card;

const DepartmentCourses = () => {
	const [courses, setCourses] = React.useState([]);
	const navigate = useNavigate();
	const [department, setDepartment] = React.useState({});
	const id = useParams().id;

	useEffect(() => {
		fetchDepartment();
		fetchCourses();
	}, []);

	const fetchCourses = async () => {
		await axios
			.get("http://localhost:8080/course/department/" + id)
			.then((res) => {
				setCourses(res.data);
			});
	};

	const fetchDepartment = async () => {
		await axios.get("http://localhost:8080/department/" + id).then((res) => {
			setDepartment(res.data);
		});
	};

	const isAdmin = localStorage.getItem("role") === "admin" ? true : false;

	return (
		<div>
			<Typography.Title level={2}>{department.department}</Typography.Title>
			<Typography.Title level={6}>List of courses</Typography.Title>

			<Row gutter={[16, 24]}>
				{courses.map((course, idx) => {
					return (
						<Col className="gutter-row" span={6} key={idx}>
							<Card
								hoverable
								style={{ height: isAdmin ? 320 : 320 }}
								cover={
									<img
										style={{ height: 100 }}
										alt="example"
										src="https://icon-library.com/images/course-icon/course-icon-19.jpg"
									/>
								}
								onClick={() => {
									if (!isAdmin)
										navigate(
											"/departments/" +
												department.id +
												"/courses/" +
												course.id +
												"/sections"
										);
								}}
								title={course.courseId}
							>
								<p><b>Name: {course.courseDescription}</b></p>
									<p>Credit Hours: {course.creditHours}</p>
							</Card>
						</Col>
					);
				})}
			</Row>
		</div>
	);
};

export default DepartmentCourses;
