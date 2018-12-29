import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
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


class UserProfile extends React.Component {
  state = {
    cusName:"",
    address:"",
    numberPhone:"",
    note:""
  };
  insertRequest(state){
  console.log(state)
  const self = this
  const refreshToken = localStorage.getItem('refreshToken');
   const accessToken = localStorage.getItem('accessToken');
axios.post('http://localhost:5000/requests/insertRequests', {
    GuestName: state.cusName,
    GuestTelephone: state.numberPhone,
    NameLocation:state.address,
    Note:state.note,
    refreshToken:refreshToken,
    accessToken:accessToken
  })
  .then(function (response) {
    alert("Gửi request thành công")
    if(response.data.newToken !== undefined){
    localStorage.setItem('accessToken',response.data.newToken);
    }
    this.setState({
     cusName:"",
    address:"",
    numberPhone:"",
    note:""
    })
  })
  .catch(function (error) {
    console.log(error);
  });

  }
   render() {
    const { classes } = this.props;
  return (
    <div>
      <GridContainer>
        <GridItem xs={4} sm={8} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Ứng dụng 1</h4>
              <p className={classes.cardCategoryWhite}>Gửi yêu cầu khách hàng</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                   <TextField
                    label="Customer Name"
                    onChange={event=>this.setState({
                      cusName: event.target.value
                    })}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <TextField
                    label="Number Phone"
                    onChange={event=>this.setState({
                      numberPhone: event.target.value
                    })}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                   <TextField
                    label="Address"
                    onChange={event=>this.setState({
                      address: event.target.value
                    })}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                 <TextField
                    label="Note"
                    onChange={event=>this.setState({
                      note: event.target.value
                    })}
                  />
                </GridItem>
         
              </GridContainer>
             
            </CardBody>
            <CardFooter>
              <Button color="primary"
                onClick={()=>this.insertRequest(this.state)}
              >Send Request</Button>
            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>
    </div>
  );
  }
}

export default withStyles(styles)(UserProfile);
