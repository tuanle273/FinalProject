import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">
              The page you’re looking for doesn’t exist.
            </Typography>
            <Button variant="contained">Back Home</Button>
          </Grid>
          <Grid xs={6}>
            <img
              src="https://img.freepik.com/free-vector/404-error-lost-space-concept-illustration_114360-7971.jpg?w=740&t=st=1672489753~exp=1672490353~hmac=2510cdcb902fbce0273a583badebc6c297574cfb70e7dcbdc80bf874b1bf3b2e"
              alt=""
              alignItems="center"
              width={500}
              height={500}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
