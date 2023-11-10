import axios from "axios";
import React, { useEffect } from "react";
import SectionForm from "../../components/SectionForm";
import { notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const UpdateSection = () => {
	const [departments, setDepartments] = React.useState([]);
	const [rooms, setRooms] = React.useState([]);
	const [section, setSection] = React.useState({});
	const [professors, setProfessors] = React.useState([]);
	const navigate = useNavigate();
	const id = useParams().id;

	useEffect(() => {
		fetchSection();
		fetchDepartments();
		fetchRooms();

		fetchProfessors();
	}, []);

	const fetchSection = async () => {
		await axios.get(`http://localhost:8080/section/${id}`).then((res) => {
			setSection(res.data);
		});
	};

	const fetchDepartments = async () => {
		await axios.get("http://localhost:8080/department/all").then((res) => {
			setDepartments(res.data);
		});
	};
	const fetchRooms = async () => {
		await axios.get("http://localhost:8080/room/all").then((res) => {
			setRooms(res.data);
		});
	};

	const fetchProfessors = async () => {
		await axios.get("http://localhost:8080/professor/all").then((res) => {
			setProfessors(res.data);
		});
	};
	const updateSection = async (values) => {
		axios
			.post("http://localhost:8080/section/update", { ...values, id })
			.then(() => {
				notification.success({
					message: "Section Added",
					description: "Section has been updated successfully",
				});
				navigate("/admin/sections");
			})
			.catch(() => {
				notification.error({
					message: "Error",
					description: "Error while updating Section",
				});
			});
	};

	if (!section.id) {
		return null;
	}

	return (
		<div>
			<SectionForm
				onSubmit={updateSection}
				departments={departments}
				rooms={rooms}
				professors={professors}
				data={section}
			/>
		</div>
	);
};

export default UpdateSection;
