import { Form, Input, Button, Space, Select, Typography, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";

const CourseForm = ({ data = {}, onSubmit, departments = [] }) => {
	const navigate = useNavigate();
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
					{!data?.id ? "Add" : "Update"} Course
				</Typography.Title>
				<Form
					name="auth"
					layout="vertical"
					onFinish={(values) => {
						onSubmit(values);
					}}
					initialValues={{ ...data }}
				>
					<Form.Item
						name="courseId"
						label="Course Id"
						rules={[
							{
								required: true,
								message: "Please enter your course id!",
							},
						]}
					>
						<Input size="large" placeholder="CS101" />
					</Form.Item>
					<Form.Item
						name="courseDescription"
						label="Description"
						rules={[
							{
								required: true,
								message: "Please enter course description!",
							},
						]}
					>
						<Input.TextArea
							size="large"
							placeholder="enter course descripiton"
							minLength={3}
						/>
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
						name="creditHours"
						label="Credit Hours"
						rules={[
							{
								required: true,
								message: "Please enter Credit Hours!",
							},
						]}
					>
						<InputNumber size="large" placeholder="100" />
					</Form.Item>
					<Form.Item>
						<Button
							size="large"
							shape="round"
							block
							style={{ maxWidth: 100, marginRight: 10 }}
							onClick={() => navigate(-1)}
						>
							Cancel
						</Button>
						<Button
							disabled={departments.length === 0}
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

export default CourseForm;
