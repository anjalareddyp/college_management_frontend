import axios from "axios";
import React, { useEffect } from "react";
import CourseForm from "../../components/CourseForm";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
	const navigate = useNavigate();
	const [departments, setDepartments] = React.useState([]);

	useEffect(() => {
		fetchDepartments();
	}, []);

	const fetchDepartments = async () => {
		await axios.get("http://localhost:8080/department/all").then((res) => {
			setDepartments(res.data);
		});
	};

	const addCourse = async (values) => {
		axios
			.post("http://localhost:8080/course/add", values)
			.then((res) => {
				notification.success({
					message: "Success",
					description: "Course has been added successfully",
				});
				navigate("/admin/courses");
			})
			.catch((err) => {
				notification.error({
					message: "Failed",
					description: "Course has not been created",
				});
			});
	};

	return (
		<div>
			<CourseForm onSubmit={addCourse} departments={departments} />
		</div>
	);
};

export default AddCourse;
