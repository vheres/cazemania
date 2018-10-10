import React, {Component} from 'react';
import axios from 'axios'
import {API_URL_1} from '../supports/api-url/apiurl'
import {Panel, PanelGroup} from 'react-bootstrap'

class AdminRenderOrders extends Component {
    state = {edit: 0, items: []}


    componentWillMount(){
        axios.get(API_URL_1 + "/adminordersdetails/" + 1)
        .then((res)=>{
            console.log(res.data)
            this.setState({items: res.data})
        })
    }

    renderOrderStatus(){
        return(
            {
                pending: () => {
                    return(
                        <span class="label bg-warning">Pending</span> )
                    },
                shipped: () => {
                    return(
                        <span class="label bg-success">Shipped</span> )
                    }
                }
        )
    }

    renderTransactionDetails(){
        var arrJSX = this.state.items.map((item) =>{
            return(
            <tr>
                <td>{item.amount}</td>
                <td>{item.code}-{item.name} || {item.brand_name} {item.type_name} - {item.case_type}</td>
                <td>Rp. {item.price}</td>
                <td>Rp. {item.price * item.amount}</td>
            </tr>)
        })

        return arrJSX
    }
    
    renderPage(){
        return(
            <div>
            <PanelGroup accordion id="accordion-uncontrolled-example">
            <Panel eventKey="1">
              <Panel.Heading>
                <Panel.Title toggle>Order ID: <strong>{this.props.transaction_id}</strong></Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>
                <section id="content">
                    <section class="vbox bg-white">
                        <header class="header bg-light lter hidden-print">
                        <a href="#" class="btn btn-sm btn-info pull-right" onClick="window.print();">Print</a>
                        <p>Invoice</p>
                        </header>
                        <section class="scrollable wrapper">
                        <i class="fa fa-apple fa fa-3x"></i>
                        <div class="row">
                            <div class="col-xs-6">
                            <h4>Cazemania</h4>
                            <p><a href="http://www.cazemania.com">www.cazemania.com</a></p>
                            <p>1 Infinite Loop <br/>
                                95014 Cuperino, CA<br/>
                                United States
                            </p>
                            <p>
                                Telephone:  800-692-7753<br/>
                                Fax:  800-692-7753
                            </p>
                            </div>
                            <div class="col-xs-6 text-right">
                            <p class="h4">#9048392</p>
                            <h5>29th Mar 2013</h5>           
                            </div>
                        </div>          
                        <div class="well bg-light b m-t">
                            <div class="row">
                            <div class="col-xs-6">
                                <strong>TO:</strong>
                                <h4>{this.props.firstname} {this.props.lastname}</h4>
                                <p>
                                2nd Floor<br/>
                                St John Street, Aberdeenshire 2541<br/>
                                United Kingdom<br/>
                                Phone: 031-432-678<br/>
                                Email: youemail@gmail.com<br/>
                                </p>
                            </div>
                            <div class="col-xs-6">
                                <strong>SHIP TO:</strong>
                                <h4>John Smith</h4>
                                <p>
                                2nd Floor<br/>
                                St John Street, Aberdeenshire 2541<br/>
                                United Kingdom<br/>
                                Phone: 031-432-678<br/>
                                Email: youemail@gmail.com<br/>
                                </p>
                            </div>
                            </div>
                        </div>
                        <p class="m-t m-b">Order date: <strong>26th Mar 2013</strong><br/>
                            Order status: {this.renderOrderStatus()[this.props.status]()}<br/>
                            Order ID: <strong>#9399034</strong>
                        </p>
                        <div class="line"></div>
                        <table class="table">
                            <thead>
                            <tr>
                                <th style={{"width": "60px"}}>QTY</th>
                                <th>DESCRIPTION</th>
                                <th style={{"width": "140px"}}>UNIT PRICE</th>
                                <th style={{"width": "110px"}}>TOTAL</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>iPhone 5 32GB White & Silver (GSM) Unlocked</td>
                                <td>$749.00</td>
                                <td>$749.00</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>iPad mini with Wi-Fi 32GB - White & Silver</td>
                                <td>$429.00</td>
                                <td>$858.00</td>
                            </tr>
                            {this.renderTransactionDetails()}
                            <tr>
                                <td colspan="3" class="text-right"><strong>Subtotal</strong></td>
                                <td>$1607.00</td>
                            </tr>
                            <tr>
                                <td colspan="3" class="text-right no-border"><strong>Shipping</strong></td>
                                <td>$0.00</td>
                            </tr>
                            <tr>
                                <td colspan="3" class="text-right no-border"><strong>VAT Included in Total</strong></td>
                                <td>$0.00</td>
                            </tr>
                            <tr>
                                <td colspan="3" class="text-right no-border"><strong>Total</strong></td>
                                <td><strong>$1607.00</strong></td>
                            </tr>
                            </tbody>
                        </table>              
                        </section>
                    </section>
                </section>
              </Panel.Body>
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