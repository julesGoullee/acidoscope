'use strict'
/* global __static */

import path from 'path'
import { app, protocol, BrowserWindow } from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'

import Server from '../abletonLinkProxy/server'
const isDevelopment = process.env.NODE_ENV !== 'production'

let win = null

protocol.registerStandardSchemes(['app'], { secure: true })

async function createWindow () {
  // Create the browser window.

  await Server.start();

  win = new BrowserWindow({
    width: 1080,
    minWidth: 680,
    height: 840,
    title: app.getName(),
    icon: path.join(__static, 'icon.png')
  })

  win.SERVER_PORT = Server.port;

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
    win.maximize()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', async () => {
  if (win === null) {
    await createWindow()
  }
})

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  await createWindow()
})


if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

process.on('unhandledRejection', error => {
  console.error(error)
})
