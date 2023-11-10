import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import { Card, Col, Row, Typography, notification } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const Professors = () => {
	const navigate = useNavigate();
	const [professors, setProfessors] = React.useState([]);

	useEffect(() => {
		fetchProfessors();
	}, []);

	const fetchProfessors = async () => {
		await axios.get("http://localhost:8080/professor/all").then((res) => {
			setProfessors(res.data);
		});
	};

	return (
		<div>
			<Typography.Title level={2}>Professors</Typography.Title>
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
						onClick={() => navigate("/admin/professors/add")}
					/>
				</Col>
				{professors.map((professor, idx) => {
					return (
						<Col className="gutter-row" span={6} key={idx}>
							<Card
								hoverable
								style={{ height: 320 }}
								onClick={() => {}}
								cover={
									<img
										style={{ height: 200 }}
										alt="example"
										src="https://simg.nicepng.com/png/small/129-1290978_teacher-teacher-icon-png.png"
									/>
								}
								actions={[
									<DeleteFilled
										key="setting"
										style={{ color: "#fe0000" }}
										onClick={() => {
											axios
												.get(
													"http://localhost:8080/professor/delete/" +
														professor.id
												)
												.then(() => {
													notification.success({
														message: "Success",
														description: "Professor deleted",
													});
													fetchProfessors();
												});
										}}
									/>,
									<EditOutlined
										key="edit"
										onClick={() =>
											navigate("/admin/professors/update/" + professor.id)
										}
									/>,
								]}
							>
								<Meta
									title={"Dr. " + professor.firstName + professor.lastName}
								/>
							</Card>
						</Col>
					);
				})}
			</Row>
		</div>
	);
};

export default Professors;
