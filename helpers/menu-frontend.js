const getMenuFrontEnd = (role = 'USER_ROLE') => {
    const menu = [
        {
          titulo: 'Dashboard',
          icono: 'mdi mdi-gauge',
          submenu: [
            { titulo: 'Main', url: '/' },
            { titulo: 'ProgressBar', url: 'progress' },
            { titulo: 'Gráficas', url: 'grafica1' },
            { titulo: 'Promesas', url: 'promises' },
            { titulo: 'Rxjs', url: 'rxjs' },
          ]
        },
        {
          titulo: 'Mantenimientos',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            { titulo: 'Hospitales', url: 'hospitales' },
            { titulo: 'Médicos', url: 'medicos' },
          ]
        }
      ]

      if(role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' })
      }

      return menu;
}

module.exports = {
    getMenuFrontEnd
}