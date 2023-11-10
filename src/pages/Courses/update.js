import axios from "axios";
import React, { useEffect } from "react";
import CourseForm from "../../components/CourseForm";
import { useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";

const UpdateCourse = () => {
	const id = useParams().id;
	const [departments, setDepartments] = React.useState([]);
	const [course, setCourse] = React.useState({});
	const navigate = useNavigate();

	useEffect(() => {
		fetchCourse();
		fetchDepartments();
	}, []);

	const fetchCourse = async () => {
		await axios.get("http://localhost:8080/course/" + id).then((res) => {
			setCourse(res.data);
		});
	};

	const fetchDepartments = async () => {
		await axios.get("http://localhost:8080/department/all").then((res) => {
			setDepartments(res.data);
		});
	};

	const updateCourse = async (values) => {
		axios
			.post("http://localhost:8080/course/update", { ...values, id })
			.then(() => {
				notification.success({
					message: "Success",
					description: "Course has been updated successfully",
				});
				navigate("/admin/courses");
			})
			.catch(() => {
				notification.error({
					message: "Failed",
					description: "Course has not been updated",
				});
			});
	};

	if (!course.id) {
		return null;
	}

	return (
		<div>
			<CourseForm
				onSubmit={updateCourse}
				departments={departments}
				data={course}
			/>
		</div>
	);
};

export default UpdateCourse;
