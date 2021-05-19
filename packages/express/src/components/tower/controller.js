import * as store from './store'
import {countDevicesByTower} from '../device/store'

// Lista de torres.
export function getTowers(query = '') {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getTowers(query))
    } catch (err) {
      reject(err)
    }
  })
}

// devolver torre por id.
export function getTower(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getTower(id))
    } catch (err) {
      reject(err)
    }
  })
}

// registrar torre.
export function createTower(data) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.createTower(data))
    } catch (err) {
      reject(err)
    }
  })
}

// actualizar torre.
export function updateTower(id, data) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.updateTower(id, data))
    } catch (err) {
      reject(err)
    }
  })
}

// borrar torre.
export function deleteTower(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.deleteTower(id))
    } catch (err) {
      reject(err)
    }
  })
}

// torres por ares cobertura.
export function getTowerByDistinctCoverage() {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getTowerByDistinctCoverage())
    } catch (err) {
      reject(err)
    }
  })
}

// areas cobertura x torres.
export function getCoveragesByTowers() {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getCoveragesByTowers())
    } catch (err) {
      reject(err)
    }
  })
}

// total de equipos de la torre.
export function countDevices(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(countDevicesByTower(id))
    } catch (err) {
      reject(err)
    }
  })
}
