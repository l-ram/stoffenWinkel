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
import React, { useEffect } from "react";
import "./homepage.scss";
import ReactGA from "react-ga4";

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

const Home = () => {
  useEffect(() => {
    ReactGA.set({ page: window.location.href + window.location.search });
    console.log("ga ran");
  }, [window.location.href]);

  const userCuts = [
    {
      id: 1,
      length: 10,
      count: 5,
    },
    {
      id: 2,
      length: 25,
      count: 1,
    },
    {
      id: 3,
      length: 50,
      count: 1,
    },
    {
      id: 4,
      length: 30,
      count: 3,
    },
    {
      id: 5,
      length: 5,
      count: 7,
    },
  ];
  const container = 100;

  UseOneDPacking({ userCuts, container });

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
