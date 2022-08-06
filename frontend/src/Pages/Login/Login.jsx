import React, { useEffect, useState } from "react";
import {
	Stack,
	Container,
	Button,
	Title,
	Text,
	createStyles,
	Image,
	Center,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const useStyles = createStyles(() => ({
		Title: {
			fontSize: "3rem",
			fontWeight: "bold",
			textAlign: "center",
			fontFamily: "Lora,serif !important",

			"@media (max-width: 460px)": {
				fontSize: "2.5rem",
			},
			"@media (max-width: 370px)": {
				fontSize: "1.95rem",
			},
		},
	}));

	const navigate = useNavigate();

	const { classes } = useStyles();

	const [title, setTitle] = useState("Welcome Back To");

	useEffect(() => {
		// Check if user visits the app for the first time
		if (localStorage.getItem("firstVisit") === null) {
			setTitle("Welcome To");
			localStorage.setItem("firstVisit", "false");
		}
	}, [title]);

	const smallerScreen = useMediaQuery("(max-width: 370px)");

	const handleLogin = () => {
		// window.open("http://localhost:5000/api/auth/google", "_self");
		navigate("/api/auth/google");
	};

	return (
		<Center style={{ height: "90vh" }}>
			<Container size={600}>
				<Stack spacing="xs">
					<Title className={classes.Title} mt="md">
						{title}
					</Title>
					<Image
						height={smallerScreen ? 150 : 200}
						src="/Logo.png"
						alt="logo"
					/>
					<Text align="center" color="dimmed">
						Register or Login to use this service
					</Text>
					<Button
						leftIcon={<img src="./google.svg" alt="google logo" />}
						onClick={handleLogin}
						variant="default"
						size={smallerScreen ? "md" : "lg"}
						mt="xs"
					>
						Continue with Google
					</Button>
				</Stack>
			</Container>
		</Center>
	);
};

export default Login;
