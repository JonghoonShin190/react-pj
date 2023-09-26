import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import logo1 from "../img/logo1.png";
import { Link } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Container from "@mui/material/Container";

export const sections = [
    { title: "학원 정보", url: "#" },
    { title: "리뷰", url: "#" },
    { title: "자유 게시판", url: "#" },
    { title: "마이페이지", url: "#" },
];

const defaultTheme = createTheme();

function MainHeader(props) {
    const { sections } = props;

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <React.Fragment>
                    <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <img
                            src={logo1}
                            alt="HakView"
                            style={{ width: "100px", height: "auto" }}
                        />
                        <Typography
                            component="h1"
                            variant="h3"
                            color="text.secondary"
                            fontSize="30px"
                            fontWeight="700"
                            align="center"
                            noWrap
                            sx={{ flex: 1 }}
                        >
                            {sections.map((section, index) => (
                                <React.Fragment key={section.title}>
                                    <Button
                                        color="inherit"
                                        href={section.url}
                                        fontSize="30px"
                                        sx={{
                                            marginRight: "50px",
                                            textAlign: "center",
                                            fontWeight: "700",
                                        }}
                                    >
                                        {section.title}
                                    </Button>
                                    {index < sections.length - 1 && ( // 마지막 버튼이 아닐 때만 간격을 추가
                                        <span style={{ marginRight: "50px" }}></span>
                                    )}
                                </React.Fragment>
                            ))}
                        </Typography>
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                        {<Link to="/login">
                            <Button variant="outlined" size="small">
                                로그인
                            </Button>
                        </Link>}
                    </Toolbar>

                </React.Fragment>
            </Container>
        </ThemeProvider>
    );
}

MainHeader.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })
    ).isRequired,
    title: PropTypes.string.isRequired,
};

export default MainHeader;