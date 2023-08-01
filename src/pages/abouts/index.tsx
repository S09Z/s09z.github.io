// eslint-disable-next-line @next/next/no-img-element
import Link from "next/link";
import { useRouter } from "next/router";

import { Grid, Avatar, Typography } from "@mui/material";

const assetPrefix = ".";

const AboutsPage = () => {
  const { locale } = useRouter();

  return (
    <>
      <Grid id="cards">
        <Grid className="card">
          <Grid className="card-content">
            <Grid className="card-image">
              <i className="fa-duotone fa-apartment"></i>
            </Grid>
            <Grid className="card-info-wrapper">
              <Grid className="card-info">
                <i className="fa-duotone fa-apartment"></i>
                <Grid className="card-info-title">
                  <h3>Apartments</h3>  
                  <h4>Places to be apart. Wait, what?</h4>
                </Grid>    
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid className="card">
          <Grid className="card-content">
            <Grid className="card-image">
              <i className="fa-duotone fa-unicorn"></i>
            </Grid>
            <Grid className="card-info-wrapper">
              <Grid className="card-info">
                <i className="fa-duotone fa-unicorn"></i>
                <Grid className="card-info-title">
                  <h3>Unicorns</h3>  
                  <h4>A single corn. Er, I mean horn.</h4>
                </Grid>    
              </Grid>  
            </Grid>
          </Grid>
        </Grid>
        <Grid className="card">
          <Grid className="card-content">
            <Grid className="card-image">
              <i className="fa-duotone fa-blender-phone"></i>
            </Grid>
            <Grid className="card-info-wrapper">
              <Grid className="card-info">
                <i className="fa-duotone fa-blender-phone"></i>
                <Grid className="card-info-title">
                  <h3>Blender Phones</h3>  
                  <h4>These absolutely deserve to exist.</h4>
                </Grid>    
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid className="card">
          <Grid className="card-content">
            <Grid className="card-image">
              <i className="fa-duotone fa-person-to-portal"></i>
            </Grid>
            <Grid className="card-info-wrapper">
              <Grid className="card-info">
                <i className="fa-duotone fa-person-to-portal"></i>
                <Grid className="card-info-title">
                  <h3>Adios</h3>  
                  <h4>See you...</h4>
                </Grid>    
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid className="card">
          <Grid className="card-content">
            <Grid className="card-image">
              <i className="fa-duotone fa-person-from-portal"></i>
            </Grid>
            <Grid className="card-info-wrapper">
              <Grid className="card-info">
                <i className="fa-duotone fa-person-from-portal"></i>
                <Grid className="card-info-title">
                  <h3>I mean hello</h3>  
                  <h4>...over here.</h4>
                </Grid>    
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid className="card">
          <Grid className="card-content">
            <Grid className="card-image">
              <i className="fa-duotone fa-otter"></i>
            </Grid>
            <Grid className="card-info-wrapper">
              <Grid className="card-info">
                <i className="fa-duotone fa-otter"></i>
                <Grid className="card-info-title">
                  <h3>Otters</h3>  
                  <h4>Look at me, imma cute lil fella.</h4>
                </Grid>    
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Link id="source-link" className="link" href="https://linear.app/features" target="_blank">
        <i className="fa-solid fa-link"></i>
        <span className="roboto-mono">Source</span>
      </Link>

      <Link id="youtube-link" className="link" href="https://youtu.be/htGfnF1zN4g" target="_blank">
        <i className="fa-brands fa-youtube"></i>
        <span>5 min Tutorial</span>
      </Link>
    </>
  );
};

export default AboutsPage;