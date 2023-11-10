import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Descriptions, Table, Space, Modal } from "antd";


const EachSection = ({section}) => {
	const [viewModal, setViewModal] = React.useState(false);
    const navigate = useNavigate();
	
	const columns = [
		{
			title: "Student Id",
			dataIndex: "studentId",
			key: "studentId",
			render: (_, record) => <p>{record.studentId}</p>,
		},
		{
			title: "Student Name",
			dataIndex: "name",
			key: "name",
			render: (_, record) => <p>{record.name}</p>,
		},
		{
			title: "Grade",
			dataIndex: "grade",
			key: "grade",
			render: (_, record) => (
				<p>
					{record.grade === 0 && 'A'}
				</p>
			),
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: (_, record) => (
				<p>
					{record.status}
				</p>
			),
		}
	];

					return (
                        <div>
							<Card hoverable onClick={() => {}} style={{ height: 320 }}>
								<Descriptions
									title={section.sectionName}
									extra={
										<Button
											type="primary"
											onClick={() => {localStorage.getItem("role") === "admin" ?
											navigate("/admin/sections/update/" + section.id)
												: navigate("/professor/sections/update/" + section.id)}}
										>
											Edit
										</Button>
									}
								>
									<Descriptions.Item label="Course" span={24}>
										{section.courseDescription}
									</Descriptions.Item>
									<Descriptions.Item label="Department" span={24}>
										{section.departmentName}
									</Descriptions.Item>
									<Descriptions.Item label="Professor" span={24}>
										Dr. {section.professorName}
									</Descriptions.Item>
									<Descriptions.Item label="Room no." span={24}>
										{section.roomNo}
									</Descriptions.Item>
									<Descriptions.Item label="Seats Available" span={24}>
										{section.availableSeats}
									</Descriptions.Item>
									<Descriptions.Item label="Registered Students" span={24}>
										<Button
											type="primary"
											onClick={() => setViewModal(true)}>
											View
										</Button>
									</Descriptions.Item>
								</Descriptions>
							</Card>
					
			<Modal
				open={viewModal}
				footer={null}
				onCancel={() => setViewModal(false)}
			>
				<div>
				<Table columns={columns} dataSource={section.students} pagination={false} />
					<Space style={{ marginTop: 15 }}>
						<Button
							size="large"
							form="auth"
							shape="round"
							block
							style={{ maxWidth: 100 }}
							onClick={() => {
								setViewModal(false);
							}}
						>
							Ok{" "}
						</Button>
						</Space>
				</div>
			</Modal>
		</div>
	);
};

export default EachSection;
