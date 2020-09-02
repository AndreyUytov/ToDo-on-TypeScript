import {ElementsFactory, CheckboxFactory, ButtonFactory} from './elements-factory'

let index = 0

export default class Quest {
  readonly id:number
  private li: HTMLElement
  private label: HTMLElement
  private checkbox: HTMLInputElement
  private checkboxMarker: HTMLElement
  private textQuestion: HTMLElement
  private redactBtn: HTMLElement
  private deleteBtn: HTMLElement
  constructor(task: string) {
    this.id = index
    index++
    this.li = new ElementsFactory('li', 'task-section__item').elem
    this.label = new ElementsFactory('label', 'item__chekbox-label').elem
    this.checkbox = new CheckboxFactory('item__marker-checkbox visually-hidden').elem
    this.checkboxMarker = new ElementsFactory('span', 'marker-checkbox checkbox').elem
    this.textQuestion = new ElementsFactory('p', 'item-text', task).elem
    this.redactBtn = new ButtonFactory('item-text-refactror__btn btn').elem
    this.deleteBtn = new ButtonFactory('item-delete-task__btn btn').elem
  }

  private createModalInput (cb: (id: number, taskText: string) => any) {
    const modalInput = document.createElement('input')
    modalInput.type = 'text'
    modalInput.className = 'item__modal-input'
    modalInput.value = this.textQuestion.textContent

    const refactorTask = () => {
      this.textQuestion.textContent = modalInput.value.trim()
      cb(this.id, modalInput.value)
      modalInput.remove()
    }

    modalInput.onkeydown = (evt) => evt.keyCode === 13 ? refactorTask () : null
    modalInput.onblur = refactorTask
    this.li.append(modalInput)
    modalInput.focus()
  }

  addDeleteListener (cb: (id: number) => any) {
    this.deleteBtn.onclick = () => cb(this.id)
  }

  addRedactorListener (cb: (id: number, taskText: string) => any) {
    this.redactBtn.onclick = () => this.createModalInput(cb)
  }

  addCheckboxListener (cb: (id: number, isChecked: boolean) => any) {
    this.checkbox.onchange = () => cb(this.id, this.checkbox.checked)
  }

  render () {
    const ul = document.querySelector('.task-section__list')
    this.label.append(this.checkbox, this.checkboxMarker, this.textQuestion)
    this.li.append(this.label, this.redactBtn, this.deleteBtn)
    ul.append(this.li)
  }
}