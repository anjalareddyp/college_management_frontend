import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Departments from "./pages/Departments";
import Admin from "./pages/Admin";
import Rooms from "./pages/Rooms";
import Courses from "./pages/Courses";
import AddCourse from "./pages/Courses/add";
import Professors from "./pages/Professors";
import AddProfessor from "./pages/Professors/add";
import Sections from "./pages/Sections";
import AddSection from "./pages/Sections/add";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import UpdateCourse from "./pages/Courses/update";
import UpdateProfessor from "./pages/Professors/update";
import UpdateSection from "./pages/Sections/update";
import DepartmentCourses from "./pages/Courses/departmentCourses";
import CourseSections from "./pages/Courses/courseSections";
import EnrolledCourses from "./pages/Courses/enrolledCourses";
import Home from "./pages/Home";

function App() {
	console.log(window.location.pathname)
	return (
		<Layout>
			<div
				style={{
					backgroundColor: "#001528",
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					color: "white",
					height: 70,
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "start",
						alignItems: "center",
					}}
				>
					<div
						onClick={() => {
							if (localStorage.getItem("role") === "admin") {
								window.location.href = "/admin";
							} else if (localStorage.getItem("role") === "student") {
								window.location.href = "/departments";
							} else {
								window.location.href = "/login";
							}
						}}
						style={{
							marginRight: 10,
							cursor: "pointer",
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<img
							src={require("./assets/logo.jpeg")}
							style={{ width: 200, height: 70, marginRight: 10 }}
						/>
					</div>
					{localStorage.getItem("role") === "student" && (
						<>
							<p
								style={{
									margin: 10,
									cursor: "pointer",
									fontSize: 18,
								}}
								onClick={() => {
									window.location.href = "/departments";
								}}
								className={window.location.pathname == "/departments" && "active"}
							>
								Enrollment
							</p>
							<p
								style={{
									margin: 10,
									cursor: "pointer",
									fontSize: 18,
								}}
								onClick={() => {
									window.location.href = "/enrolled-courses";
								}}
								className={window.location.pathname == "/enrolled-courses" && "active"}
							>
								Enrolled Courses
							</p>
						</>
					)}
					{localStorage.getItem("role") === "admin" && (
						<>
							<p
								style={{
									margin: 10,
									cursor: "pointer",
									fontSize: 18,
								}}
								onClick={() => {
									window.location.href = "/admin/departments";
								}}
								className={window.location.pathname == "/admin/departments" && "active"}
							>
								Departments
							</p>
							<p
								style={{
									margin: 10,
									cursor: "pointer",
									fontSize: 18,
								}}
								onClick={() => {
									window.location.href = "/admin/courses";
								}}
								className={window.location.pathname == "/admin/courses" && "active"}
							>
								Courses
							</p>
							<p
								style={{
									margin: 10,
									cursor: "pointer",
									fontSize: 18,
								}}
								onClick={() => {
									window.location.href = "/admin/sections";
								}}
								className={window.location.pathname == "/admin/sections" && "active"}
							>
								Sections
							</p>
							<p
								style={{
									margin: 10,
									cursor: "pointer",
									fontSize: 18,
								}}
								onClick={() => {
									window.location.href = "/admin/rooms";
								}}
								className={window.location.pathname == "/admin/rooms" && "active"}
							>
								Rooms
							</p>
						</>
					)}
					{localStorage.getItem("role") === "professor" && (
						<>
							{/* <p
								style={{
									margin: 10,
									cursor: "pointer",
									fontSize: 18,
								}}
								onClick={() => {
									window.location.href = "/professor/courses";
								}}
								className={window.location.pathname == "/professor/courses" && "active"}
							>
								Courses
							</p> */}
							<p
								style={{
									margin: 10,
									cursor: "pointer",
									fontSize: 18,
								}}
								onClick={() => {
									window.location.href = "/professor/sections";
								}}
								className={window.location.pathname == "/professor/sections" && "active"}
							>
								Sections
							</p>
						</>
					)}
				</div>
				{(localStorage.getItem("role") === "student" || localStorage.getItem("role") === "professor") && <p
                        style={{
					    fontWeight: 600,
                        fontSize: 16,
						marginLeft: 300,
                        marginTop: 22}}>
				{localStorage.getItem('firstName')+ ' ' + localStorage.getItem('lastName')}</p>}
	            {localStorage.getItem("role") === "admin" && <p
                         style={{
							fontWeight: 600,
                            fontSize: 20,
							marginLeft: 300,
                        marginTop: 22
	                         }}>Admin</p>}
				{localStorage.getItem("role") !== null && (
					<button
						style={{
							cursor: "pointer",
							fontSize: 18,
						}}
						onClick={() => {
							localStorage.clear();
							window.location.href = "/login";
						}}
					>
						Logout
					</button>
				)}
			</div>
			<Content>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/login" element={<Login />} exact />
						<Route path="/login/admin" element={<Login />} exact />
						<Route path="/register" element={<Register />} exact />

						{localStorage.getItem("role") === "admin" && (
							<>
								<Route path="/admin" element={<Admin />} />
								<Route
									path="/admin/departments"
									element={<Departments />}
									exact
								/>
								<Route path="/admin/rooms" element={<Rooms />} />
								<Route path="/admin/courses" element={<Courses />} />
								<Route path="/admin/courses/add" element={<AddCourse />} />
								<Route
									path="/admin/courses/update/:id"
									element={<UpdateCourse />}
								/>
								<Route path="/admin/professors" element={<Professors />} />
								<Route
									path="/admin/professors/update/:id"
									element={<UpdateProfessor />}
								/>
								<Route
									path="/admin/professors/add"
									element={<AddProfessor />}
								/>
								<Route path="/admin/sections" element={<Sections />} />
								<Route path="/admin/sections/add" element={<AddSection />} />
								<Route
									path="/admin/sections/update/:id"
									element={<UpdateSection />}
								/>
							</>
						)}
{localStorage.getItem("role") === "professor" && (
							<>
								{/* <Route path="/admin/courses" element={<Courses />} />
								<Route path="/admin/courses/add" element={<AddCourse />} />
								<Route
									path="/admin/courses/update/:id"
									element={<UpdateCourse />}
								/> */}
								<Route path="/professor/sections" element={<Sections />} />
								<Route path="/professor/sections/add" element={<AddSection />} />
								<Route
									path="/professor/sections/update/:id"
									element={<UpdateSection />}
								/>
								<Route path={"/home"} element={<Home />} />
							</>
						)}

						{localStorage.getItem("role") === "student" && (
							<>
							<Route path={"/home"} element={<Home />} />
								<Route path="/departments" element={<Departments />} />
								<Route
									path="/departments/:id/courses"
									element={<DepartmentCourses />}
								/>
								<Route
									path="/departments/:did/courses/:cid/sections"
									element={<CourseSections />}
								/>
								<Route path="/enrolled-courses" element={<EnrolledCourses />} />
							</>
						)}
					</Routes>
				</BrowserRouter>
			</Content>
		</Layout>
	);
}

export default App;
