import React, {useState} from "react";
import { Form, Input, Button, Space, notification, Radio } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import bg from "../../assets/bg.jpeg";

export default function App() {
	const [role, setRole] = useState([]);
	const radioOnchange = e => {
		setRole(e.target.value)
		localStorage.setItem("role", e.target.value)
	}
	return (
		<Space style={{ display: "flex", justifyContent: "center", width: "100%" }}>
			<div
				style={{
					width: "100vw",
					height: "100vh",
					backgroundImage: `url(${bg})`,
					paddingTop: 100,
					backgroundSize: "cover",
				}}
			>
				<div>
					<div
						style={{
							margin: "auto",
							maxWidth: 500,
							minWidth: 450,
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
								if (
									values.email === "admin@cms.in" &&
									values.password === "admin"
								) {
									window.location.href = "/admin";
									localStorage.setItem("role", "admin");
								} else {
									axios
										.post(role === 'student' ? `http://localhost:8080/student/login`
										: `http://localhost:8080/professor/login`, values)
										.then((res) => {
											localStorage.setItem("student", res.data.id);
											localStorage.setItem("firstName", res.data.firstName);
											localStorage.setItem("lastName", res.data.lastName);
											localStorage.setItem('deptId', res.data.departmentId)
											// if(role == 'student') {
												window.location.href = "/home";
												// } else {
												// 	window.location.href = "/professor/sections";
												// }
										})
										.catch(() => {
											notification.error({
												message: "Error",
												description: "Invalid credentials",
											});
										});
								}
							}}
						>
							<Radio.Group onChange={radioOnchange} value={role}>
        <Radio value={"professor"}>Professor</Radio>
        <Radio value={"student"}>Student</Radio>
      </Radio.Group>
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
								<Input size="large" type="email" placeholder="john@gmail.com" />
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
									Log In
								</Button>
							</Form.Item>
							Don't have an account? <Link to={"/register"}>Register</Link>{" "}
						</Form>
					</div>
				</div>
			</div>
		</Space>
	);
}
