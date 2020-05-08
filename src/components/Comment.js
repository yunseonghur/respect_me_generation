import React, {Component} from 'react';

class Comment extends Component{

    render() {
        return(
            <div>
                <h5>{this.props.user} says: {this.props.comment}</h5>
            </div>
        )
    }

}

export default Comment;