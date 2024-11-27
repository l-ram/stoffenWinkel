import { useEffect, useState } from "react";
import { IFavouritesObject, IFavouritesArray } from "../types";
import { getFavourites } from "../db/db_apis";
import ReactGA from "react-ga4";

const Favourites = () => {


  const { favourites, loading, error} = getFavourites();

  const [searchText, setSearchText] = useState<string>('');
  const [filteredFaves, setFilteredFaves] = useState(favourites);
  console.log(searchText);
  const onSearchChange = (search: string) => {
      setSearchText(search);
  }
  useEffect(() => {
      const newfilteredFavourites = filteredFaves.filter((faveFilter) => {
          return faveFilter.title.toLowerCase().includes(searchText);
      });

      setFilteredFaves(newfilteredFavourites);

  }, [searchText]);


  useEffect(() => {
    ReactGA.set({ page: window.location.href + window.location.search });
    console.log("ga ran");
  }, []);


  return ( 
  
  <div>

            <Box sx={{
                '& > :not(style)': { mt: 15, width: '25ch' },
            }}>
                <text

                    id="filled-basic"
                    label="Filter"
                    variant="filled"
                    onChange={(e) => { onSearchChange(e.target.value) }}

                />
            </Box>

            <Grid container
                padding={6}
                marginTop={5}
                alignContent={"center"}
                spacing={3}
            >
                {filteredFaves.map((nasa, key: number) => (
                    <Grid item xs={12} sm={6} md={4} key={key}>
                        <Card sx={{ width: '100%', maxWidth: 800, margin: 'auto' }}>
                            <CardMedia
                                component="img"
                                src={nasa.url}
                                onClick={() => { openInNewTab(nasa.hdurl) }}
                            >
                            </CardMedia>
                            <CardContent>
                                <Typography>{nasa.title}</Typography>
                                <Typography>{`${nasa.explanation.substring(0, 50)}...`}</Typography>
                                <Button onClick={() => {
                                    setModalData(nasa.explanation);
                                    handleOpen();
                                }}>
                                    Expand explanation
                                </Button>

                                <Typography>{nasa.date}</Typography>
                                <Typography>{nasa.copyright}</Typography>
                                <button data-button-key={nasa.url} color="error" onClick={(e) => {
                                  return e
                                  
                                }}>
                                    <Cancel></Cancel>
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </div>

              );
            }

export default Favourites
