import { type Ad } from "../../types";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface CardItemProps {
  ad: Ad;
}
const CardContainer = styled(Card)(({ theme }) => ({
  width: 320,
  display: "flex", // чтобы CardActions прилип снизу
  flexDirection: "column",
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
}));

export const CardItem = ({ ad }: CardItemProps) => {
  const priceFormatted =
    ad.price !== undefined
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(ad.price)
      : "";

  return (
    <CardContainer>
      {/* изображение сверху */}
      <CardMedia
        component="img"
        height="180"
        image={
          ad.photo ??
          "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
        }
        alt={ad.name}
      />

      {/* заголовок + подзаголовок */}
      <CardHeader title={ad.name} />

      {/* описание, локация, цена */}
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="body2" color="text.secondary" mb={1}>
          {ad.description}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {ad.location}
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 1 }}>
          {priceFormatted}
        </Typography>
      </CardContent>

      {/* кнопка-ссылка внизу */}
      <CardActions>
        <Button
          size="small"
          component={RouterLink}
          to={`/item/${ad.type}/${ad.id}`}
        >
          See more
        </Button>
      </CardActions>
    </CardContainer>
  );
};
