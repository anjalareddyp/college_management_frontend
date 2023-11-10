import axios from "axios";
import React from "react";
import ProfessorForm from "../../components/ProfessorForm";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const AddProfessor = () => {
	const navigate = useNavigate();
	const addProfessor = async (values) => {
		axios
			.post("http://localhost:8080/professor/add", values)
			.then(() => {
				notification.success({
					message: "Success",
					description: "Professor added",
				});
				navigate("/admin/professors");
			})
			.catch(() => {
				notification.error({
					message: "Failed",
					description: "Professor not added",
				});
			});
	};
	return (
		<div>
			<ProfessorForm onSubmit={addProfessor} />
		</div>
	);
};

export default AddProfessor;
