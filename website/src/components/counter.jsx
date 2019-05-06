import React, { Component } from 'react';

class Counter extends Component {
    state = {
        count: 0,
        tags: ['tag1', 'tag2', 'tag3'],
        imageUrl: 'https://picsum.photos/200'
    };

    styles = {
      fontSize: 50,
      fontWeight: "bold"
    };

    renderTags() {
        if (this.state.tags.length === 0) return <p>There are no tags!</p>;

        return (
            <ul>
                {
                    this.state.tags.map(tag => <li key={tag}>{tag}</li>)
                }
            </ul>
        );
    }

    handleIncrement = product => {
        this.setState({count:this.state.count + 1});
    }


    render() {
        let classes = this.getBadgeClasses();
        return (
            <div>
                <img src={this.state.imageUrl} alt=""/>
                <span className={classes}>{this.formatCount()}</span>
                <button onClick={ () => this.handleIncrement({id: 1})} className="btn btn-dark btn-sm"> Increment </button>
                {this.renderTags()}
            </div>
        );
    }

    getBadgeClasses() {
        let classes = "badge m2 badge-";
        classes += (this.state.count === 0) ? "warning" : "dark";
        return classes;
    }

    formatCount() {
        const {count} = this.state;
        return count === 0 ? 'Zero' : count;
    }
}

export default Counter;