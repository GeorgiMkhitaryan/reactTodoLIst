import { connect } from "react-redux";
import Container from './components/container';
import './App.css';


function App(props) {
  return (
      <div className="App">
        <Container>
        </Container>
      </div>
  );
} 

const mapStateToProps = state => {
  return{
    defaultState: state.defaultState
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onGetTodo: () => dispatch({ type: "GET"}),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App);
