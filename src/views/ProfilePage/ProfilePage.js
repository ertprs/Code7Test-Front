import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { Link } from 'react-router-dom'
// core components

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import ArchiveIcon from '@material-ui/icons/Archive';
import Parallax from "components/Parallax/Parallax.js";
// import { TabContent, TabPane, Nav, NavItem, NavLink, Jumbotron } from 'reactstrap';

import styles from "assets/jss/material-kit-react/views/profilePage.js";



const useStyles = makeStyles(styles);

export default function ProfilePage() {



  const classes = useStyles();
 

  return (
    <div>

  

      <Parallax style={{ maxHeight: 140 }} small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
          
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  
                  <div className={classes.name}>



                  </div>
                </div>
              </GridItem>
            </GridContainer>

            <GridContainer style={{ marginTop: 35 }} justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>


                <GridContainer justify="center">
                  <Link to="/ClienteProfile">
                    <GridItem  style={{maxWidth:180}} xs={12} sm={12} md={4}>

                      <GroupAddIcon style={{ fontSize: 90 }} />
                      <label>Clientes</label>
                    </GridItem>
                  </Link>

                  <Link to="/ClienteRegister">
                    <GridItem style={{maxWidth:180}} xs={12} sm={11} md={4}>

                      <ArchiveIcon style={{ fontSize: 90 }} />
                      <label className="align-center">Ofertas</label>
                    </GridItem>
                  </Link>
                
                  
                </GridContainer>



              </GridItem>
            </GridContainer>

          </div>
        </div>
      </div>
    
    </div>
  );
}
