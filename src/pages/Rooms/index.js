import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Input, Modal, Space } from "antd";
import axios from "axios";
import React, { useEffect } from "react";

const gridStyle = {
	textAlign: "center",
	width: "20%",
};

const Rooms = () => {
	const [rooms, setRooms] = React.useState([]);
	const [isModalVisible, setIsModalVisible] = React.useState(false);

	const [roomNo, setRoomNo] = React.useState("");
	const [capacity, setCapacity] = React.useState(0);

	useEffect(() => {
		fetchRooms();
	}, []);

	const fetchRooms = async () => {
		await axios.get("http://localhost:8080/room/all").then((res) => {
			setRooms(res.data);
		});
	};

	return (
		<div>
			<Card title="Rooms">
				<Card.Grid
					style={gridStyle}
					key={"add"}
					onClick={() => setIsModalVisible(true)}
				>
					<div style={{ fontSize: 20 }}>
						<PlusOutlined style={{ fontSize: 20 }} /> Add room
					</div>
				</Card.Grid>
				{rooms.map((room, idx) => {
					return (
						<Card.Grid style={gridStyle} key={idx}>
							<p>Room No: {room.roomNo}</p>
							<p>Capacity: {room.capacity}</p>
						</Card.Grid>
					);
				})}
			</Card>
			<Modal
				open={isModalVisible}
				footer={null}
				onCancel={() => setIsModalVisible(false)}
			>
				<div>
					<Input
						name="roomNo"
						size="large"
						type="text"
						placeholder="Enter Room No"
						onChange={(e) => setRoomNo(e.target.value)}
						style={{ maxWidth: "90%" }}
					/>
					<br />
					<br />
					<Input
						name="capacity"
						size="large"
						type="number"
						placeholder="Enter Capacity"
						onChange={(e) => setCapacity(e.target.value)}
						style={{ maxWidth: "90%" }}
					/>

					<Space style={{ marginTop: 15 }}>
						<Button
							size="large"
							form="auth"
							shape="round"
							block
							style={{ maxWidth: 100 }}
							onClick={() => {
								setIsModalVisible(false);
								setRoomNo("");
							}}
						>
							Cancel{" "}
						</Button>
						<Button
							size="large"
							form="auth"
							shape="round"
							block
							style={{ maxWidth: 100, marginLeft: 10 }}
							type="primary"
							onClick={() => {
								axios
									.post("http://localhost:8080/room/add", {
										capacity, roomNo,
									})
									.then((res) => {
										fetchRooms();
										setIsModalVisible(false)
										setRoomNo("");
									})
									.catch((err) => {
										console.log(err);
									});
							}}
						>
							Add
						</Button>
					</Space>
				</div>
			</Modal>
		</div>
	);
};

export default Rooms;
