import AdbIcon from "@mui/icons-material/Adb";
import { Avatar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ConnyCar
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link>tttt</Link>
          </Typography>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
