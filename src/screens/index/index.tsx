import { connect } from 'react-redux';
import { PropState } from 'middlewares/configureReducer';
import { Action } from '@reduxjs/toolkit';
import { UserState } from 'middlewares/reduxToolkits/userSlice';
import IndexCT from './IndexCT';

function mapStateToProps(state: PropState): UserState {
  return { ...state.user };
}

function mapDispatchToProps(dispatch: (actionFunction: Action<any>) => any) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexCT);
