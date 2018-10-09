import React, {Component} from 'react';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import {Panel, PanelGroup} from 'react-bootstrap'

class AdminRenderOrders extends Component {
    state = {edit: 0}

    onEditClick(){
        this.setState({edit:1})
    }
    onCancelClick(){
        this.setState({edit:0})
    }

    onSaveClick(){
        axios.put(API_URL_1 + "/admin/" + this.props.table + "/" + this.props.id,
            {
                code: this.refs.editCode.value,
                name: this.refs.editName.value,
                image: this.refs.editImage.value
            }
        )
        .then((res)=>{
            console.log(res)
            alert("SUCCESS")
            this.props.refresh()
            this.setState({edit:0})
        })
        .catch((err)=>{
            console.log(err)
            alert("ERROR")
        })
    }

    onDeleteClick(){
        if(window.confirm("Are you sure you want to delete entry? This action cannot be reversed")){
            axios.delete("http://localhost:1994" + "/admin/" + this.props.table + "/" + this.props.album_id)
            .then((res)=>{
                console.log(res)
                alert("DELETE SUCCESS")
                this.props.refresh()
                this.setState({edit:0})
            })
            .catch((err)=>{
                console.log(err)
                alert("ERROR")
            })
        }
    }
    
    renderPage(){
        return(
            <div>
            <PanelGroup accordion id="accordion-uncontrolled-example">
            <Panel eventKey="1">
              <Panel.Heading>
                <Panel.Title toggle>Panel heading 1</Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>Panel content 1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Panel.Body>
            </Panel>
            <Panel eventKey="2">
              <Panel.Heading>
                <Panel.Title toggle>Panel heading 2</Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>Panel content 2</Panel.Body>
            </Panel>
          </PanelGroup>
          </div>
        )
    }
  
    render(){
        return(
            this.renderPage()
        )
    }
}

export default AdminRenderOrders