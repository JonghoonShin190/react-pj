import * as React from "react";
import Box from "@mui/material/Box";
import SquareFullIcon from "@mui/icons-material/SquareFull";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function RatingBar() {
  const [value, setValue] = React.useState(2);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "8px" // 원하는 간격으로 설정
      }}
    >
      <Typography component="legend">Controlled</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        emptyIcon={<SquareFullIcon style={{ fill: "gray" }} />}
        icon={<SquareFullIcon style={{ fill: "yellow" }} />}
      />
    </Box>
  );
}