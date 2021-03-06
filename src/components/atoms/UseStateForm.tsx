import React, { useState, useEffect } from "react";

type State = { inputA?: string; inputB?: string };

function UseStateForm() {
  const [state, setState] = useState<State>({
    inputA: "Value A",
    inputB: "Value B",
  });

  useEffect(
    () => {
      console.log("This code gets executed when componentDidUpdate");
      // Will be executed with every component update

      return () => {
        console.log("This code gets executed when componentDidUnmount");
        // This block will be executed after unmounting the component.
        // For example, you can close external connections here
      };
    } /* No dependencies array */
  );

  useEffect(
    () => {
      console.log("This code gets executed when componentDidMount");
      // Will be called once, after component is mounted/rendered
    },
    [] /* Empty dependencies array */
  );

  useEffect(() => {
    console.log("state has changed: ", state);
    // This code will be executed only when `state` has changed
  }, [state]);

  const onChange = (event: any) => {
    const target = event.target;

    /* setState({
      // This will overwrite the value of the other input state
      // Making it uncontrolled in the process
      // This is because useState.setState Hook doesn't merge state
      // like the ClassComponent.setState
      [target.id]: target.value,
    });
    */

    // setState({ ...state, [target.id]: target.value }); // Not recommended

    setState((prevState) => ({
      // This is the recommended way of updating state, passing a function
      // Because state may be updated asynchronously,
      // you should not rely on their values for calculating the next state.
      ...prevState,
      [target.id]: target.value,
    }));
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    console.log({ "state.inputA": state.inputA, "state.inputB": state.inputB });
  };

  return (
    <>
      <h1> Use State Form</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="inputA">Input A:</label>
        <input
          id="inputA"
          name="inputA"
          value={state.inputA}
          onChange={onChange}
        />
        <br />
        <label htmlFor="inputB">Input B:</label>
        <input
          id="inputB"
          name="inputB"
          value={state.inputB}
          onChange={onChange}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default UseStateForm;
