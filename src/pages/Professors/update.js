import axios from "axios";
import React, { useEffect } from "react";
import ProfessorForm from "../../components/ProfessorForm";
import { useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";

const UpdateProfessor = () => {
	const id = useParams().id;
	const [professor, setProfessor] = React.useState({});
	const navigate = useNavigate();

	useEffect(() => {
		getProfessor(id);
	}, []);

	const getProfessor = async (id) => {
		await axios.get(`http://localhost:8080/professor/${id}`).then((res) => {
			setProfessor(res.data);
		});
	};

	const updateProfessor = async (values) => {
		axios
			.post("http://localhost:8080/professor/update", { ...values, id })
			.then((res) => {
				notification.success({
					message: "Success",
					description: "Professor updated",
				});
				navigate("/admin/professors");
			})
			.catch((err) => {
				notification.error({
					message: "Failed",
					description: "Professor not updated",
				});
			});
	};

	if (!professor.id) {
		return null;
	}
	return (
		<div>
			<ProfessorForm onSubmit={updateProfessor} data={professor} />
		</div>
	);
};

export default UpdateProfessor;
