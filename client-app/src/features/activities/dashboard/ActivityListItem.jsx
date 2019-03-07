import React from 'react';
import { Segment, Button, Item, Icon } from 'semantic-ui-react';

const ActivityListItem = ({activity, selectActivity}) =>
    <Segment.Group>
        <Segment>
            <Item.Group>
                <Item>
                    <Item.Image size='tiny' circular src='assets/user.png'/>
                    <Item.Content>
                        <Item.Header>{activity.title}</Item.Header>
                        <Item.Description>
                            Hosted By A.User
                        </Item.Description>
                    </Item.Content>
                </Item>
            </Item.Group>
        </Segment>
        <Segment>
            <Icon name='clock'/> {activity.date}
            <Icon name='marker'/> {activity.venue}, {activity.city}
        </Segment>
        <Segment secondary>
            Attendees will go here
        </Segment>
        <Segment clearing>
            <span>{activity.description}</span>
            <Button 
                content='View' 
                floated='right' 
                primary 
                onClick={() => selectActivity(activity.id)}
            />
        </Segment>
    </Segment.Group>

export default ActivityListItem;