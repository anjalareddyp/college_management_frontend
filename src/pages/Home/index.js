import React, { useEffect } from "react";
import axios from "axios";
import { Card } from "antd";

const gridStyle = {
	textAlign: "left",
	width: "40%",
};

const Home = () => {
	const [departments, setDepartments] = React.useState([]);
	const [userDepartment, setUserDepartment] = React.useState(null);
	
	const fetchDepartments = async () => {
		await axios.get("http://localhost:8080/department/all").then((res) => {
			setDepartments(res.data);
		});
	};
	useEffect(() => {
		if(departments && departments.length > 0) {
			const dept = departments.filter(data => data.id === Number(localStorage.getItem("deptId")));
			setUserDepartment(dept)
		}
	}, [departments]);
	useEffect(() => {
		fetchDepartments();
	}, []);
	return (
		<div>
			<h1>Welcome</h1>
			<Card title="User Details">
						<Card.Grid style={gridStyle}>
							<p style={{textTransform : "capitalize"}}><b>Name:</b> {localStorage.getItem('firstName')+ ' ' + localStorage.getItem('lastName')}</p>
							<p><b>Id:</b> {localStorage.getItem('student')}</p>
							<p style={{textTransform : "capitalize"}}><b>Role:</b> {localStorage.getItem('role')}</p>
							<p><b>Department:</b> {userDepartment && userDepartment.length > 0 && userDepartment[0].department}</p>
						</Card.Grid>
			</Card>
		</div>
	);
};

export default Home;
