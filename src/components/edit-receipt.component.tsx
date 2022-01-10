import React, { ChangeEvent, Component, SyntheticEvent } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

type EditReceiptProps = any
type EditReceiptState = {
    username: string,
    receiptname: string,
    link: string,
    like: number,
    duration: number,
    date: Date,
    users: string[],
}

//_id":"61c20c8f93f631f5fc19ca14","username":"dsfasdf","createdAt":"2021-12-21T17:19:11.960Z","updatedAt":"2021-12-21T17:19:11.960Z","__v":0
type UserResponse = {
    _id: string,
    username: string,
    createdAt: Date,
    updatedAt: Date,
    __v: number,
}


export default class EditReceipt extends Component<EditReceiptProps, EditReceiptState> {
    constructor( props: EditReceiptProps ) {
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
            users: []
        }
    }

    componentDidMount() {
        axios.get( 'https://receipt-server-node.herokuapp.com/receipts/' + this.props.match.params.id )
            .then( response => {
                this.setState( {
                    username: response.data.username,
                    receiptname: response.data.receiptname,
                    link: response.data.link,
                    duration: response.data.duration,
                    date: new Date( response.data.date )
                } )
            } )
            .catch( function ( error ) {
                console.log( error );
            } )

        axios.get<UserResponse[]>( 'https://receipt-server-node.herokuapp.com/users' )
            .then( response => {
                if ( response.data.length > 0 ) {
                    this.setState( {
                        users: response.data.map( user => user.username ),
                    } )
                }
            } )
            .catch( ( error ) => {
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

    onChangeLike( e: any ) {
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
            duration: this.state.duration,
            date: this.state.date
        }


        axios.post( 'https://receipt-server-node.herokuapp.com/receipts/update/' + this.props.match.params.id, receipt )
            .then( res => console.log( res.data ) );

        this.props.history.replace( '/' );
    }

    render() {
        return (
            <div>
                <h3>Edit Receipt</h3>
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
                        <label>Description: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={ this.state.receiptname }
                               onChange={ this.onChangeReceiptname }
                        />
                    </div>
                    <div className="form-group">
                        <label>link: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={ this.state.link }
                            onChange={ this.onChangeLink }
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={ this.state.duration }
                            onChange={ this.onChangeDuration }
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={ this.state.date }
                                onChange={ this.onChangeDate }
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Save Changes" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}