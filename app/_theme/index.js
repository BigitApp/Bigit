'use client'

import { createTheme } from '@mui/material/styles'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1F2123CC'
    },
    background: {
      default: '#010101'
    },
    text: {
      primary: '#F2F2F2'
    }
  },
  typography: {
    fontFamily: 'var(--font-bai-jamjuree)',
    button: {
      textTransform: 'inherit'
    }
  }
})

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    // primary: {
    //   main: '#1F2123CC'
    // },
    // background: {
    //   default: '#010101'
    // },
    // text: {
    //   primary: '#F2F2F2'
    // }
  },
  typography: {
    fontFamily: 'var(--font-bai-jamjuree)',
    button: {
      textTransform: 'inherit'
    }
  }
})
