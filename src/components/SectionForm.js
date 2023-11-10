import {
	Form,
	Input,
	Button,
	Space,
	Select,
	InputNumber,
	Typography,
} from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SectionForm = ({
	data = {},
	onSubmit,
	departments = [],

	rooms = [],
	professors = [],
}) => {
	const [courses, setCourses] = useState([]);
	const navigate = useNavigate();
	const [form] = Form.useForm();

	return (
		<Space style={{ display: "flex", justifyContent: "center" }}>
			<div
				style={{
					maxWidth: 600,
					minWidth: 500,
					margin: "2rem",
					padding: 20,
					borderRadius: "10px",
					border: "2px solid #ddd",
					backgroundColor: "#fff",
				}}
			>
				<Typography.Title level={3}>
					{!data?.id ? "Add" : "Update"} Course Section
				</Typography.Title>
				<Form
					name="auth"
					form={form}
					layout="vertical"
					onFinish={(values) => {
						onSubmit({ ...values, availableSeats: values.capacity });
					}}
					initialValues={{ ...data }}
					onValuesChange={(changedValues, allValues) => {
						if (changedValues.departmentId) {
							const fetchCourses = async () => {
								await axios
									.get(
										"http://localhost:8080/course/department/" +
											changedValues.departmentId
									)
									.then((res) => {
										setCourses(res.data);
									});
							};
							fetchCourses();
							form.setFieldsValue({ courseId: null });
						}
						console.log(changedValues, allValues);
					}}
				>
					<Form.Item
						name="sectionName"
						label="Section Name"
						rules={[
							{
								required: true,
								message: "Please enter section name!",
							},
						]}
					>
						<Input size="large" placeholder="Computer science" />
					</Form.Item>
					{/* <Form.Item
						name="capacity"
						label="capacity"
						rules={[
							{
								required: true,
								message: "Please enter capacity!",
							},
						]}
					>
						<InputNumber size="large" placeholder="100" />
					</Form.Item> */}
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
						name="courseId"
						label="Course"
						rules={[
							{
								required: true,
								message: "Select course!",
							},
						]}
					>
						<Select>
							{courses.map((course) => (
								<Select.Option value={course.id}>
									{course.courseId}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item
						name="professorId"
						label="Professor"
						rules={[
							{
								required: true,
								message: "Select professor!",
							},
						]}
					>
						{localStorage.getItem('role') === 'professor' ? <Select>
							{professors.map((professor) => {
								if (professor.id === Number(localStorage.getItem('student'))) {
								return (<Select.Option value={professor.id}>
									{professor.firstName + " " + professor.lastName}
								</Select.Option>)}
                               })}
						</Select>
						: <Select>
						{professors.map((professor) => (
							<Select.Option value={professor.id}>
								{professor.firstName + " " + professor.lastName}
							</Select.Option>
						))}
					</Select>}
					</Form.Item>
					<Form.Item
						name="roomId"
						label="Room no"
						rules={[
							{
								required: true,
								message: "Select room number!",
							},
						]}
					>
						<Select>
							{rooms.map((room) => (
								<Select.Option value={room.id}>{room.roomNo}</Select.Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item>
						<Button
							size="large"
							shape="round"
							block
							style={{ maxWidth: 100, marginLeft: 10 }}
							onClick={() => navigate(-1)}
						>
							Cancel
						</Button>
						<Button
							size="large"
							form="auth"
							shape="round"
							htmlType="submit"
							block
							style={{ maxWidth: 100 }}
							type="primary"
						>
							{!data?.id ? "Add" : "Update"}
						</Button>
					</Form.Item>
				</Form>
			</div>
		</Space>
	);
};

export default SectionForm;
