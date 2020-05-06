import React from 'react';

function Photo(props){
    return(
        <li>
            <img src={props.url} alt="" />
        </li>
    );
}

export default Photo;
