import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import { Card, Col, Row, Typography, notification } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// const { Meta } = Card;

const Courses = () => {
	const [courses, setCourses] = React.useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetchCourses();
	}, []);

	const fetchCourses = async () => {
		await axios.get("http://localhost:8080/courses/all").then((res) => {
			setCourses(res.data);
		});
	};

	return (
		<div>
			<Typography.Title level={2}>Courses</Typography.Title>
			<Row gutter={[16, 24]}>
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
						onClick={() => navigate("/admin/courses/add")}
					/>
				</Col>
				{courses.map((course, idx) => {
					return (
						<Col className="gutter-row" span={6} key={idx}>
							<Card
								hoverable
								style={{ height: 320 }}
								cover={
									<img
										style={{ height: 100 }}
										alt="example"
										src="https://icon-library.com/images/course-icon/course-icon-19.jpg"
									/>
								}
								actions={[
									<DeleteFilled
										key="setting"
										style={{ color: "#fe0000" }}
										onClick={() => {
											axios
												.post(
													"http://localhost:8080/course/delete/" + course.id
												)
												.then(() => {
													notification.success({
														message: "Success",
														description: "Course deleted",
													});
													fetchCourses();
												});
										}}
									/>,
									<EditOutlined
										key="edit"
										onClick={() =>
											navigate("/admin/courses/update/" + course.id)
										}
									/>,
								]}
								title={course.courseId}
							>
								{/* <Card title={course.courseId} description={course.courseDescription}> */}
									<p><b>Name: {course.courseDescription}</b></p>
									<p>Credit Hours: {course.creditHours}</p>
									{/* </Card> */}
							</Card>
						</Col>
					);
				})}
			</Row>
		</div>
	);
};

export default Courses;
