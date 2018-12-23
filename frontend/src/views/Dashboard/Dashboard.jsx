import React from "react";
import PropTypes from "prop-types";
// import PropTypes from "prop-types";
import { Redirect,Route } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardRoutes from "routes/dashboard.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";      
import TextField from "@material-ui/core/TextField";
import axios from 'axios'
class Dashboard extends React.Component {
  state = {
    value: 0,
    username:"",
    password:""
  };
  
  constructor(props) {
    super(props);
  }

  login(state) {
  axios.post('http://localhost:5000/requests/login', {
    Username: state.username,
    Password: state.password
  })
  .then(function (response) {
    if(response.data.statusCode == 1){
    alert("Đăng nhập thành công")
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    else{
     alert("Sai thông tin đăng nhập")
    }
  })
  .catch(function (error) {
   alert("Sai thông tin đăng nhập")
  });
   
  }

  render() {
    const { classes } = this.props;
    return <div>
    <GridContainer>
      <GridItem xs={4} sm={4} md={4}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Login</h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                 <TextField
                    label="Customer Name"
                    onChange={event=>this.setState({
                      username: event.target.value
                    })}
                  />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                    label="Password"
                    onChange={event=>this.setState({
                      password: event.target.value
                    })}
                  />
              </GridItem>
            </GridContainer>
           
          </CardBody>
          <CardFooter>
            <Button color="primary"
            onClick={()=>this.login(this.state)}
            >Login</Button>
          </CardFooter>
        </Card>
      </GridItem>
      
    </GridContainer>
  </div>
  }
}

export default withStyles(styles)(Dashboard);
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};