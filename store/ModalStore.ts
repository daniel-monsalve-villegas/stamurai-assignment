import { makeAutoObservable } from 'mobx'

class ModalStore {
  openModal: boolean = false
  typeModal: string = ''

  constructor() {
    makeAutoObservable(this)
  }
}

const modalStore = new ModalStore()
export default modalStore
