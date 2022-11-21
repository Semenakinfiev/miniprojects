import './index.scss';
import React from 'react';
import Modal from './Modal';




function App() {
  const [openModal, setOpenModal] = React.useState(false);

  return  (
  <div className="App">
      <button onClick={() => setOpenModal(true)} className="open-modal-btn">✨ Открыть окно</button>

        <Modal openModal={openModal} setOpenModal={setOpenModal} />
</div>
)
}

export default App;