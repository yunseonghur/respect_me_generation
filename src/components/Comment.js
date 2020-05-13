import React, {Component} from 'react';
import '../components/Comment.css';

class Comment extends Component{

    render() {
        return(
            <div className="commentWrapper">
                <div className="bottomBorder">
                    <h4 className="commenter">{this.props.user}</h4>
                </div>
                <h5 className="commentText">{this.props.comment}</h5>
            </div>
        )
    }

}

export default Comment;