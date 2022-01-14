import {
  Typography,
  makeStyles,
  darken,
  Grid,
  Paper,
  useTheme,
  Box,
  Container,
  Card,
  CardContent,
  Divider,
  Button,
} from '@material-ui/core'
import GraphQLIcon from '../components/icons/graphql.svg'
import JamstackIcon from '../components/icons/jamstack.svg'
import WebAppIcon from '@material-ui/icons/Language'
import ShieldIcon from '../components/icons/security.svg'
import Link from 'next/link'
import cs from 'classname'
import Nav from '../components/nav/Nav'
import PageWrapper from '../components/PageWrapper'
import { PRODUCT_NAME } from '../constants'
import { getGuides } from '../components/getGuides'
import SEO from '../components/Seo'
import Layer0Icon from '../components/icons/layer0-black.svg'

const Home = ({ navData }) => {
  const classes = useStyles()
  const theme = useTheme()

  const PriEm = ({ children, addlClasses = {} }) => (
    <span className={cs(classes.colorPrimary, classes.fontNormal, addlClasses)}>{children}</span>
  )
  const SecEm = ({ children }) => <span className={cs(classes.fontNormal)}>{children}</span>

  return (
    <PageWrapper nav={<Nav navData={navData} />}>
      <SEO />

      <div className={classes.hero}>
        <Typography variant="h2" style={{ maxWidth: 800, marginTop: 0, fontSize: '30px' }}>
          <Layer0Icon className={classes.logo} />
          <Box>
            The <PriEm>powerful</PriEm> CDN platform that integrates <PriEm>edge logic</PriEm> into
            your application code &amp; <PriEm>extends the edge</PriEm> to the browser.
          </Box>
        </Typography>
      </div>

      <Container maxWidth="md" className={classes.tiles}>
        <Grid container spacing={6}>
          <Grid item md={4} sm={6} xs={12}>
            <Link href="/guides/webapp_cdn_getting_started">
              <Card elevation={10} className={classes.card}>
                <Box className={classes.cardHeader}>
                  <div style={{ position: 'relative', marginRight: theme.spacing(1) }}>
                    <WebAppIcon
                      style={{
                        height: 40,
                        width: 40,
                        margin: theme.spacing(0, 0.5, 0, 0),
                      }}
                    />
                    <ShieldIcon
                      style={{
                        height: 24,
                        width: 24,
                        position: 'absolute',
                        right: 0,
                        bottom: 4,
                        borderRadius: '50%',
                      }}
                    />
                  </div>
                  <Typography variant="h2">WebApp CDN</Typography>
                </Box>
                <CardContent className={classes.cardContent}>
                  <Typography>
                    Accelerate and secure your app using the Layer0 global CDN and EdgeJS.
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Link href="/guides/jamstack_getting_started">
              <Paper elevation={10} className={classes.card}>
                <Box className={classes.cardHeader}>
                  <JamstackIcon
                    style={{
                      height: 48,
                      width: 48,
                      margin: theme.spacing(0, 0.5, 0, 0),
                    }}
                  />
                  <Typography variant="h2">Jamstack</Typography>
                </Box>
                <CardContent className={classes.cardContent}>
                  <Typography>
                    Deploy static and dynamic Jamstack sites that run on Layer0's serverless
                    functions.
                  </Typography>
                </CardContent>
              </Paper>
            </Link>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Link href="/guides/graphql">
              <Paper elevation={10} className={classes.card}>
                <Box className={classes.cardHeader}>
                  <GraphQLIcon
                    style={{
                      height: 40,
                      width: 40,
                      margin: theme.spacing(0.5, 1.5, 0.5, 0),
                    }}
                  />
                  <Typography variant="h2">GraphQL CDN</Typography>
                </Box>
                <CardContent className={classes.cardContent}>
                  <Typography>
                    Scale and secure your GraphQL API using the Layer0 global CDN and Edge JS.
                  </Typography>
                </CardContent>
              </Paper>
            </Link>
          </Grid>
        </Grid>
      </Container>
      <Divider />
      <div className={classes.tutorials}>
        <Container maxWidth="md">
          <Grid container spacing={4} >
            <Grid item xs={12}>
              <Typography variant="h2"> About {PRODUCT_NAME} </Typography>
            </Grid>
             
            <Grid item xl={12} md={4} sm={6} className={classes.tutorial} >            
              <div className={classes.aspectRatioLargeVideo}>              
                <iframe frameBorder={0} src="https://www.youtube.com/embed/GE0K2ecw_xA?rel=0" />                
              </div>              
            </Grid>          
           <Grid container spacing={4} maxwidth={"md"} className={classes.tiles} justify={'center'} >
            <Grid item md={4} sm={6} xs={12} className={classes.tutorial}>
              <Button
                  href="https://forum.layer0.co/c/product-feedback/2"
                  target="_blank"
                  variant="contained"
                  size="large"                                    
                  className={classes.limeButtonContained}
                >
              Provide Feedback
              </Button>
            </Grid>
              <Grid item md={4} sm={6} xs={12} className={classes.tutorial}>
                <Button
                    href="https://get.layer0.co/request-a-demo/"
                    target="_blank"
                    variant="outlined"
                    size="large"                
                    className={classes.limeButtonOutlined}                  
                  >
                  Schedule Demo
                </Button>
              </Grid>
            </Grid>        
          </Grid> 
          
        </Container>
      </div>
      <Divider />
      <div className={classes.tutorials}>
        <Container maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h2">{PRODUCT_NAME} Tutorials</Typography>
            </Grid>
            <Grid item md={4} sm={6} xs={12} className={classes.tutorial}>
              <h3>What &amp; Why</h3>
              <div className={classes.aspectRatio}>
                <iframe frameBorder={0} src="https://www.youtube.com/embed/sJ6AkTrcZvg?rel=0" />
              </div>
            </Grid>
            <Grid item md={4} sm={6} xs={12} className={classes.tutorial}>
              <h3>Deploying a GitHub Project</h3>
              <div className={classes.aspectRatio}>
                <iframe frameBorder={0} src="https://www.youtube.com/embed/F8uN03ps1As?rel=0" />
              </div>
            </Grid>
            <Grid item md={4} sm={6} xs={12} className={classes.tutorial}>
              <h3>How to Prefetch</h3>
              <div className={classes.aspectRatio}>
                <iframe frameBorder={0} src="https://www.youtube.com/embed/lfhSDCNgzfs?rel=0" />
              </div>
            </Grid>
            <Grid item md={4} sm={6} xs={12} className={classes.tutorial}>
              <h3>What are the {PRODUCT_NAME} DevTools?</h3>
              <div className={classes.aspectRatio}>
                <iframe frameBorder={0} src="https://www.youtube.com/embed/4AYQAvkc0UY?rel=0" />
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </PageWrapper>
  )
}

