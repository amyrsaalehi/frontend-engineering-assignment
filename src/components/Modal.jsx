import { LazyImage } from "./LazyImage"

export const Modal = ({ showHideClassName, todo, closeModal }) => <div className={showHideClassName}>
  <section className="modal-wrapper">
    <LazyImage src={todo.picture.large} alt={todo.picture.large} />
    <div className="todo_description">{todo.description}</div>
    <button type="button" onClick={closeModal}>
      Close
    </button>
  </section>
</div>