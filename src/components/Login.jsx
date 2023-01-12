import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import { useUserLoginMutation } from "state/api";
import { getCurrentUser } from "../services/authn.service";

function Login() {
    const theme = useTheme();
    const [userLogin] = useUserLoginMutation();
    //Redirect user
    const navigate = useNavigate();
    let location = useLocation();

    //Prevent user from going back to the login page if already logged in
    useEffect(() => {
        const currentUser = getCurrentUser();
        if (currentUser) {
            navigate("/dashboard", { replace: true });
        }
    });

    let from = location.state?.from?.pathname || "/dashboard";

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const user = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        try {
            const res = await userLogin(user);
            const tokenKey = "token";

            if (!res.error) {
                navigate(from, { replace: true }); //redirect the user
                localStorage.setItem(tokenKey, res.data);
            }
        } catch (error) {
            alert(error.data); //TODO: Proper handling
        }
    };

    return (
        <div
            style={{
                background: theme.palette.background.default,
                width: "100vw%",
                height: "100vh",
            }}
        >
            <Container component="main" maxWidth="sm" sx={{ padding: 2 }}>
                <Box
                    sx={{
                        mt: "25%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        bgcolor: theme.palette.transparent,
                        padding: 2,
                        borderRadius: 2,
                    }}
                >
                    <Avatar
                        sx={{ m: 1, bgcolor: theme.palette.secondary.main }}
                    >
                        <LockOutlinedIcon
                            sx={{ color: theme.palette.color.alt }}
                        />
                    </Avatar>
                    <Typography component="h1" variant="h5" fontSize="1.5rem">
                        Sign in
                    </Typography>
                    <Typography component="h1" variant="h5" mt="1rem">
                        To log in, use the email{" "}
                        <span
                            style={{ fontWeight: "bold", fontSize: "1.2rem" }}
                        >
                            demo@immoinc.com
                        </span>{" "}
                        with the password{" "}
                        <span
                            style={{ fontWeight: "bold", fontSize: "1.2rem" }}
                        >
                            Demo-user
                        </span>
                        .
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                bgcolor: theme.palette.secondary.main,
                                color: theme.palette.color.alt,
                                fontWeight: "bold",
                                pt: 2,
                                pb: 2,
                                mt: 3,
                                mb: 2,
                                "&:hover": {
                                    bgcolor: theme.palette.secondary.light,
                                },
                            }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

export default Login;
