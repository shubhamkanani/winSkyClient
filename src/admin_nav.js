export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      title: true,
      name: 'Theme',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name:'Settings',
      url: '/settings',
      icon:'icon-settings'
    },
    {
      divider: true,
    },
    {
      name:'Upload',
      url:'/upload',
      icon:'fa fa-upload'
    },
    {
      name:'Gallary',
      url:'/gallary',
      icon:'fa fa-photo'
    },
    {
      title: true,
      name: 'Recycale',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name:'Trash',
      url:'/trash',
      icon:'fa fa-trash'
    },
    {
      title: true,
      name: 'Message',
    },
    {
      name:'Chat Box',
      url:'/message',
      icon:'fa fa-weixin'
    }
  ],
};
