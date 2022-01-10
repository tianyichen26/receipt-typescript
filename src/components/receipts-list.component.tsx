import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { faEdit, faTrashAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import styles from "./receipts-list.module.css";
import Loader from "./loader.component";

type ReceiptListProps = any;

type Receipt = {
    _id: string,
    username: string,
    receiptname: string,
    link: string,
    like: number,
    duration: number,
    date: string,
}

type ReceiptListState = {
    receipts: Receipt[],
    isLoadedRecipes: boolean,
}

type ReceiptProps = {
    receipt: Receipt,
    deleteReceipt: ( id: string ) => void
}

const h1Styles: CSS.Properties = {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
}


const buttonStyles: CSS.Properties = {
    position: 'static',
    color: "Black",
    fontSize: "40"
}


const Receipt = ( props: ReceiptProps ) => (
    <tr>
        <td>{ props.receipt.username }</td>
        <td>{ props.receipt.receiptname }</td>
        <td><a href={ props.receipt.link } target="_blank" rel="noopener noreferrer">{ props.receipt.link }</a></td>

        <td>{ props.receipt.duration } minutes</td>
        <td>{ props.receipt.date.substring( 0, 10 ) }</td>
        <td>
            <Link to={ "/edit/" + props.receipt._id }>
                <FontAwesomeIcon icon={ faEdit }/> </Link> | <a href="#" onClick={ () => {
            props.deleteReceipt( props.receipt._id )
        } }><FontAwesomeIcon icon={ faTrashAlt }/> </a>
        </td>
    </tr>
)

export default class ReceiptsList extends Component<ReceiptListProps, ReceiptListState> {
    constructor( props: ReceiptListProps ) {
        super( props );

        this.deleteReceipt = this.deleteReceipt.bind( this )

        this.state = { receipts: [], isLoadedRecipes: false };
    }

    componentDidMount() {
        axios.get( 'https://receipt-server-node.herokuapp.com/receipts' )
            .then( response => {
                this.setState( { receipts: response.data, isLoadedRecipes: true } )
            } )
            .catch( ( error ) => {
                this.setState( { receipts: [], isLoadedRecipes: false } )
                console.error( error );
            } )
    }

    deleteReceipt( id: string ) {
        axios.delete( 'https://receipt-server-node.herokuapp.com/receipts/' + id )
            .then( response => {
                console.log( response.data )
            } );

        this.setState( {
            receipts: this.state.receipts.filter( re => re._id !== id )
        } )
    }

    receiptList() {
        return this.state.receipts.map( currentreceipt => {
            return <Receipt receipt={ currentreceipt } deleteReceipt={ this.deleteReceipt }
                            key={ currentreceipt._id }/>;
        } )
    }

    render() {
        return (
            !this.state.isLoadedRecipes ? <Loader/> :
                ( <div className={ styles[ 'recipes' ] }>
                        <h2 style={ h1Styles } className={ styles[ 'recipes__heading' ] }>Saved Recipes</h2>
                        <table className="table">
                            <thead className="thead-light">
                            <tr>
                                <th>Saved by</th>
                                <th>Name</th>
                                <th>External Link</th>
                                <th>Duration</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            { this.receiptList() }
                            </tbody>
                        </table>
                        <div className={ `${ styles[ 'fixed-bottom' ] }` }>
                            <Link to="/create" className="nav-link">
                                <a className={ `${ styles[ 'btn__create' ] } float-right btn btn-primary fa-lg` }>
                                    <FontAwesomeIcon style={ buttonStyles } icon={ faPlusSquare }/>
                                </a>
                            </Link>
                        </div>
                    </div>
                ) );
    }
}