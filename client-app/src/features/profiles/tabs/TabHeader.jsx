import React from 'react';
import { Grid, GridRow } from 'semantic-ui-react';

export default ({children}) => (
  <Grid>
    <GridRow>
      <Grid.Column>
        {children}
      </Grid.Column>
    </GridRow>
  </Grid>
);
