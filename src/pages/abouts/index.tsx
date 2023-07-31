// eslint-disable-next-line @next/next/no-img-element
import Link from "next/link";
import { useRouter } from "next/router";

import { Grid, Avatar } from "@mui/material";

const assetPrefix = ".";

const AboutsPage = () => {
  const { locale } = useRouter();

  return (
    <>
      <Grid id="cards">
        <Grid class="card">
          <Grid class="card-content">
            <Grid class="card-image">
              <i class="fa-duotone fa-apartment"></i>
            </Grid>
            <Grid class="card-info-wrapper">
              <Grid class="card-info">
                <i class="fa-duotone fa-apartment"></i>
                <Grid class="card-info-title">
                  <h3>Apartments</h3>  
                  <h4>Places to be apart. Wait, what?</h4>
                </Grid>    
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid class="card">
          <Grid class="card-content">
            <Grid class="card-image">
              <i class="fa-duotone fa-unicorn"></i>
            </Grid>
            <Grid class="card-info-wrapper">
              <Grid class="card-info">
                <i class="fa-duotone fa-unicorn"></i>
                <Grid class="card-info-title">
                  <h3>Unicorns</h3>  
                  <h4>A single corn. Er, I mean horn.</h4>
                </Grid>    
              </Grid>  
            </Grid>
          </Grid>
        </Grid>
        <Grid class="card">
          <Grid class="card-content">
            <Grid class="card-image">
              <i class="fa-duotone fa-blender-phone"></i>
            </Grid>
            <Grid class="card-info-wrapper">
              <Grid class="card-info">
                <i class="fa-duotone fa-blender-phone"></i>
                <Grid class="card-info-title">
                  <h3>Blender Phones</h3>  
                  <h4>These absolutely deserve to exist.</h4>
                </Grid>    
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid class="card">
          <Grid class="card-content">
            <Grid class="card-image">
              <i class="fa-duotone fa-person-to-portal"></i>
            </Grid>
            <Grid class="card-info-wrapper">
              <Grid class="card-info">
                <i class="fa-duotone fa-person-to-portal"></i>
                <Grid class="card-info-title">
                  <h3>Adios</h3>  
                  <h4>See you...</h4>
                </Grid>    
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid class="card">
          <Grid class="card-content">
            <Grid class="card-image">
              <i class="fa-duotone fa-person-from-portal"></i>
            </Grid>
            <Grid class="card-info-wrapper">
              <Grid class="card-info">
                <i class="fa-duotone fa-person-from-portal"></i>
                <Grid class="card-info-title">
                  <h3>I mean hello</h3>  
                  <h4>...over here.</h4>
                </Grid>    
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid class="card">
          <Grid class="card-content">
            <Grid class="card-image">
              <i class="fa-duotone fa-otter"></i>
            </Grid>
            <Grid class="card-info-wrapper">
              <Grid class="card-info">
                <i class="fa-duotone fa-otter"></i>
                <Grid class="card-info-title">
                  <h3>Otters</h3>  
                  <h4>Look at me, imma cute lil fella.</h4>
                </Grid>    
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <a id="source-link" class="link" href="https://linear.app/features" target="_blank">
        <i class="fa-solid fa-link"></i>
        <span class="roboto-mono">Source</span>
      </a>

      <a id="youtube-link" class="link" href="https://youtu.be/htGfnF1zN4g" target="_blank">
        <i class="fa-brands fa-youtube"></i>
        <span>5 min Tutorial</span>
      </a>
    </>
  );
};

export default AboutsPage;