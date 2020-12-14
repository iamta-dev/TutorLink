export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
        badge: {
          color: 'primary',
          text: 'NEW'
        }
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['MENU']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Manage User',
        to: '/ManageUser',
        icon: 'cil-people'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Manage Post',
        to: '/managePost',
        icon: 'cil-bookmark'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Manage Payment',
        to: '/managePayment',
        icon: 'cil-money'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Group Chat',
        to: '/adminChat',
        icon: 'cil-chat-bubble'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'AddRoom',
        to: '/addRoom',
        icon: 'cil-chat-bubble'
      }, {
        _name: 'CSidebarNavItem',
        name: 'Notification',
        to: '/notification',
        icon: 'cil-chat-bubble'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Page',
        to: '/pages/login',
        icon: 'cil-people'
      },
    ]

  }
]