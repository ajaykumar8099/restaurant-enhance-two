import './index.css'

const CustomButton = props => {
  const {btnData, onClickBtn, isActive} = props
  const {menuCategory, menuCategoryId} = btnData

  const onClickChange = () => {
    onClickBtn(menuCategoryId)
  }

  const className = isActive ? 'active' : ''
  return (
    <button
      type="button"
      onClick={onClickChange}
      className={`custom-button ${className}`}
    >
      {menuCategory}
    </button>
  )
}
export default CustomButton
