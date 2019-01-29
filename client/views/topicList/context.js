import React from 'react'

export default React.createContext({
  theme: '我们',
  toggleTheme: () => {
    console.log(this)
  },
})
