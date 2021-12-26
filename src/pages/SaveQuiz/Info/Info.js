import { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  FormText,
  Button,
} from "reactstrap";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { setCurrentQuiz } from "../../../redux/Quizes/actions";
import update from "immutability-helper";
function Info ({ currentQuiz }){
  // //Use Selector
  // const { currentQuiz } = useSelector(
  //   state => ({
  //     currentQuiz: state.quizes.currentQuiz,
  //   }),
  //   shallowEqual
  // );
  // DISPATCH
  const dispatch = useDispatch();
  const change = (property, value) => {
    const newData = update(currentQuiz, {
      [property]: { $set: value },
    });
    dispatch(setCurrentQuiz(newData));
  };
  return (
    <div>
      <Form>
        <FormGroup row>
          <Label htmlFor="title" sm={2}>
            Title
          </Label>
          <Col sm={10}>
            <Input
              id="title"
              name="title"
              placeholder="title"
              type="text"
              value={currentQuiz.title}
              onChange={e => change("title", e.target.value)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label htmlFor="description" sm={2}>
            Description
          </Label>
          <Col sm={10}>
            <Input
              id="description"
              name="description"
              type="textarea"
              value={currentQuiz.description}
              onChange={e => change("description", e.target.value)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label htmlFor="url" sm={2}>
            Url
          </Label>
          <Col sm={10}>
            <Input
              id="url"
              name="url"
              placeholder="https://youtu.be/yEHb0t5vt7E"
              type="url"
              value={currentQuiz.url}
              onChange={e => change("url", e.target.value)}
            />
            <FormText>Click share then copy the link</FormText>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label htmlFor="score" sm={2}>
            Score
          </Label>
          <Col sm={10}>
            <Input
              id="score"
              name="score"
              placeholder="score"
              type="number"
              value={currentQuiz.score}
              onChange={e => change("score", e.target.value)}
            />
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
}
export default Info;
