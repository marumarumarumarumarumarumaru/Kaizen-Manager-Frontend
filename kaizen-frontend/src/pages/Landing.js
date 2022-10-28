import React from 'react';

class Landing extends React.Component {
  /* 
    Page component for rendering the landing page
  */
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    return (
      <div className='content'>
        <h1 className='page-header'>Landing</h1>
        <div className='text-content'>
          <h2 className='section-header'>Welcome to Kaizen</h2>
          <p>
            This is a landing page   
          </p>
        </div>
      </div>
    );
  }
}

export default Landing;