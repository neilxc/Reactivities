import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { Comment, Form, Header, Segment } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import forms from '../../../app/common/form/forms';
import TextAreaInput from '../../../app/common/form/inputs/TextAreaInput';
import FormSubmitButton from '../../../app/common/form/controls/FormSubmitButton';

const form = forms.commentForm;

@inject('activityStore')
@observer
class ActivityDetailsChat extends Component {
  componentDidMount() {
    form.set({id: this.props.activity.id});
  }

  componentWillUnmount() {

    // form.clear();
    // this.props.activityStore.stopHubConnection();
  }

  render() {
    const {
      activityStore: { activity }
    } = this.props;
    return (
      <Fragment>
        <Segment
          textAlign='center'
          attached='top'
          inverted
          color='teal'
          style={{ border: 'none' }}
        >
          <Header>Chat about this event</Header>
        </Segment>
        <Segment attached>
          <Comment.Group>
            {activity.comments && activity.comments.map(comment => (
              <Comment key={comment.id}>
                <Comment.Avatar src={comment.image || '/assets/user.png'} />
                <Comment.Content>
                  <Comment.Author
                    as={Link}
                    to={`/profile/${comment.username}`}
                  >
                    {comment.displayName}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>{comment.createdAt}</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.body}</Comment.Text>
                </Comment.Content>
              </Comment>
            ))}

            <Form style={{marginTop: 5}}>
              <TextAreaInput field={form.$('body')} rows={2}/>
              <FormSubmitButton content='Add Comment' form={form} positive={true} />
            </Form>
          </Comment.Group>
        </Segment>
      </Fragment>
    );
  }
}

export default ActivityDetailsChat;
