import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';

class PaginationClass extends Component {
    renderPagination() {
        var arrJSX = [];
        for (let i = 0; i < this.props.count; i++) {
            if (i > this.props.active-3 && i < this.props.active+3) {
                if(this.props.active === i) {
                    arrJSX.push(<Pagination.Item onClick={() => this.props.PageClick(i)} active>{i+1}</Pagination.Item>)
                }
                else {
                    arrJSX.push(<Pagination.Item onClick={() => this.props.PageClick(i)}>{i+1}</Pagination.Item>)
                }
            }
            if (i === parseInt(this.props.active+3, 10)) {
                arrJSX.push(<Pagination.Ellipsis></Pagination.Ellipsis>)
            }
            if(i === parseInt(this.props.active-3, 10)) {
                arrJSX.unshift(<Pagination.Ellipsis></Pagination.Ellipsis>)
            }
        }
        if(this.props.active > 0) {
            arrJSX.unshift(<Pagination.Prev title="previous page" onClick={() => this.props.PageClick(this.props.active-1)}></Pagination.Prev>)
            arrJSX.unshift(<Pagination.First title="first page" onClick={() => this.props.PageClick(0)}></Pagination.First>)
        }
        if (this.props.active < this.props.count-1) {
            arrJSX.push(<Pagination.Next title="next page" onClick={() => this.props.PageClick(this.props.active+1)}></Pagination.Next>)
            arrJSX.push(<Pagination.Last title="last page" onClick={() => this.props.PageClick(this.props.count-1)}></Pagination.Last>)
        }
        
        return arrJSX;
    }
    render() {
        return(
            <Pagination bsSize="large">
                {this.renderPagination()}
            </Pagination> 
        );
    }
}

export default PaginationClass;