export default Home

export async function getStaticProps() {
  const [navData] = await Promise.all([getGuides()])

  return { props: { navData } }
}

const useStyles = makeStyles(theme => ({
  hero: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: theme.spacing(12),

    '& h1, & h2': {
      color: theme.palette.text.secondary,
      fontWeight: 300,
    },

    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(10),
    },

    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(7),
    },
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    '& svg': {
      fill: theme.palette.primary.main,
    },
  },
  cardContent: {
    paddingTop: 0,
  },
  card: {
    boxShadow: theme.shadows[4],
    cursor: 'pointer',
    borderRadius: theme.spacing(1),

    '&:hover': {
      boxShadow: theme.shadows[8],
    },

    '& h2': {
      ...theme.typography.h3,
      fontWeight: 'bold',
      margin: 0,
      opacity: 0.9,
      marginTop: 0,
    },

    height: '100%',

    '& p': {
      opacity: 0.6,
    },
  },
  choiceBox: {
    marginTop: '1.3rem',
  },
  fontNormal: {
    fontWeight: 'normal',
  },
  fontBold: {
    fontWeight: 'bold',
  },
  colorPrimary: {
    color: theme.palette.primary.main,
  },
  grid: {
    display: 'grid',
  },
  limeButtonContained: {
    backgroundColor:'#80c426',
    '&:hover': {
      backgroundColor: darken('#80c426', 0.1),
    },
    fontSize: '1.4rem', color: 'white', fontWeight:400, borderRadius: '5px'
  },
  limeButtonOutlined: {
    fontSize: '1.4rem', 
    backgroundColor: 'white', 
    color: 'black', 
    fontWeight:400, 
    border: '1px solid #81BB00', 
    borderRadius: '5px',
    '&:hover': {
      borderColor: darken('#81BB00', 0.1),
    },    
  },
  placeCenter: {
    placeItems: 'center',
  },
  alignItemsEnd: {
    alignItems: 'end',
  },
  alignItemsBaseline: {
    alignItems: 'baseline',
  },
  alignSelfEnd: {
    alignSelf: 'end',
  },
  headerChoice: {
    color: theme.palette.primary.main,
    fontSize: '1.4rem',
  },
  gettingStarted: {
    marginTop: '1em',
    color: theme.palette.text.primary,
    fontSize: '1.2em',
    textAlign: 'center',
    padding: 10,
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 5,
  },
  cardActionArea: {
    flex: 1,
  },
  logo: {
    margin: theme.spacing(0, 0, 4, -7),
    width: 300,
    [theme.breakpoints.up('sm')]: {
      width: 500,
    },
    [theme.breakpoints.up('md')]: {
      width: 600,
    },
  },
  tiles: {
    paddingBottom: theme.spacing(10),
  },
  tutorials: {
    paddingBottom: theme.spacing(8),
    '& h2': {
      textAlign: 'center',
      fontWeight: 'bold',
      paddingBottom: theme.spacing(2),
    },
    '& h3': {
      padding: theme.spacing(0, 0, 1, 0),
      margin: 0,
    },
  },
  tutorial: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    position: 'relative',
  },
  aspectRatioLargeVideo: {
    height: 0,
    paddingBottom: '60%',
    flex: 1,
    position: 'relative',
    boxShadow: theme.shadows[6],
    '& iframe': {
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
  },  
  aspectRatio: {
    height: 0,
    paddingBottom: '75%',
    flex: 1,
    position: 'relative',
    boxShadow: theme.shadows[6],
    '& iframe': {
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
  },
  buttonRow: {
    transition: 'color border-color 200ms linear',
    '&:hover': {
      borderColor: darken(theme.palette.secondary.light, 0.1),
    },
    '& span': {
      textDecoration: 'none',
    },
  },
  button: {
    transition: 'color border-color 200ms linear',
    '&:hover': {
      borderColor: darken(theme.palette.secondary.light, 0.1),
    },
    '& span': {
      textDecoration: 'none',
    },
    marginTop: 10,
  },
  buttonLink: {
    textDecoration: 'none',
    marginTop: 'auto',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}))
