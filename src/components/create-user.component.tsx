import React from 'react';
import axios from 'axios';
import styles from "./create-user.module.css";

interface State {
  username: string;
}

interface Props {

}

type User = {
  username: string;
};

export default class CreateUser extends React.Component<Props, State> {
  constructor( props: Props ) {
    super( props );

    this.onChangeUsername = this.onChangeUsername.bind( this );
    this.onSubmit = this.onSubmit.bind( this );

    this.state = {
      username: '',
    }
  }

  onChangeUsername( e: React.ChangeEvent<HTMLInputElement> ) {
    this.setState( {
      username: e.target.value
    } )
  }

  onSubmit( e: React.FormEvent ) {
    e.preventDefault();

    const user = {
      username: this.state.username
    }

    console.log( user );

    axios.post( 'https://receipt-server-node.herokuapp.com/users/add', user )
        .then( res => console.log( res.data ) );

    this.setState( {
      username: ''
    } )
  }

  render() {
    return (
        <div className={ styles[ 'form' ] }>
          <h2 className={ `${ styles[ 'heading__create' ] }` }>Create New User</h2>
          <form onSubmit={ this.onSubmit }>
            <div className="form-group">
              <label>Username: </label>
              <input type="text"
                     required
                     className="form-control"
                     value={ this.state.username }
                     onChange={ this.onChangeUsername }
              />
            </div>
            <div className="form-group">
              <input type="submit" value="Create User" className={`${styles['btn__submit-create']} btn btn-primary`}/>
            </div>
          </form>
        </div>
    )
  }
}