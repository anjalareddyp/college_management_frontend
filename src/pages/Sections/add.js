import axios from "axios";
import React, { useEffect } from "react";
import SectionForm from "../../components/SectionForm";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const AddSection = () => {
	const [departments, setDepartments] = React.useState([]);
	const [rooms, setRooms] = React.useState([]);
	const [professors, setProfessors] = React.useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetchDepartments();
		fetchRooms();
		fetchProfessors();
	}, []);

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
	const addSection = async (values) => {
		const selectedRoom = rooms.filter(data => data.id === values.roomId);
		const payload = {
			...values,
			capacity: selectedRoom[0].capacity
		}
		axios
			.post("http://localhost:8080/section/add", payload)
			.then(() => {
				notification.success({
					message: "Section Added",
					description: "Section has been added successfully",
				});
				if(localStorage.getItem('role') === 'admin') {
				navigate("/admin/sections");
				} else {
					navigate("/professor/sections");
				}
			})
			.catch(() => {
				notification.error({
					message: "Error",
					description: "Error while adding Section",
				});
			});
	};

	return (
		<div>
			<SectionForm
				onSubmit={addSection}
				departments={departments}
				rooms={rooms}
				professors={professors}
			/>
		</div>
	);
};

export default AddSection;
