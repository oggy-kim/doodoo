import '../css/Nav.css';

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchGroup } from '../../actions';

import Footer from './Footer';
import GroupCreateModal from './groups/GroupCreateModal';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import GroupList from './groups/GroupList';

const PersonalList = () => {
  return (
    <div>
      개인 그룹
      <ul>
        <li>나의 할일</li>
        <li>맛집 리스트</li>
      </ul>
    </div>
  );
};
const ShareList = () => {
  return (
    <div>
      공유 그룹
      <ul>
        <li>장보기 리스트</li>
        <li>오늘의 메뉴는??</li>
      </ul>
    </div>
  );
};

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    position: 'relative',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Aside({ dispatch }) {
  const { open } = useSelector((state) => state.nav);

  useEffect(() => {
    if (open === false) {
      document.getElementsByClassName('nav-container')[0].style.width = '0px';
    } else {
      document.getElementsByClassName('nav-container')[0].style.width = '250px';
    }
  });

  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className='nav-container'>
      <Drawer
        className='nav-drawer'
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Link to='/home'>
          <img id='doodoo-img' src='/images/icons/doodoo_intro.png' />
        </Link>
        <div className='group-container'>
          <GroupList />
        </div>
        <GroupCreateModal />
        <Footer />
      </Drawer>
    </div>
  );
}
