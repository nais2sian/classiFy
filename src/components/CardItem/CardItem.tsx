import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import { type Ad } from "../../types";
import styled from "@emotion/styled";

interface CardItemProps {
  ad: Ad;
}

export const CardItem = ({ ad }: CardItemProps) => {
  const CardContainer = styled(Card)`
    width: 100%;
  `;
  return (
    <CardContainer>
      <CardHeader component="h3" title={ad.name} />
      <CardContent>
        <p>{ad.type}</p>
        <p>{ad.description}</p>
        <p>{ad.location}</p>
        <span>{ad.price}</span>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <Link to={`/item/${ad.type}/${ad.id}`}>See more</Link>
      </CardContent>
    </CardContainer>
  );
};
