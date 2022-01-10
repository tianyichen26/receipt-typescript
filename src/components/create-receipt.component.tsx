import React, { ChangeEvent, Component, SyntheticEvent } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from "./create-receipt.module.css";
import Loader from "./loader.component";

type CreateReceiptProps = any
type CreateReceiptState = {
    username: string,
    receiptname: string,
    link: string,
    like: number,
    duration: number,
    date: Date,
    users: string[],
    isLoadedData: boolean,
}

//_id":"61c20c8f93f631f5fc19ca14","username":"dsfasdf","createdAt":"2021-12-21T17:19:11.960Z","updatedAt":"2021-12-21T17:19:11.960Z","__v":0
type UserResponse = {
    _id: string,
    username: string,
    createdAt: Date,
    updatedAt: Date,
    __v: number,
}

export default class CreateReceipt extends Component<CreateReceiptProps, CreateReceiptState> {
    constructor( props: CreateReceiptProps ) {
        super( props );

        this.onChangeUsername = this.onChangeUsername.bind( this );
        this.onChangeReceiptname = this.onChangeReceiptname.bind( this );
        this.onChangeLink = this.onChangeLink.bind( this );
        this.onChangeLike = this.onChangeLike.bind( this );

        this.onChangeDuration = this.onChangeDuration.bind( this );
        this.onChangeDate = this.onChangeDate.bind( this );
        this.onSubmit = this.onSubmit.bind( this );

        this.state = {
            username: '',
            receiptname: '',
            link: '',
            like: 0,
            duration: 0,
            date: new Date(),
            users: [],
            isLoadedData: false,
        }
    }

    componentDidMount() {
        axios.get<UserResponse[]>( 'https://receipt-server-node.herokuapp.com/users' )
            .then( response => {
                if ( response.data.length > 0 ) {
                    this.setState( {
                        users: response.data.map( user => user.username ),
                        username: response.data[ 0 ].username,
                        isLoadedData: true
                    } );
                }
            } )
            .catch( ( error ) => {
                this.setState( {
                    isLoadedData: true
                } );
                console.log( error );
            } )

    }

    onChangeUsername( e: ChangeEvent<HTMLSelectElement> ) {
        this.setState( {
            username: e.target.value
        } )
    }

    onChangeReceiptname( e: ChangeEvent<HTMLInputElement> ) {
        this.setState( {
            receiptname: e.target.value
        } )
    }

    onChangeLink( e: ChangeEvent<HTMLInputElement> ) {
        this.setState( {
            link: e.target.value
        } )
    }

    onChangeLike( e: any ) {  // This is not used in the render function, hence any type is assigned for now
        this.setState( {
            like: e.target.value
        } )
    }

    onChangeDuration( e: ChangeEvent<HTMLInputElement> ) {
        this.setState( {
            duration: Number( e.target.value )
        } )
    }

    onChangeDate( date: Date ) {
        this.setState( {
            date: date
        } )
    }

    onSubmit( e: SyntheticEvent ) {
        e.preventDefault();

        const receipt = {
            username: this.state.username,
            receiptname: this.state.receiptname,
            link: this.state.link,
            like: this.state.like,
            duration: this.state.duration,
            date: this.state.date
        }

        axios.post( 'https://receipt-server-node.herokuapp.com/receipts/add', receipt )
            .then( res => console.log( res.data ) )
            .catch( err => console.error( err ) );

        this.props.history.replace( "/" );
    }

    render() {
        return (
            !this.state.isLoadedData ? <Loader/> : <div className={ styles[ 'form' ] }>
                <h2 className={ `${ styles[ 'heading__create' ] }` }>Create New Recipe</h2>
                <form onSubmit={ this.onSubmit }>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                                required
                                className="form-control"
                                value={ this.state.username }
                                onChange={ this.onChangeUsername }>
                            {
                                this.state.users.map( function ( user ) {
                                    return <option
                                        key={ user }
                                        value={ user }>{ user }
                                    </option>;
                                } )
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Recipe name: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={ this.state.receiptname }
                               onChange={ this.onChangeReceiptname }
                        />
                    </div>
                    <div className="form-group">
                        <label>External link: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={ this.state.link }
                               onChange={ this.onChangeLink }
                        />
                    </div>
                    <div className="form-group">
                        <label>Time taken (in minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={ this.state.duration }
                            onChange={ this.onChangeDuration }
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div className={ `${ styles[ 'react-datepicker-wrapper' ] }` }>
                            <DatePicker className='form-control'
                                        selected={ this.state.date }
                                        onChange={ this.onChangeDate }
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Receipt"
                               className={ `${ styles[ 'btn__submit-create' ] } btn btn-primary` }/>
                    </div>
                </form>
            </div>
        )
    }
}