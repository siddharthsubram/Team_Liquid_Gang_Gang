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

let theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#0f1923"
    }
  },
});


theme = responsiveFontSizes(theme);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    price: '15',
    description: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    title: 'Enterprise',
    price: '30',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];
const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];


export class App extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      results: [],
    }
    this.dataset = [100, 200, 300, 400, 500];
    this.getData = this.getData.bind(this);
  }
  componentDidMount() {
    // const endpoints = ['team', 'match', 'game', 'tournament'];
    // for (const endpt of endpoints)
    this.getData('matchfeed', 'valorant');
    let size = 500;
    console.log(this.myRef);
   
      var data = [ 
         {"TeamName":'Team Liquid', "Winrate":75, "Color": '#5da9e8'}, 
         {"TeamName":'G2 Esports', "Winrate":20, "Color": '#ba9c9f' }, 
         {"TeamName":'Funplus Phoenix', "Winrate":55, "Color": '#ff0015'}, 
         {"TeamName":'Fish123', "Winrate":63, "Color": 'green' }, 
         {"TeamName":'OfflineTV', "Winrate":23, "Color": 'Pink'}
      ]
   

       var margin = {top: 10, right: 30, bottom: 90, left: 200},
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
            .domain([0, 100])
            .range([ 0, width])

        //Creating Y axis scale  
        var y = d3.scaleBand()
            .domain(data.map(function(d){return d.TeamName}))
            .range([ height, 0])  
        
       //adding y axis 
        svg.append("g")
            .call(d3.axisLeft(y))
            .attr("font-size",20)

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
            .attr("font-size",20)
      
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
            .attr("x", x(0) )
            .attr("y", function(d) { return y(d.TeamName) + 20; })
            .attr("width", function(d) { return x(d.Winrate); })
            .attr("height", y.bandwidth()- 50 )
            .style("fill", function(d){ return(d["Color"])})
             
      
  }

  getData(endpoint, wiki) {
    const url = 'http://localhost:4200/' + endpoint + '/' + wiki;
    console.log('fetching data from', url);
    axios.get(url)
      .then(response => {
        console.log('response', response.data.result);
        this.setState({
          results: response.data.result,
        });
        console.log(this.state.results); // legit data
        this.converttoCSV(this.state.results);

        // console.log('state', this.state);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
      
      d3.csv("")
  }
    
   
  converttoCSV(json){
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(json[0])
    let csv = json.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    csv.unshift(header.join(','))
    csv = csv.join(',\r\n')
    // console.log(csv)
  }

  render() {

    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
          <Navbar />
          {/* Hero unit */}
          <Container maxWidth="sm" component="main" className='heroContent'>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Pricing
          </Typography>
            <Typography variant="h5" align="center" color="textSecondary" component="p">
              Quickly build an effective pricing table for your potential customers with this layout.
              It&apos;s built with default Material-UI components with little customization.
          </Typography>
          </Container>
          {/* End hero unit */}
          <Container maxWidth="md" component="main">
            <Grid container spacing={5} alignItems="flex-end">
              {tiers.map((tier) => (
                // Enterprise card is full width at sm breakpoint
                <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                  <Card>
                    <CardHeader
                      title={tier.title}
                      subheader={tier.subheader}
                      titleTypographyProps={{ align: 'center' }}
                      subheaderTypographyProps={{ align: 'center' }}
                      action={tier.title === 'Pro' ? <StarIcon /> : null}
                      className='cardHeader'
                    />
                    <CardContent>
                      <div className='cardPricing'>
                        <Typography component="h2" variant="h3" color="textPrimary">
                          ${tier.price}
                        </Typography>
                        <Typography variant="h6" color="textSecondary">
                          /mo
                      </Typography>
                      </div>
                      <ul>
                        {tier.description.map((line) => (
                          <Typography component="li" variant="subtitle1" align="center" key={line}>
                            {line}
                          </Typography>
                        ))}
                      </ul>
                    </CardContent>
                    <CardActions>
                      <Button fullWidth variant={tier.buttonVariant} color="primary">
                        {tier.buttonText}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
          {/* Footer */}
          <Container maxWidth="md" component="footer" className='footer'>
            <Grid container spacing={4} justify="space-evenly">
              {footers.map((footer) => (
                <Grid item xs={6} sm={3} key={footer.title}>
                  <Typography variant="h6" color="textPrimary" gutterBottom>
                    {footer.title}
                  </Typography>
                  <ul>
                    {footer.description.map((item) => (
                      <li key={item}>
                        <Link href="#" variant="subtitle1" color="textSecondary">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Grid>
              ))}
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </Container>
          <div ref={this.myRef}>
          </div>
          {/* End footer */}
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default App;
