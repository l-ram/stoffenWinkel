import {
  Card,
  CardHeader,
  Skeleton,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import React from "react";
import "./homepage.scss";

interface MediaProps {
  loading?: boolean;
}

function Media(props: MediaProps) {
  const { loading = false } = props;

  return (
    <Card
      sx={{
        width: "30%",
        height: "25",
        m: 2,
      }}
    >
      <CardHeader
        avatar={
          loading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          ) : (
            <Avatar
              alt="Ted talk"
              src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
            />
          )
        }
        action={
          loading ? null : (
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          )
        }
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            "Ted"
          )
        }
        subheader={
          loading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            "5 hours ago"
          )
        }
      />
      {loading ? (
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      ) : (
        <CardMedia
          component="img"
          height="140"
          image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
          alt="Nicola Sturgeon on a TED talk stage"
        />
      )}
      <CardContent>
        {loading ? (
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <Typography variant="body2" color="text.secondary" component="p">
            {
              "Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:"
            }
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

const data = [
  {
    id: "819da04c-5279-41b5-b305-79da2b6de082",
    period_start: "2024-02-21",
    total_auth_post_requests: 6,
  },
  {
    id: "94f90626-2fcc-4d45-9250-45e035e2e997",
    period_start: "2024-02-22",
    total_auth_post_requests: 27,
  },
  {
    id: "0a6976b1-2add-427b-932e-98c34eb85a58",
    period_start: "2024-02-23",
    total_auth_post_requests: 9,
  },
  {
    id: "3e6f326d-104f-47f5-a5a9-dbad9235c885",
    period_start: "2024-02-24",
    total_auth_post_requests: 6,
  },
  {
    id: "1933f781-1864-4163-b6be-bce8c53258a5",
    period_start: "2024-02-25",
    total_auth_post_requests: 5,
  },
  {
    id: "6ce818b3-b416-499c-8ed1-78964be0f82a",
    period_start: "2024-02-26",
    total_auth_post_requests: 20,
  },
  {
    id: "12b8d45a-ff5f-40dc-94ee-2a8c8fd99c21",
    period_start: "2024-02-27",
    total_auth_post_requests: 35,
  },
];

const Home = () => {
  return (
    <div className="homepage">
      <p>Welcome to De Stoffen Winkel</p>
      <br></br>
      <p>Homepage coming soon...</p>
      <Media loading />
    </div>
  );
};

export default Home;
