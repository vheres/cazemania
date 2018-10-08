import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';


class PaginationClass extends Component {
    renderPagination() {
        var arrLim = [];
        var arrJSX = [];
        for (let i = 0; i < this.props.count; i++) {
            arrLim.push(i*20)
            if (i > this.props.active-3 && i < this.props.active+3) {
                if(this.props.active === i) {
                    arrJSX.push(<Pagination.Item onClick={() => this.props.PageClick(arrLim[i], i)} active>{i+1}</Pagination.Item>)
                }
                else {
                    arrJSX.push(<Pagination.Item onClick={() => this.props.PageClick(arrLim[i], i)}>{i+1}</Pagination.Item>)
                }
            }
            if (i == this.props.active+3) {
                arrJSX.push(<Pagination.Ellipsis></Pagination.Ellipsis>)
            }
            if(i == this.props.active-3) {
                arrJSX.unshift(<Pagination.Ellipsis></Pagination.Ellipsis>)
            }
        }
        if(this.props.active > 0) {
            arrJSX.unshift(<Pagination.Prev onClick={() => this.props.PageClick(arrLim[this.props.active-1], this.props.active-1)}></Pagination.Prev>)
            arrJSX.unshift(<Pagination.First onClick={() => this.props.PageClick(arrLim[0], 0)}></Pagination.First>)
        }
        if (this.props.active < this.props.count-1) {
            arrJSX.push(<Pagination.Next onClick={() => this.props.PageClick(arrLim[this.props.active+1], this.props.active+1)}></Pagination.Next>)
            arrJSX.push(<Pagination.Last onClick={() => this.props.PageClick(arrLim[arrLim.length-1], arrLim.length-1)}></Pagination.Last>)
        }
        
        return arrJSX;
    }
    render() {
        return(
            <Pagination>
                {this.renderPagination()}
            </Pagination> 
        );
    }
}

export default PaginationClass;