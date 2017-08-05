import React, { Component } from 'react';

class Homepage extends Component {

  renderContent(x, title, intro, conclusion) {
    return (
      <div key={x}>
        <h3>
          <mark>{title}</mark>
        </h3>
        <p>
          {intro}
        </p>
        <p dangerouslySetInnerHTML={{ __html: conclusion}}></p>
      </div>
    );
  }

  render() {
    let content = [
      this.renderContent(0, "Declarative", "React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.", "Declarative views make your code more predictable and easier to debug."),
      this.renderContent(1, "Component-Based", "Build encapsulated components that manage their own state, then compose them to make complex UIs.", "Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM."),
      this.renderContent(2, "Learn Once, Write Anywhere", "We don't make assumptions about the rest of your technology stack, so you can develop new features in React without rewriting existing code.", "React can also render on the server using Node and power mobile apps using <a href='https://facebook.github.io/react-native/' target='_blank'>React Native</a>.")
    ];

    return (
      <div className="container-fluid">
        <h1 className="s-blk-shadow">
          React: JavaScript Library For UI
        </h1>

        <div style={{marginTop: '50px'}}>
          {content}
        </div>

      </div>
    );
  }
}

export default Homepage;
