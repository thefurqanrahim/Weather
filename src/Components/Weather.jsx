import React from "react";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import CloudIcon from "@mui/icons-material/Cloud";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Stack } from "@mui/material";
import { useState, useEffect } from "react";

const Weather = () => {
  const [search, setSearch] = useState("Karachi");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("")

  useEffect(() => {
    const fetchWeather = async () => {
      const res = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=06e1615ae3a0bd5006bc5617a65e50bf`;
      // setData(await res.json())
      const response = await fetch(res)
      const resJson = await response.json();
      console.log(resJson)
      // console.log(resJson.weather[0].description)
      setData(resJson.main, resJson.description);
      // setData(resJson.main, resJson.weather);
    }
    fetchWeather() ;
  }, [search]);
  


  let d = new Date();
  let date = d.getDate();
  let month = d.toLocaleString("default", {month:'long'});
  let year = d.getFullYear();
  let day = d.toLocaleString("default", {weekday:'long'});
  

  let time = d.toLocaleString([],{
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
  
  const search1 = (elem) => {
    // elem.style.background = "trnasparent";
    setInput(elem.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(input);
    console.log(search)
    setInput("")
  }
  
  
  // {let temp = (data.temp - 273.15).toFixed(2);
  //   let temp_min = (data.temp_min - 273.15).toFixed(2);
  //   let temp_max = (data.temp_max - 273.15).toFixed(2);
  return (
    <>
    <div className="headest">
         <div className="image12">
        <img src={"https://source.unsplash.com/600x900/?nature,water"} alt="" />
      <Box className="container">
        <Grid container item xs={10} className="main">
          <Grid item lg={8} md={6} sm={6}>
            <Typography variant="h4" component="h6" className="heading">
              Weather App
            </Typography>
          </Grid>
          <Grid item lg={4} md={6} sm={6}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search"
                name="search"
                value={input}
                onChange={search1}
              />
              <button className="btn" type="submit">
              <SearchIcon />
              </button>
            </form>
          </Grid>
   {!data ? (
     <h1>No Data found</h1>
   ) : ( 
<>
          <Grid className="second_part">
            <Grid>
              <Typography variant="h3" component="h3">
             {search}
              </Typography>
            </Grid>
            <Typography variant="h6" component="h6">
                  {time}
                </Typography>
            <Grid>
              <Stack direction="row" spacing={1}>
                <Typography variant="h6" component="h6">
                  {day}
                </Typography>
                <Typography variant="h6" component="h6">
                  {date},
                </Typography>
                <Typography variant="h6" component="h6">
                  {month},
                </Typography>
                <Typography variant="h6" component="h6">
                  {year}
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          <Grid className="three">
            <Typography variant="span" className="icon">
              <CloudIcon style={{ fontSize: 100, marginTop: 30 }} />
            </Typography>
            <Typography variant="h3">{(data.temp - 273.15).toFixed(2)} °C</Typography>
            <Grid className="four">
              <Typography variant="h2" component="h6">{data.weather}</Typography>
              <Typography> {(data.temp_min - 273.15).toFixed(2)} °C &nbsp; | &nbsp; {(data.temp_max - 273.15).toFixed(2)} °C</Typography>
            </Grid>
          </Grid>
          </>
   )}
        </Grid>
      </Box>
      </div>
      </div>
    </>
);
};

export default Weather;
