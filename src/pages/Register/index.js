import React, {useState, useEffect} from "react";
import { Form, Input, Button, Space, Select, Radio } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import bg from "../../assets/bg.jpeg";

export default function Register() {
	const [departments, setDepartments] = useState([]);
	const [role, setRole] = useState([]);

	useEffect(() => {
		fetchDepartments();
	}, []);

	const fetchDepartments = async () => {
		await axios.get("http://localhost:8080/department/all").then((res) => {
			setDepartments(res.data);
		});
	};
	const radioOnchange = e => {
		setRole(e.target.value)
		localStorage.setItem("role", e.target.value)
	}
	return (
		<Space style={{ display: "flex", justifyContent: "center" }}>
			<div
				style={{
					width: "100vw",
					height: "100vh",
					backgroundImage: `url(${bg})`,
					paddingTop: 100,
					backgroundSize: "cover",
				}}
			>
				<div
					style={{
						maxWidth: 500,
						minWidth: 450,
						margin: "auto",
						padding: 20,
						borderRadius: "10px",
						border: "2px solid #ddd",
						backgroundColor: "#fff",
					}}
				>
					<Form
						name="auth"
						layout="vertical"
						onFinish={(values) => {
							const payload = {
								...values,
								role: role
							}
							axios
								.post(role == 'student' ? "http://localhost:8080/student/register"
								: "http://localhost:8080/professor/add", payload)
								.then((res) => {
									localStorage.setItem("student", res.data.id);
									localStorage.setItem("firstName", res.data.firstName);
									localStorage.setItem("lastName", res.data.lastName);
									localStorage.setItem("deptId", res.data.departmentId)
									// if(role == 'student') {
									window.location.href = "/home";
									// } else {
									// 	window.location.href = "/professor/sections";
									// }
								})
								.catch((err) => {
									console.log(err);
								});
						}}
					>
						{/* <Form.Item
							name="registrationNumber"
							label="Registration Number"
							rules={[
								{
									required: true,
									message: "Please enter your registration number!",
								},
							]}
						>
							<Input size="large" placeholder="S313-12" />
						</Form.Item> */}
						<Radio.Group onChange={radioOnchange} value={role}>
        <Radio value={"professor"}>Professor</Radio>
        <Radio value={"student"}>Student</Radio>
      </Radio.Group>
	  <br />
	  <br />
						<Form.Item
							name="firstName"
							label="First name"
							rules={[
								{
									required: true,
									message: "Please enter your first name!",
								},
							]}
						>
							<Input size="large" placeholder="enter your first name" />
						</Form.Item>
						<Form.Item
							name="lastName"
							label="Last name"
							rules={[
								{
									required: true,
									message: "Please enter your last name!",
								},
							]}
						>
							<Input size="large" placeholder="enter your last name" />
						</Form.Item>
						<Form.Item
							name="phoneNumber"
							label="Phone number"
							rules={[
								{
									required: true,
									message: "Please enter your phone number!",
								},
							]}
						>
							<Input size="large" placeholder="enter your phone number" />
						</Form.Item>
						<Form.Item
							name="email"
							label="E-Mail"
							rules={[
								{
									required: true,
									message: "Please enter your email!",
								},
							]}
						>
							<Input size="large" placeholder="doe@cms.in" type="email" />
						</Form.Item>
						<Form.Item
						name="departmentId"
						label="Department"
						rules={[
							{
								required: true,
								message: "Select department!",
							},
						]}
					>
						<Select>
							{departments.map((department) => (
								<Select.Option value={department.id}>
									{department.department}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
						<Form.Item
							name="password"
							label="Password"
							rules={[
								{
									required: true,
									message: "Please enter your password!",
								},
							]}
						>
							<Input size="large" placeholder="Password" type="password" />
						</Form.Item>
						<Form.Item>
							<Button
								size="large"
								form="auth"
								shape="round"
								htmlType="submit"
								block
								style={{ maxWidth: 100 }}
							>
								Register
							</Button>
						</Form.Item>
						Already have an account? <Link to={"/login"}>Login</Link>{" "}
					</Form>
				</div>
			</div>
		</Space>
	);
}
