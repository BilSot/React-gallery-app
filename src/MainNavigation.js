import React from 'react';
import {NavLink} from 'react-router-dom';

function MainNavigation({tagNames}){
    let tags = [];
    tagNames.forEach( (tag, index) => {
        tags.push(<Tag url={tag.toLowerCase()} key={index} title={tag}/>);
    });

    return(
        <nav className="main-nav">
            <ul>
                {tags}
            </ul>
        </nav>
    );
}

function Tag(props){
    return(
        
        <li><NavLink exact to={`/${props.url}`}>{props.title}</NavLink></li>
    );
}

export default MainNavigation;
