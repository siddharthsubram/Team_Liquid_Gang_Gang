import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Navbar } from "./Components/Navbar/Navbar";
import axios from 'axios';
import * as d3 from "d3";
import { MuiThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'; // responseiveFontSizes needs testing
import kryptix from './assets/kryptix.PNG';
import ec1s from './assets/ec1s.PNG';
import l1nk from './assets/l1nk.png';
import scream from './assets/scream.PNG';
import soulcas from './assets/soulcas.PNG';
import agentpic from './assets/agentphoto.png';
import haven from './assets/haven.png';
import bind from './assets/bind.png';
import split from './assets/split.png';
import ascent from './assets/ascent.png';
import './App.css';

let theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#0f1923"
    }
  },
});


theme = responsiveFontSizes(theme);

const maps = [
  {
    title: 'Haven', 
    pic: haven,
  },
  {
    title: 'Bind', 
    pic: bind,
  },
  {
    title: 'Split', 
    pic: split,
  },
  {
    title: 'Ascent', 
    pic: ascent,
  },
]

const tiers = [
  {
    title: 'Kyptix',
    subheader: 'James Affleck',
    pic: kryptix,
    description: ['Cypher', 'Killjoy'],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'ec1s',
    subheader: 'Adam Eccles',
    pic: ec1s,
    description: [
      'Breach',
      'Omen',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    title: 'ScreaM',
    subheader: 'Adil Benrlitom',
    pic: scream,
    description: [
      'Sage',
      'Reyna',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
  {
    title: 'soulcas',
    subheader: 'Dom Sulcas',
    pic: soulcas,
    description: [
      'Raze',
      'Phoenix',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
  {
    title: 'L1NK',
    subheader: 'Travis Mendoza',
    pic: l1nk,
    description: [
      'Sage',
      'Reyna',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];


export class App extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      wins: {},
      liquid: [],
      fish: [],
      g2: [],
    }
    this.dataset = [100, 200, 300, 400, 500];
    this.getData = this.getData.bind(this);
  }
  componentDidMount() {
    this.getData('matchfeed', 'valorant');
  }

  async getData(endpoint, wiki) {
    const liquid = 'http://localhost:4200/teamliquid';
    console.log('fetching data from', liquid);
    let l = await axios.get(liquid)
      .catch(function (error) {
        console.log(error);
      });

    const fish = 'http://localhost:4200/fish123';
    console.log('fetching data from', fish);
    let f = await axios.get(fish)
      .catch(function (error) {
        console.log(error);
      });

    const g2 = 'http://localhost:4200/g2esports';
    console.log('fetching data from', g2);
    let g = await axios.get(g2)
      .catch(function (error) {
        console.log(error);
      });
    let liquiddata = l.data.result;
    let fishdata = f.data.result;
    let g2data = g.data.result;
    // console.log('responses', liquiddata, fishdata, g2data);
    let teamwins = {};
    let totalgames = 0;
    for (const l of liquiddata) {
      if (l['opponent1score'] > l['opponent2score'])
        teamwins[l['opponent1']] = (teamwins[l['opponent1']] + 1) || 1;
      else
        teamwins[l['opponent2']] = (teamwins[l['opponent2']] + 1) || 1;
      totalgames++;
    }

    for (const l of fishdata) {
      if (l['opponent1score'] > l['opponent2score']) {
        if (l['opponent1'] === 'fish123')
          teamwins['Team Liquid'] = (teamwins['Team Liquid'] + 1) || 1;
        else 
          teamwins[l['opponent1']] = (teamwins[l['opponent1']] + 1) || 1;
      }
      else {
        if (l['opponent2'] === 'fish123')
          teamwins['Team Liquid'] = (teamwins['Team Liquid'] + 1) || 1;
        else 
          teamwins[l['opponent2']] = (teamwins[l['opponent2']] + 1) || 1;
      }
      totalgames++;
    }

    for (const l of g2data) {
      if (l['opponent1score'] > l['opponent2score'])
        teamwins[l['opponent1']] = (teamwins[l['opponent1']] + 1) || 1;
      else
        teamwins[l['opponent2']] = (teamwins[l['opponent2']] + 1) || 1;
      totalgames++;
    }

    console.log('# teams', Object.keys(teamwins).length, 'teamwins', teamwins, 'totalgames', totalgames);
    this.setState({
      wins: teamwins,
    });

    let data = [];
    for (var key of Object.keys(teamwins)) {
      if (teamwins[key] > 1)
        data.push({ "TeamName": key, "Winrate": teamwins[key], "Color": '#5da9e8' });
    }
    // let myData = [
    //   { "TeamName": 'Team Liquid', "Winrate": 75, "Color": '#5da9e8' },
    //   { "TeamName": 'G2 Esports', "Winrate": 20, "Color": '#ba9c9f' },
    //   { "TeamName": 'Funplus Phoenix', "Winrate": 55, "Color": '#ff0015' },
    //   { "TeamName": 'Fish123', "Winrate": 63, "Color": 'green' },
    //   { "TeamName": 'OfflineTV', "Winrate": 23, "Color": 'Pink' }
    // ]
    console.log('win data', data);

    var margin = { top: 10, right: 30, bottom: 90, left: 200 },
      width = 1500 - margin.left - margin.right,
      height = 700 - margin.top - margin.bottom;

    // creating SVG
    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Creating X axis scale
    var x = d3.scaleLinear()
      .domain([0, 40])
      .range([0, width])

    //Creating Y axis scale  
    var y = d3.scaleBand()
      .domain(data.map(function (d) { return d.TeamName }))
      .range([height, 0])

    //adding y axis 
    svg.append("g")
      .call(d3.axisLeft(y))
      .attr("font-size", 20)


    svg.append("text")
      .attr("x", (width / 2))
      .attr("y", height + 45)
      .attr("font-size", "20px")
      .attr("font-weight", "bold")
      .text("Win rate(%)")

    //X axis 
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .attr("font-size", 20)

    //Creating X axis gridlines (We dont need y axis since the data is printed only left to right)      
    function make_x_grid() {
      return d3.axisBottom(x).ticks(20);
    }


    //Appending gridlines first so that the gridlines appear below the rest of the graph 
    svg.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .attr("Opacity", 0.1)
      .call(make_x_grid()
        .tickSize(-height)
        .tickFormat("")
      )

    svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", x(0))
      .attr("y", function (d) { return y(d.TeamName) + 5 })
      .attr("width", function (d) { return x(d.Winrate); })
      .attr("height", y.bandwidth() - 20)
      .style("fill", function (d) { return (d["Color"]) })


  }


  converttoCSV(json) {
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(json[0])
    let csv = json.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    csv.unshift(header.join(','))
    csv = csv.join(',\r\n')
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
          <Navbar />
          {/* Hero unit */}
          {/* End hero unit */}
          <div className='vid-wrapper'>
            <img src={agentpic} className='agent-pic' alt="Valorant Agents" />
          </div>
          <Container maxWidth="md" component="main">
            <Grid container spacing={5} alignItems="flex-end">
              {tiers.map((tier) => (
                // Enterprise card is full width at sm breakpoint
                <Grid item key={tier.title} xs={6 } sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                  <Card>
                    <CardHeader
                      title={tier.title}
                      subheader={tier.subheader}
                      titleTypographyProps={{ align: 'center' }}
                      subheaderTypographyProps={{ align: 'center' }}
                      className='cardHeader'
                    />
                    <CardContent>
                      <div className='cardPricing'>
                        <img className='pic' src={tier.pic} alt="Player Pic" />
                      </div>
                      <ul>
                        {tier.description.map((line) => (
                          <Typography component="li" variant="subtitle1" align="center" key={line}>
                            {line}
                          </Typography>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>

          <div className='vid-wrapper'>
            <iframe className='vid'src="https://www.youtube.com/embed/FH5C16YsmXA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div ref={this.myRef}>
          </div>
          {this.state.liquid.map((result) => {
            return (
              <h4>{result.opponent1} vs. {result.opponent2}</h4>
            )
          })}
          {/* End footer */}
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default App;
