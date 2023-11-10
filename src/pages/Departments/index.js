import { DeleteFilled, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
	Button,
	Card,
	Col,
	Input,
	Modal,
	Row,
	Space,
	Typography,
	notification,
} from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const Departments = () => {
	const [departments, setDepartments] = React.useState([]);
	const [isModalVisible, setIsModalVisible] = React.useState(false);
	const [departmentId, setDepartmentId] = React.useState(0);
	const [department, setDepartment] = React.useState("");
	const [userDepartment, setUserDepartment] = React.useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		fetchDepartments();
	}, []);
	useEffect(() => {
		if(departments && departments.length > 0) {
			const dept = departments.filter(data => data.id === Number(localStorage.getItem("deptId")));
			setUserDepartment(dept)
		}
	}, [departments]);

	const fetchDepartments = async () => {
		await axios.get("http://localhost:8080/department/all").then((res) => {
			setDepartments(res.data);
		});
	};

	const isAdmin = localStorage.getItem("role") === "admin" ? true : false;

	return (
		<div>
			<Typography.Title level={2}> Departments</Typography.Title>
			
				{isAdmin && (
					<Row gutter={[16, 24]}>
					<Col className="gutter-row" span={6}>
						<Card
							hoverable
							style={{ height: 120 }}
							bodyStyle={{ display: "flex", justifyContent: "center" }}
							onClick={() => setIsModalVisible(true)}
						>
							<div style={{ fontSize: 30 }}>
								<PlusOutlined style={{ fontSize: 30 }} /> Add Department
							</div>
						</Card>
					</Col>
				{departments.map((department, idx) => {
					return (
						<Col className="gutter-row" span={6} key={idx}>
							<Card
								hoverable
								style={{ height: isAdmin ? 120 : 100 }}
								actions={
									isAdmin
										? [
												<DeleteFilled
													key="setting"
													style={{ color: "#fe0000" }}
													onClick={() => {
														axios
															.get(
																"http://localhost:8080/department/delete/" +
																	department.id
															)
															.then(() => {
																notification.success({
																	message: "Success",
																	description: "Department deleted",
																});
																fetchDepartments();
															});
													}}
												/>,
												<EditOutlined
													key="edit"
													onClick={() => {
														setDepartmentId(department.id);
														setDepartment(department.department);
														setIsModalVisible(true);
													}}
												/>,
										  ]
										: []
								}
								onClick={() => {
									if (!isAdmin) {
										navigate("/departments/" + department.id + "/courses");
									}
								}}
							>
								<Meta title={department.department} />
							</Card>
						</Col>
					);
				})}
				</Row>)}
				{!isAdmin &&
					<Row>
				{userDepartment && userDepartment.map((department, idx) => {
					return (
						<Col className="gutter-row" span={6} key={idx}>
							<Card
								hoverable
								style={{ height: isAdmin ? 120 : 100, marginLeft: 10 }}
								onClick={() => {
									if (!isAdmin) {
										navigate("/departments/" + department.id + "/courses");
									}
								}}
							>
								<Meta title={department.department} />
							</Card>
						</Col>
					)
				})}
			</Row>}
			<Modal
				open={isModalVisible}
				footer={null}
				onCancel={() => setIsModalVisible(false)}
			>
				<div>
					<Input
						name="department"
						size="large"
						type="text"
						placeholder="computer science"
						value={department}
						style={{ maxWidth: "90%" }}
						onChange={(e) => setDepartment(e.target.value)}
					/>

					<Space style={{ marginTop: 15 }}>
						<Button
							size="large"
							form="auth"
							shape="round"
							block
							style={{ maxWidth: 100 }}
							onClick={() => {
								setIsModalVisible(false);
								setDepartmentId(0);
								setDepartment("");
							}}
						>
							Cancel{" "}
						</Button>
						<Button
							size="large"
							form="auth"
							shape="round"
							block
							style={{ maxWidth: 100, marginLeft: 10 }}
							type="primary"
							onClick={() => {
								if (departmentId !== 0) {
									axios
										.post("http://localhost:8080/department/update", {
											id: departmentId,
											department,
										})
										.then(() => {
											notification.success({
												message: "Success",
												description: "Department updated",
											});
											setIsModalVisible(false);
											setDepartmentId(0);
											setDepartment("");
											fetchDepartments();
										})
										.catch((err) => {
											console.log(err);
										});
								} else {
									axios
										.post("http://localhost:8080/department/save", {
											department,
										})
										.then(() => {
											setIsModalVisible(false);
											setDepartmentId(0);
											setDepartment("");
											fetchDepartments();
										})
										.catch((err) => {
											console.log(err);
										});
								}
							}}
						>
							{departmentId !== 0 ? "Update" : "Add"}
						</Button>
					</Space>
				</div>
			</Modal>
		</div>
	);
};

export default Departments;
