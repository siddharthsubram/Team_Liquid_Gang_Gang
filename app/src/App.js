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
    this.getData('team', 'valorant');
    let size = 500;
    console.log(this.myRef);
    let svg = d3.select(this.myRef.current)
      .append('svg')
      .attr('width', size)
      .attr('height', size);

    let rect_width = 95;
    svg.selectAll('rect')
      .data(this.dataset)
      .enter()
      .append('rect')
      .attr('x', (d, i) => 5 + i * (rect_width + 5))
      .attr('y', d => size - d)
      .attr('width', rect_width)
      .attr('height', d => d)
      .attr('fill', 'teal');
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
        console.log(this.state.results);
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
  }
  converttoCSV(json){
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(json[0])
    let csv = json.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    csv.unshift(header.join(','))
    csv = csv.join(',\r\n')
    console.log(csv)
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
