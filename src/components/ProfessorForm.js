import { Form, Input, Button, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const ProfessorForm = ({ data = {}, onSubmit }) => {
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
					{!data?.id ? "Add" : "Update"} Professor
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
						name="firstName"
						label="First name"
						rules={[
							{
								required: true,
								message: "Please enter first name!",
							},
						]}
					>
						<Input size="large" placeholder="enter  first name" />
					</Form.Item>
					<Form.Item
						name="lastName"
						label="Last name"
						rules={[
							{
								required: true,
								message: "Please enter last name!",
							},
						]}
					>
						<Input size="large" placeholder="enter last name" />
					</Form.Item>
					<Form.Item
						name="phoneNumber"
						label="Phone number"
						rules={[
							{
								required: true,
								message: "Please enter  phone number!",
							},
						]}
					>
						<Input size="large" placeholder="enter phone number" />
					</Form.Item>
					<Form.Item
						name="email"
						label="E-Mail"
						rules={[
							{
								required: true,
								message: "Please enter  email!",
							},
						]}
					>
						<Input size="large" placeholder="Email" type="email" />
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

export default ProfessorForm;
