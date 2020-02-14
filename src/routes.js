import React from 'react';



const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Settings = React.lazy(()=>import('./views/Settings/Settings'));
const Upload = React.lazy(()=>import('./views/Upload/Upload'));
const Gallary = React.lazy(()=>import('./views/Gallary/Gallary'));
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path:'/settings', exact: true, name:'Settings', component: Settings},
  { path:'/upload', exact: true, name:'Upload', component: Upload},
  { path:'/gallary', exact: true, name:'Upload', component: Gallary}
];

export default routes;
