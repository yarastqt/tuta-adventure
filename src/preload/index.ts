import { contextBridge } from 'electron'

import { electronAPI } from '@electron-toolkit/preload'

const api = {}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-expect-error (ignore)
  window.electron = electronAPI
  // @ts-expect-error (ignore)
  window.api = api
}
