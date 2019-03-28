import React, { Component } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { inject, observer } from 'mobx-react';
import InfiniteScroll from 'react-infinite-scroller';
import ActivityFilters from './ActivityFilters';

@inject('activityStore')
@observer
class ActivityDashboard extends Component {
  state = {
    loadingNext: false
  };

  componentDidMount() {
    this.props.activityStore.loadActivities();
  }

  handlePageChange = async (e, { activePage }) => {
    const { setPage, loadActivities } = this.props.activityStore;
    console.log({ activePage });
    setPage(activePage - 1);
    await loadActivities();
  };

  handleGetNext = () => {
    const { page, loadActivities, setPage } = this.props.activityStore;
    this.setState({ loadingNext: true });
    setPage(page + 1);
    loadActivities().then(() => this.setState({ loadingNext: false }));
  };

  render() {
    const {
      activityStore: { loadingInitial, totalPages, page }
    } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          {loadingInitial && page === 0 ? (
            <LoadingComponent inverted={true} content='Loading activities...' style={{marginTop: 40}} />
          ) : (
            <InfiniteScroll
              pageStart={0}
              loadMore={this.handleGetNext}
              hasMore={!this.state.loadingNext && page + 1 < totalPages}
              initialLoad={false}
              useWindow={true}
            >
              <ActivityList />
            </InfiniteScroll>
          )}
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityFilters />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={this.state.loadingNext} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default ActivityDashboard;
