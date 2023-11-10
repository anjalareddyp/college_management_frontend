import React from "react";
import { Card, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

const Admin = () => {
	const navigate = useNavigate();
	return (
		<>
			<Row gutter={[10]} align={"center"} justify={"space-around"}>
				<Col className="gutter-row">
					<Card
						hoverable
						style={{
							width: 240,
						}}
						cover={
							<img
								style={{
									width: 240,
									height: 240,
								}}
								alt="departments"
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7f8g-m5ZJWdgt8qJer9RUYcTTqVFCeXge88sh7VWybdZYHddTRUhDc3K74_6zZX9n8YA&usqp=CAU"
							/>
						}
						onClick={() => navigate("/admin/departments")}
					>
						<Meta title="Departments" />
					</Card>
				</Col>
				<Col className="gutter-row">
					<Card
						hoverable
						style={{
							width: 240,
						}}
						cover={
							<img
								style={{
									width: 240,
									height: 240,
								}}
								alt="courses"
								src="https://images.unsplash.com/photo-1508830524289-0adcbe822b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2325&q=80"
							/>
						}
						onClick={() => navigate("/admin/courses")}
					>
						<Meta title="Courses" />
					</Card>
				</Col>
				<Col className="gutter-row">
					<Card
						hoverable
						style={{
							width: 240,
						}}
						cover={
							<img
								style={{
									width: 240,
									height: 240,
								}}
								alt="sections"
								src="https://thumbs.dreamstime.com/b/vector-isometric-school-mathematics-classroom-interior-cross-section-desks-chairs-blackboard-147289384.jpg"
							/>
						}
						onClick={() => navigate("/admin/sections")}
					>
						<Meta title="Sections" />
					</Card>
				</Col>
			</Row>
			<Row
				gutter={[10]}
				align={"center"}
				justify={"space-around"}
				style={{ marginTop: 40 }}
			>
				{/* <Col className="gutter-row">
					<Card
						hoverable
						style={{
							width: 240,
						}}
						cover={
							<img
								style={{
									width: 240,
									height: 240,
								}}
								alt="professors"
								src="https://plus.unsplash.com/premium_photo-1658506785658-a41c8a7ba8ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmVzc29yc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
							/>
						}
						onClick={() => navigate("/admin/professors")}
					>
						<Meta title="Professors" />
					</Card>
				</Col> */}
				<Col className="gutter-row">
					<Card
						hoverable
						style={{
							width: 240,
						}}
						cover={
							<img
								style={{
									width: 240,
									height: 240,
								}}
								alt="rooms"
								src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80"
							/>
						}
						onClick={() => navigate("/admin/rooms")}
					>
						<Meta title="Rooms" />
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default Admin;
