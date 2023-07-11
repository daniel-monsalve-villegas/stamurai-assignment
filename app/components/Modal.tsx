interface ModalProps {
  modalOpen: boolean
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ modalOpen, children }) => {
  return (
    <div
      className={`${
        modalOpen
          ? 'absolute top-0 left-0 flex items-center w-full h-full backdrop-blur bg-white/30'
          : 'd-none'
      }`}>
      <dialog open={modalOpen} className='w-full max-w-sm'>
        {children}
      </dialog>
    </div>
  )
}

export default Modal
